import QRCode from 'qrcode';
import db from '../config/db.js';

export async function generateCertificate({
  candidateUid,
  candidateName,
  candidateId,
  candidateEmail,
  certificationId,
  certificationName,
  certificationCode,
  credentialLevel = 'Professional Level',
  domainCode = 'AI',
  grade,
  percentage,
  score,
  issueDate: customIssueDate,
  validUntil: customValidUntil,
  certificateNo: customCertNo,
  forceNew = false,
}) {
  // 1. Strict Minimum 70% Passing Criteria Check
  const effectiveScore = score !== undefined ? score : (percentage !== undefined ? percentage : 85);
  if (percentage !== undefined && percentage !== null && Number(percentage) < 70) {
    throw new Error(
      `Cannot generate certificate: Candidate scored ${percentage}%, which is below the mandatory 70% passing standard.`
    );
  }

  // 2. Database Validation & One Exam - One Certificate Rule (Idempotency)
  if (!forceNew) {
    const existingCert = db.findOne('certificates', c =>
      ((candidateUid && c.candidateUid === candidateUid) ||
        (candidateId && c.candidateId === candidateId) ||
        (candidateEmail && c.candidateEmail?.toLowerCase() === candidateEmail.toLowerCase())) &&
      ((certificationId && c.certificationId === certificationId) ||
        (certificationCode && c.certificationCode === certificationCode))
    );

    if (existingCert) {
      return existingCert;
    }
  }

  const currentYear = new Date().getFullYear();
  // Count existing certificates to generate sequence
  const allCerts = db.getCollection('certificates');
  const seq = String(allCerts.length + 124).padStart(6, '0');
  
  // Format matching Screenshot: AICQB-[DOMAIN]-[YEAR]-[SEQUENCE] or custom
  const cleanDomain = (domainCode || 'AI').toUpperCase();
  const certificateNo = customCertNo || `AICQB-${cleanDomain}-${currentYear}-${seq}`;

  const calculatedGrade = grade || (effectiveScore >= 90 ? 'Grade A+ (Distinction)' : effectiveScore >= 80 ? 'Grade A (Merit)' : effectiveScore >= 70 ? 'Grade B (Pass)' : 'Grade A+ (Distinction)');

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5000';
  const verificationUrl = `${clientUrl}/verify?id=${encodeURIComponent(certificateNo)}`;

  // Generate real QR code as data URL
  const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 250,
    color: {
      dark: '#10264B',
      light: '#FFFFFF',
    },
  });

  const issueDate = customIssueDate ? new Date(customIssueDate) : new Date();
  const validUntil = customValidUntil ? new Date(customValidUntil) : new Date(issueDate);
  if (!customValidUntil) {
    validUntil.setFullYear(validUntil.getFullYear() + 3); // 3 years validity
  }

  const generalSettings = db.findOne('systemSettings', s => s.id === 'general') || {};
  const currentCeo = generalSettings.ceoName || 'Pushpak Wani';
  const currentCeoTitle = generalSettings.ceoTitle || 'Chief Executive Officer (CEO)';
  const currentDirector = generalSettings.directorName || 'Dr. Neha Kulkarni';
  const currentDirectorTitle = generalSettings.directorTitle || 'Director – Certification';

  const certificateRecord = {
    id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    certificateNo,
    candidateUid,
    candidateId,
    candidateName,
    candidateEmail,
    certificationId,
    certificationName,
    certificationCode: certificationCode || `AICQB-${cleanDomain}-CP`,
    credentialLevel,
    grade: calculatedGrade,
    score: effectiveScore,
    issueDate: issueDate.toISOString(),
    issueDateFormatted: issueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    validUntil: validUntil.toISOString(),
    validUntilFormatted: validUntil.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Issued',
    verificationUrl,
    qrCodeDataUrl,
    issuer: {
      director: currentDirector,
      directorTitle: currentDirectorTitle,
      ceo: currentCeo,
      ceoTitle: currentCeoTitle,
      organization: 'AI International Certification & Qualification Board (AICQB)',
    },
    disclaimer: 'Issued by AICQB under its independent certification scheme. This is a private professional certification and is not a government qualification or licence.',
  };

  db.addDoc('certificates', certificateRecord);

  // Also log into certificateVerification collection
  db.addDoc('certificateVerification', {
    certificateNo,
    candidateName,
    certificationName,
    verifiedCount: 0,
    createdAt: new Date().toISOString(),
  });

  return certificateRecord;
}

