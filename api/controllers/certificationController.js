import db from '../config/db.js';
import { logAudit } from '../middleware/auth.js';

export async function getCertifications(req, res) {
  try {
    const { domain, level, search, status } = req.query;
    let list = db.getCollection('certifications');

    // Only return published certifications for public/candidates unless admin
    const isAdmin = req.user && req.user.role !== 'Candidate';
    if (!isAdmin) {
      list = list.filter(c => c.status === 'Active' || c.status === 'Published');
    } else if (status) {
      list = list.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }

    if (domain && domain !== 'All') {
      const d = domain.toLowerCase().trim();
      list = list.filter(c => {
        const cd = (c.domain || '').toLowerCase();
        const cs = (c.domainSlug || '').toLowerCase();
        return cd === d || cs === d || cd.includes(d) || d.includes(cd);
      });
    }

    if (level && level !== 'All') {
      list = list.filter(c => c.level.toLowerCase() === level.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
      );
    }

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({ success: true, count: list.length, certifications: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch certifications' });
  }
}

export async function getCertificationById(req, res) {
  try {
    const { id } = req.params;
    const cert = db.findOne('certifications', c => c.id === id || c.code.toLowerCase() === id.toLowerCase());
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification program not found.' });
    }

    const syllabus = db.findOne('syllabi', s => s.certificationId === cert.id);
    const questionsCount = db.find('questions', q => q.certificationId === cert.id).length;

    return res.json({
      success: true,
      certification: {
        ...cert,
        syllabus: syllabus ? syllabus.modules : cert.syllabus || [],
        questionsCount,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch certification details' });
  }
}

export async function getCandidateCertificationStatus(req, res) {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email?.toLowerCase();

    // Find candidate's enrollments
    const enrollments = db.find('enrollments', e =>
      (uid && e.candidateUid === uid) ||
      (email && e.candidateEmail?.toLowerCase() === email)
    );

    // Find candidate's certificates
    const certificates = db.find('certificates', c =>
      (uid && c.candidateUid === uid) ||
      (email && c.candidateEmail?.toLowerCase() === email)
    );

    // Find candidate's active exam schedules
    const schedules = db.find('examSchedules', s =>
      ((uid && s.candidateUid === uid) ||
      (email && s.candidateEmail?.toLowerCase() === email)) &&
      (s.status === 'scheduled' || s.status === 'in-progress')
    );

    const completedCertIds = Array.from(new Set([
      ...certificates.filter(c => c.status === 'Issued').map(c => c.certificationId),
      ...enrollments.filter(e => e.status === 'completed').map(e => e.certificationId),
    ])).filter(Boolean);

    // Only active enrollments or active scheduled exams that are not yet completed
    const enrolledCertIds = Array.from(new Set([
      ...enrollments.filter(e => e.status === 'enrolled' || e.status === 'in-progress').map(e => e.certificationId),
      ...schedules.map(s => s.certificationId),
    ])).filter(id => Boolean(id) && !completedCertIds.includes(id));

    return res.json({
      success: true,
      enrolledCertIds,
      completedCertIds,
      enrollmentsCount: enrolledCertIds.length,
      completedCount: completedCertIds.length,
      enrollments,
      certificates,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch candidate certification status' });
  }
}

export async function createCertification(req, res) {
  try {
    const {
      name,
      code,
      domain,
      domainCode,
      level,
      description,
      learningObjectives,
      syllabus,
      eligibility,
      examPattern,
      examFee,
      currency = 'INR',
      duration,
      passingCriteria = 70,
      validityYears = 3,
      status = 'Active',
      tags = [],
    } = req.body;

    if (!name || !code || !domain) {
      return res.status(400).json({ success: false, message: 'Name, code, and domain are required.' });
    }

    const cleanCode = code.toUpperCase().trim();
    const existing = db.findOne('certifications', c => c.code === cleanCode);
    if (existing) {
      return res.status(400).json({ success: false, message: `Certification code '${cleanCode}' already exists.` });
    }

    const newCert = {
      id: `cert_${cleanCode.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: name.trim(),
      code: cleanCode,
      domain: domain.trim(),
      domainCode: domainCode || cleanCode.split('-')[1] || 'TECH',
      level: level || 'Professional Level',
      description: description || '',
      learningObjectives: learningObjectives || [],
      syllabus: syllabus || [],
      eligibility: eligibility || 'Open to professionals, students, and practitioners worldwide.',
      examPattern: examPattern || 'Online proctored exam, 60 MCQ questions, 90 minutes.',
      examFee: Number(examFee) || 4500,
      currency,
      duration: duration || '90 Minutes',
      passingCriteria: Number(passingCriteria) || 70,
      validityYears: Number(validityYears) || 3,
      version: '1.0',
      status: status || 'Active',
      tags,
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
    };

    db.addDoc('certifications', newCert);

    if (syllabus && Array.isArray(syllabus)) {
      db.addDoc('syllabi', {
        certificationId: newCert.id,
        certificationCode: newCert.code,
        modules: syllabus,
      });
    }

    logAudit(req, 'CREATE_CERTIFICATION', 'Certification Management', `Created program: ${newCert.name} (${newCert.code})`);

    return res.status(201).json({ success: true, message: 'Certification created successfully', certification: newCert });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create certification' });
  }
}

export async function updateCertification(req, res) {
  try {
    const { id } = req.params;
    const cert = db.findOne('certifications', c => c.id === id || c.code === id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    const updated = db.updateDoc('certifications', cert.id, req.body);
    logAudit(req, 'UPDATE_CERTIFICATION', 'Certification Management', `Updated program: ${cert.code}`);

    return res.json({ success: true, message: 'Certification updated successfully', certification: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update certification' });
  }
}

export async function toggleStatus(req, res) {
  try {
    const { id } = req.params;
    const cert = db.findOne('certifications', c => c.id === id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    const newStatus = cert.status === 'Active' ? 'Inactive' : 'Active';
    const updated = db.updateDoc('certifications', cert.id, { status: newStatus });
    logAudit(req, 'TOGGLE_STATUS', 'Certification Management', `Toggled ${cert.code} to ${newStatus}`);

    return res.json({ success: true, message: `Certification status changed to ${newStatus}`, certification: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to toggle status' });
  }
}

export async function deleteCertification(req, res) {
  try {
    const { id } = req.params;
    const cert = db.findOne('certifications', c => c.id === id || c.code === id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    db.deleteDoc('certifications', cert.id);
    // Also remove associated syllabi
    const syllabi = db.find('syllabi', s => s.certificationId === cert.id || s.certificationCode === cert.code);
    syllabi.forEach(s => db.deleteDoc('syllabi', s.id));

    logAudit(req, 'DELETE_CERTIFICATION', 'Certification Management', `Deleted certification: ${cert.code} (${cert.name})`);
    return res.json({ success: true, message: 'Certification deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete certification' });
  }
}

