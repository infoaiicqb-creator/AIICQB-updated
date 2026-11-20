import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

const DATA_DIR = path.resolve('server/src/data');

const certList = [
  { certNo: 'AICQB-ST-2026-000123', candId: 'AICQB-1004587', name: 'Rahul Deshmukh', email: 'rahul.deshmukh@gmail.com', country: 'India', certName: 'AICQB Certified Software Tester', certCode: 'AICQB-ST-CP', date: '10 Oct 2026', grade: 'Grade A (Merit)', status: 'Issued', score: 85 },
  { certNo: 'AICQB-INVALID-99', candId: 'AICQB-999999', name: 'Unknown', email: 'unknown@aicqb.org', country: 'India', certName: 'AICQB Certified Quality Analyst (Legacy)', certCode: 'AICQB-QA-LEGACY', date: '10 Jan 2022', grade: 'Disqualified / Expired', status: 'Revoked', score: 0 },
  { certNo: 'AICQB-AI-2026-000127', candId: 'AICQB-1004581', name: 'Pushpak Wani', email: 'pushpak@gmail.com', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 96 },
  { certNo: 'AICQB-ST-2026-000128', candId: 'AICQB-1004581', name: 'Pushpak Wani', email: 'pushpak@gmail.com', country: 'India', certName: 'AICQB Certified Software Tester', certCode: 'AICQB-ST-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 94 },
  { certNo: 'AICQB-AI-2026-000129', candId: 'AICQB-1004580', name: 'Super Admin', email: 'admin@aicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 98 },
  { certNo: 'AICQB-AI-2026-000130', candId: 'AICQB-1004585', name: 'khushboo Wani', email: 'khushi@gmail.com', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 92 },
  { certNo: 'AICQB-PW-2026-000131', candId: 'AICQB-1004586', name: 'Pavan', email: 'pavan@gmail.com', country: 'India', certName: 'AICQB Certified Playwright Automation', certCode: 'AICQB-PW-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 95 },
  { certNo: 'AICQB-AI-2026-000132', candId: 'AICQB-1004586', name: 'Pavan Desai', email: 'pavan@gmail.com', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 91 },
  { certNo: 'AICQB-AI-2026-000133', candId: 'AICQB-1004598', name: 'Vikram Joshi', email: 'student_a_1794333465002@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 74 },
  { certNo: 'AICQB-AI-2026-000134', candId: 'AICQB-1004599', name: 'Khushboo Sharma', email: 'student_b_1794333465435@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 94 },
  { certNo: 'AICQB-AI-2026-000135', candId: 'AICQB-1004600', name: 'Vikram Joshi', email: 'student_a_1794333485570@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 76 },
  { certNo: 'AICQB-AI-2026-000136', candId: 'AICQB-1004601', name: 'Khushboo Sharma', email: 'student_b_1794333485923@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 95 },
  { certNo: 'AICQB-AI-2026-000137', candId: 'AICQB-1004602', name: 'Vikram Joshi', email: 'student_a_1794333514708@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 72 },
  { certNo: 'AICQB-AI-2026-000138', candId: 'AICQB-1004603', name: 'Khushboo Sharma', email: 'student_b_1794333515041@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 93 },
  { certNo: 'AICQB-PW-2026-000139', candId: 'AICQB-1004604', name: 'Rahul patil', email: 'rahul@gmail.com', country: 'India', certName: 'AICQB Certified Playwright Automation', certCode: 'AICQB-PW-CP', date: '10 Nov 2026', grade: 'Grade A (Merit)', status: 'Issued', score: 86 },
  { certNo: 'AICQB-AI-2026-000140', candId: 'AICQB-1004605', name: 'Vikram Joshi', email: 'student_a_1794334551298@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 78 },
  { certNo: 'AICQB-AI-2026-000141', candId: 'AICQB-1004606', name: 'Khushboo Sharma', email: 'student_b_1794334552676@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 96 },
  { certNo: 'AICQB-ST-2026-000142', candId: 'AICQB-1004604', name: 'Rahul patil', email: 'rahul@gmail.com', country: 'India', certName: 'AICQB Certified Software Tester', certCode: 'AICQB-ST-CP', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 92 },
  { certNo: 'AICQB-DS-2026-000143', candId: 'AICQB-1004604', name: 'Rahul patil', email: 'rahul@gmail.com', country: 'India', certName: 'AICQB Certified Data Science Professional', certCode: 'AICQB-DS-201', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 90 },
  { certNo: 'AICQB-DS-2026-000144', candId: 'AICQB-1004582', name: 'Super Admin', email: 'admin@aicqb.org', country: 'India', certName: 'AICQB Certified Data Science Professional', certCode: 'AICQB-DS-201', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 95 },
  { certNo: 'AICQB-CY-2026-000145', candId: 'AICQB-1004604', name: 'Rahul patil', email: 'rahul@gmail.com', country: 'India', certName: 'AICQB Certified Cybersecurity Specialist', certCode: 'AICQB-CY-301', date: '10 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 94 },
  { certNo: 'AICQB-AI-2026-000146', candId: 'AICQB-1004604', name: 'Rahul patil', email: 'rahul@gmail.com', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '11 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 98 },
  { certNo: 'AICQB-CY-2026-000147', candId: 'AICQB-1004588', name: 'Ananya Roy', email: 'fail_test_1794336216207@aicqb.org', country: 'India', certName: 'AICQB Certified Cybersecurity Specialist', certCode: 'AICQB-CY-301', date: '11 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 93 },
  { certNo: 'AICQB-AI-2026-000148', candId: 'AICQB-1004588', name: 'Ananya Roy', email: 'fail_test_1794336216207@aicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '11 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 75 },
  { certNo: 'AICQB-AI-2026-000149', candId: 'AICQB-1004591', name: 'Ananya Roy', email: 'fail_test_1794336649236@aicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '11 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 78 },
  { certNo: 'AICQB-AI-2026-000150', candId: 'AICQB-1004592', name: 'Vikram Joshi', email: 'student_a_1794336676666@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '11 Nov 2026', grade: 'Grade B (Pass)', status: 'Issued', score: 74 },
  { certNo: 'AICQB-AI-2026-000151', candId: 'AICQB-1004593', name: 'Khushboo Sharma', email: 'student_b_1794336677028@testaicqb.org', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '11 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 94 },
  { certNo: 'AICQB-PW-2026-000152', candId: 'AICQB-1004607', name: 'Ramesh patil', email: 'ramesh@gmail.com', country: 'India', certName: 'AICQB Certified Playwright Automation', certCode: 'AICQB-PW-CP', date: '12 Nov 2026', grade: 'Grade A (Merit)', status: 'Issued', score: 88 },
  { certNo: 'AICQB-ST-2026-000153', candId: 'AICQB-1004607', name: 'Ramesh patil', email: 'ramesh@gmail.com', country: 'India', certName: 'AICQB Certified Software Tester', certCode: 'AICQB-ST-CP', date: '17 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 95 },
  { certNo: 'AICQB-PW-2026-000154', candId: 'AICQB-1004608', name: 'Mahesh Patil', email: 'mahesh@gmail.com', country: 'India', certName: 'AICQB Certified Playwright Automation', certCode: 'AICQB-PW-CP', date: '17 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 92 },
  { certNo: 'AICQB-AI-2026-000154', candId: 'AICQB-1004607', name: 'Ramesh patil', email: 'ramesh@gmail.com', country: 'India', certName: 'AICQB Certified AI Professional', certCode: 'AICQB-AI-CP', date: '19 Nov 2026', grade: 'Grade A+ (Distinction)', status: 'Issued', score: 96 }
];

async function seed() {
  // 1. Certificates
  const certificates = [];
  for (const c of certList) {
    const verificationUrl = `http://localhost:5000/verify?id=${c.certNo}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 250,
      color: { dark: '#10264B', light: '#FFFFFF' },
    });

    certificates.push({
      id: `cert_${c.certNo}`,
      certificateNo: c.certNo,
      candidateUid: `usr_${c.candId}`,
      candidateId: c.candId,
      candidateName: c.name,
      candidateEmail: c.email,
      certificationName: c.certName,
      certificationCode: c.certCode,
      credentialLevel: 'Professional Level',
      grade: c.grade,
      score: c.score,
      issueDate: new Date(c.date).toISOString(),
      issueDateFormatted: c.date,
      validUntilFormatted: '09 Nov 2029',
      status: c.status,
      verificationUrl,
      qrCodeDataUrl,
      issuer: {
        director: 'Dr. Neha Kulkarni',
        directorTitle: 'Director – Certification',
        ceo: 'Pushpak Wani',
        ceoTitle: 'Chief Executive Officer (CEO)',
        organization: 'AI International Certification & Qualification Board (AICQB)',
      },
      createdAt: new Date(c.date).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  fs.writeFileSync(path.join(DATA_DIR, 'certificates.json'), JSON.stringify(certificates, null, 2), 'utf-8');
  console.log(`Seeded ${certificates.length} certificates.`);

  // 2. Training Partners
  const trainingPartners = [
    { id: 'tp_1', partnerId: 'TP1001', name: 'TechSkills Academy Pune', location: 'Kharadi IT Park, Pune', country: 'India', programsCount: 8, status: 'Active', contactEmail: 'contact@techskills.in', contactPerson: 'Vivek Ranade', contactPhone: '+91 98220 88990', website: 'https://techskills.in' },
    { id: 'tp_2', partnerId: 'TP1002', name: 'Global QA Institute Bangalore', location: 'Electronic City, Bangalore', country: 'India', programsCount: 12, status: 'Active', contactEmail: 'contact@globalqa.org', contactPerson: 'Ananya Rao', contactPhone: '+91 98450 77889', website: 'https://globalqa.org' },
    { id: 'tp_3', partnerId: 'TP1003', name: 'Apex Testing Solutions Mumbai', location: 'BKC, Mumbai', country: 'India', programsCount: 6, status: 'Active', contactEmail: 'info@apextesting.com', contactPerson: 'Rajesh Mehra', contactPhone: '+91 98190 66554', website: 'https://apextesting.com' },
    { id: 'tp_4', partnerId: 'TP1004', name: 'Silicon Edge Learning USA', location: 'Silicon Valley, San Jose', country: 'United States', programsCount: 10, status: 'Active', contactEmail: 'info@siliconedge.edu', contactPerson: 'Dr. Robert King', contactPhone: '+1 (408) 555-8921', website: 'https://siliconedge.edu' },
    { id: 'tp_5', partnerId: 'TP1005', name: 'EuroQA Certification Institute', location: 'Frankfurt', country: 'Germany', programsCount: 7, status: 'Active', contactEmail: 'info@euroqa.de', contactPerson: 'Klaus Müller', contactPhone: '+49 69 9876 543', website: 'https://euroqa.de' },
    { id: 'tp_6', partnerId: 'TP1006', name: 'Singapore Tech Quality Board', location: 'One-North, Singapore', country: 'Singapore', programsCount: 5, status: 'Active', contactEmail: 'contact@stqb.sg', contactPerson: 'Mei Ling Tan', contactPhone: '+65 6789 4321', website: 'https://stqb.sg' },
    { id: 'tp_7', partnerId: 'TP1007', name: 'London QA & DevOps Academy', location: 'Moorgate, London', country: 'United Kingdom', programsCount: 9, status: 'Active', contactEmail: 'admin@londonqa.co.uk', contactPerson: 'James O’Connor', contactPhone: '+44 20 7946 0888', website: 'https://londonqa.co.uk' },
    { id: 'tp_8', partnerId: 'TP1008', name: 'Gulf Certification & Quality Centre', location: 'Dubai', country: 'UAE', programsCount: 6, status: 'Active', contactEmail: 'partnerships@gcqc.ae', contactPerson: 'Tariq Al-Mansoor', contactPhone: '+971 4 332 1100', website: 'https://gcqc.ae' },
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'trainingPartners.json'), JSON.stringify(trainingPartners, null, 2), 'utf-8');
  console.log(`Seeded ${trainingPartners.length} training partners.`);

  // 3. Memberships (Corporate & Affiliates)
  const memberships = [
    { id: 'mem_1', memberId: 'MEM1001', name: 'Innovatech Solutions', organization: 'Innovatech Solutions', type: 'Organization', plan: 'Corporate', status: 'Active', email: 'partnerships@innovatech.com', country: 'India' },
    { id: 'mem_2', memberId: 'MEM1002', name: 'Rohan Sharma', organization: 'Individual', type: 'Individual', plan: 'Professional', status: 'Active', email: 'rohan.sharma@gmail.com', country: 'India' },
    { id: 'mem_3', memberId: 'MEM1003', name: 'DataLearn Academy', organization: 'DataLearn Academy', type: 'Organization', plan: 'Corporate', status: 'Active', email: 'admin@datalearn.org', country: 'India' },
    { id: 'mem_4', memberId: 'MEM1004', name: 'Priya Deshmukh', organization: 'Individual', type: 'Individual', plan: 'Professional', status: 'Active', email: 'priya.deshmukh@yahoo.com', country: 'India' },
    { id: 'mem_5', memberId: 'MEM1005', name: 'Apex Cloud Networks', organization: 'Apex Cloud Networks', type: 'Organization', plan: 'Corporate', status: 'Active', email: 'enterprise@apexcloud.com', country: 'United States' },
    { id: 'mem_6', memberId: 'MEM1006', name: 'Sarah Jenkins', organization: 'Individual', type: 'Individual', plan: 'Professional', status: 'Active', email: 'sarah.jenkins@techqa.com', country: 'United States' },
    { id: 'mem_7', memberId: 'MEM1007', name: 'Nordic QA Systems', organization: 'Nordic QA Systems', type: 'Organization', plan: 'Corporate', status: 'Active', email: 'contact@nordicqa.se', country: 'Germany' },
    { id: 'mem_8', memberId: 'MEM1008', name: 'David Miller', organization: 'Individual', type: 'Individual', plan: 'Professional', status: 'Active', email: 'david.miller@uksecurity.org', country: 'United Kingdom' },
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'memberships.json'), JSON.stringify(memberships, null, 2), 'utf-8');
  console.log(`Seeded ${memberships.length} memberships.`);

  // 4. Candidates list with International Distribution
  const candidates = [
    { id: 'usr_1794238898604_8636ld', uid: 'usr_1794238898604_8636ld', candidateId: 'AICQB-1004581', fullName: 'Pushpak Wani', email: 'pushpak@gmail.com', country: 'India', domain: 'Software Testing & Quality Engineering', status: 'Active', createdAt: '2026-06-12T10:00:00.000Z' },
    { id: 'usr_1795161584876_gigns6', uid: 'usr_1795161584876_gigns6', candidateId: 'AICQB-1004704', fullName: 'Gaurav Patil', email: 'gaurav@gmail.com', country: 'India', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-11-20T07:59:44.879Z' },
    { id: 'usr_candidate_rahul_001', uid: 'usr_candidate_rahul_001', candidateId: 'AICQB-1004587', fullName: 'Rahul Deshmukh', email: 'rahul.deshmukh@gmail.com', country: 'India', domain: 'Software Testing & Quality Engineering', status: 'Active', createdAt: '2026-06-18T09:00:00.000Z' },
    { id: 'usr_rohan_sharma_1001', uid: 'usr_rohan_sharma_1001', candidateId: 'AICQB-100567', fullName: 'Rohan Sharma', email: 'rohan.sharma@gmail.com', country: 'India', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-08-10T14:30:00.000Z' },
    { id: 'usr_sarah_jenkins_1003', uid: 'usr_sarah_jenkins_1003', candidateId: 'AICQB-1004590', fullName: 'Sarah Jenkins', email: 'sarah.jenkins@techqa.com', country: 'United States', domain: 'Software Testing & Quality Engineering', status: 'Active', createdAt: '2026-08-22T18:15:00.000Z' },
    { id: 'usr_david_miller_1004', uid: 'usr_david_miller_1004', candidateId: 'AICQB-1004591', fullName: 'David Miller', email: 'david.miller@uksecurity.org', country: 'United Kingdom', domain: 'Cybersecurity & Governance', status: 'Active', createdAt: '2026-09-14T12:00:00.000Z' },
    { id: 'usr_kenji_sato_1005', uid: 'usr_kenji_sato_1005', candidateId: 'AICQB-1004592', fullName: 'Kenji Sato', email: 'kenji.sato@sgtech.sg', country: 'Singapore', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-10-04T10:45:00.000Z' },
    { id: 'usr_hans_weber_1006', uid: 'usr_hans_weber_1006', candidateId: 'AICQB-1004593', fullName: 'Hans Weber', email: 'hans.weber@berlinqa.de', country: 'Germany', domain: 'Software Testing & Quality Engineering', status: 'Active', createdAt: '2026-10-18T15:20:00.000Z' },
    { id: 'usr_ahmed_maktoum_1007', uid: 'usr_ahmed_maktoum_1007', candidateId: 'AICQB-1004594', fullName: 'Ahmed Al-Maktoum', email: 'ahmed.maktoum@dubaigov.ae', country: 'UAE', domain: 'Cloud & API Verification', status: 'Active', createdAt: '2026-11-01T08:30:00.000Z' },
    { id: 'usr_emily_tremblay_1009', uid: 'usr_emily_tremblay_1009', candidateId: 'AICQB-1004596', fullName: 'Emily Tremblay', email: 'emily.tremblay@torontotech.ca', country: 'Canada', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-11-07T14:40:00.000Z' },
    { id: 'usr_liam_smith_1008', uid: 'usr_liam_smith_1008', candidateId: 'AICQB-1004595', fullName: 'Liam Smith', email: 'liam.smith@sydneyqa.com.au', country: 'Australia', domain: 'Software Testing & Quality Engineering', status: 'Active', createdAt: '2026-11-03T11:10:00.000Z' },
    { id: 'usr_khushboo_1004585', uid: 'usr_khushboo_1004585', candidateId: 'AICQB-1004585', fullName: 'khushboo Wani', email: 'khushi@gmail.com', country: 'India', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-11-08T10:00:00.000Z' },
    { id: 'usr_pavan_1004586', uid: 'usr_pavan_1004586', candidateId: 'AICQB-1004586', fullName: 'Pavan Desai', email: 'pavan@gmail.com', country: 'India', domain: 'Playwright Automation Engineering', status: 'Active', createdAt: '2026-11-08T12:00:00.000Z' },
    { id: 'usr_rahul_patil_1004604', uid: 'usr_rahul_patil_1004604', candidateId: 'AICQB-1004604', fullName: 'Rahul patil', email: 'rahul@gmail.com', country: 'India', domain: 'Data Science & Machine Learning', status: 'Active', createdAt: '2026-11-09T09:00:00.000Z' },
    { id: 'usr_ananya_1004588', uid: 'usr_ananya_1004588', candidateId: 'AICQB-1004588', fullName: 'Ananya Roy', email: 'fail_test_1794336216207@aicqb.org', country: 'India', domain: 'Cybersecurity & Governance', status: 'Active', createdAt: '2026-11-10T14:00:00.000Z' },
    { id: 'usr_ramesh_1004607', uid: 'usr_ramesh_1004607', candidateId: 'AICQB-1004607', fullName: 'Ramesh patil', email: 'ramesh@gmail.com', country: 'India', domain: 'Playwright Automation Engineering', status: 'Active', createdAt: '2026-11-12T16:00:00.000Z' },
    { id: 'usr_mahesh_1004608', uid: 'usr_mahesh_1004608', candidateId: 'AICQB-1004608', fullName: 'Mahesh Patil', email: 'mahesh@gmail.com', country: 'India', domain: 'Playwright Automation Engineering', status: 'Active', createdAt: '2026-11-15T11:00:00.000Z' },
    { id: 'usr_vikram_1004598', uid: 'usr_vikram_1004598', candidateId: 'AICQB-1004598', fullName: 'Vikram Joshi', email: 'student_a_1794333465002@testaicqb.org', country: 'India', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-11-10T10:00:00.000Z' },
    { id: 'usr_khushboo_sharma_1004599', uid: 'usr_khushboo_sharma_1004599', candidateId: 'AICQB-1004599', fullName: 'Khushboo Sharma', email: 'student_b_1794333465435@testaicqb.org', country: 'India', domain: 'Artificial Intelligence & Machine Learning', status: 'Active', createdAt: '2026-11-10T11:00:00.000Z' },
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'candidates.json'), JSON.stringify(candidates, null, 2), 'utf-8');
  console.log(`Seeded ${candidates.length} candidates.`);

  // 5. Restore Exams & Question Bank
  const exams = [
    {
      id: 'exam_ai_cp_001',
      examCode: 'AICQB-AI-CP-EXAM',
      title: 'AICQB Certified AI Professional – Comprehensive Proctored Window',
      certificationId: 'cert_aicqb_ai_cp',
      certificationName: 'AICQB Certified AI Professional',
      certificationCode: 'AICQB-AI-CP',
      domain: 'Artificial Intelligence & Machine Learning',
      scheduledDate: '2026-11-20',
      scheduledTime: '10:00 AM IST',
      durationMinutes: 90,
      totalQuestions: 10,
      passingScore: 70,
      maxAttempts: 2,
      registeredCandidatesCount: 28,
      status: 'active',
      proctoringMode: 'Automated AI Sandbox',
      createdAt: '2026-11-10T10:00:00.000Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'exam_ds_201_002',
      examCode: 'AICQB-DS-201-EXAM',
      title: 'AICQB Certified Data Science Professional – Fall Assessment',
      certificationId: 'cert_aicqb_ds_201',
      certificationName: 'AICQB Certified Data Science Professional',
      certificationCode: 'AICQB-DS-201',
      domain: 'Data Science & Machine Learning',
      scheduledDate: '2026-11-22',
      scheduledTime: '02:00 PM IST',
      durationMinutes: 90,
      totalQuestions: 10,
      passingScore: 70,
      maxAttempts: 2,
      registeredCandidatesCount: 16,
      status: 'active',
      proctoringMode: 'Automated AI Sandbox',
      createdAt: '2026-11-11T11:00:00.000Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'exam_st_cp_003',
      examCode: 'AICQB-ST-CP-EXAM',
      title: 'AICQB Certified Software Tester – Standard Proctored Assessment',
      certificationId: 'cert_aicqb_st_cp',
      certificationName: 'AICQB Certified Software Tester',
      certificationCode: 'AICQB-ST-CP',
      domain: 'Software Testing & Quality Engineering',
      scheduledDate: '2026-11-24',
      scheduledTime: '11:00 AM IST',
      durationMinutes: 90,
      totalQuestions: 10,
      passingScore: 70,
      maxAttempts: 2,
      registeredCandidatesCount: 24,
      status: 'active',
      proctoringMode: 'Automated AI Sandbox',
      createdAt: '2026-11-12T09:00:00.000Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'exam_pw_cp_004',
      examCode: 'AICQB-PW-CP-EXAM',
      title: 'AICQB Certified Playwright Automation Specialist – Practical Rubric Window',
      certificationId: 'cert_aicqb_pw_cp',
      certificationName: 'AICQB Certified Playwright Automation',
      certificationCode: 'AICQB-PW-CP',
      domain: 'Software Testing & Quality Engineering',
      scheduledDate: '2026-11-26',
      scheduledTime: '03:30 PM IST',
      durationMinutes: 90,
      totalQuestions: 10,
      passingScore: 70,
      maxAttempts: 2,
      registeredCandidatesCount: 19,
      status: 'active',
      proctoringMode: 'Automated AI Sandbox',
      createdAt: '2026-11-13T14:00:00.000Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'exam_cy_301_005',
      examCode: 'AICQB-CY-301-EXAM',
      title: 'AICQB Certified Cybersecurity Specialist – Governance & Defense Assessment',
      certificationId: 'cert_aicqb_cy_301',
      certificationName: 'AICQB Certified Cybersecurity Specialist',
      certificationCode: 'AICQB-CY-301',
      domain: 'Cybersecurity & Governance',
      scheduledDate: '2026-11-28',
      scheduledTime: '05:00 PM IST',
      durationMinutes: 90,
      totalQuestions: 10,
      passingScore: 70,
      maxAttempts: 2,
      registeredCandidatesCount: 14,
      status: 'active',
      proctoringMode: 'Automated AI Sandbox',
      createdAt: '2026-11-14T16:00:00.000Z',
      updatedAt: new Date().toISOString(),
    },
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'exams.json'), JSON.stringify(exams, null, 2), 'utf-8');
  console.log(`Seeded ${exams.length} active exams.`);

  // 6. Question Bank (22 questions)
  const defaultQuestions = [
    { id: 'q_ai_1', number: 1, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'In modern machine learning and artificial intelligence systems, which evaluation metric is most appropriate for evaluating classification models on heavily imbalanced datasets?', options: ['Accuracy', 'F1-Score / Harmonic Mean of Precision & Recall', 'Mean Absolute Error (MAE)', 'Root Mean Squared Deviation (RMSD)'], correctOption: 1, points: 10, difficulty: 'Medium' },
    { id: 'q_ai_2', number: 2, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'Which architectural pattern best ensures zero-downtime, fault-tolerant microservices under peak production loads?', options: ['Direct synchronous RPC chaining', 'Idempotent consumer patterns, asynchronous event queues, and circuit breaking', 'Single monolithic database connection pool', 'Global lock mutex synchronization'], correctOption: 1, points: 10, difficulty: 'Hard' },
    { id: 'q_ai_3', number: 3, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'What is the primary objective of automated CI/CD regression gating before production releases?', options: ['Manual sign-off tracking', 'Early defect detection and deterministic artifact verification', 'Increasing network latency', 'Eliminating source version control'], correctOption: 1, points: 10, difficulty: 'Easy' },
    { id: 'q_ai_4', number: 4, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'In deep learning neural networks, what is the mathematical role of the Backpropagation algorithm during training?', options: ['Decreasing model layers', 'Calculating the gradient of the loss function with respect to weights using the chain rule', 'Formatting input dataset tensors', 'Selecting host hardware architecture'], correctOption: 1, points: 10, difficulty: 'Medium' },
    { id: 'q_ai_5', number: 5, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'When deploying LLM applications to production, which defensive engineering technique best mitigates prompt injection vulnerabilities?', options: ['Removing system prompts', 'Input sandboxing, strict output schemas, and dual-LLM verification', 'Increasing temperature', 'Disabling API keys'], correctOption: 1, points: 10, difficulty: 'Hard' },
    { id: 'q_ai_6', number: 6, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'In modern secure architectures, what is the best practice for verifying JWT authentication tokens in API gateways?', options: ['Direct signature verification against public cryptographic keys with strict expiry claims checks', 'Allowing unverified tokens without algorithmic headers', 'Accepting expired tokens for background refreshes without validation', 'Storing raw unsigned tokens in cleartext URL query parameters'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_st_1', number: 7, type: 'mcq', certificationCode: 'AICQB-ST-CP', domain: 'Software Testing & Quality Engineering', question: 'Which black-box test design technique partitions input data into valid and invalid classes from which test cases are derived?', options: ['Equivalence Partitioning', 'Mutation Testing', 'Control Flow Testing', 'Statement Coverage'], correctOption: 0, points: 10, difficulty: 'Easy' },
    { id: 'q_st_2', number: 8, type: 'mcq', certificationCode: 'AICQB-ST-CP', domain: 'Software Testing & Quality Engineering', question: 'What is the core difference between Regression Testing and Retesting?', options: ['Retesting confirms bug fixes; Regression testing ensures unchanged areas are unaffected', 'They are identical concepts with different nomenclature', 'Regression is manual; Retesting is always automated', 'Regression tests performance; Retesting tests usability'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_pw_1', number: 9, type: 'mcq', certificationCode: 'AICQB-PW-CP', domain: 'Software Testing & Quality Engineering', question: 'In Microsoft Playwright, which locator strategy is recommended as the most resilient against DOM refactoring?', options: ['Exact XPath expressions', 'page.getByRole() and user-facing accessibility attributes', 'CSS class chaining', 'Absolute pixel coordinate clicks'], correctOption: 1, points: 10, difficulty: 'Medium' },
    { id: 'q_pw_2', number: 10, type: 'mcq', certificationCode: 'AICQB-PW-CP', domain: 'Software Testing & Quality Engineering', question: 'How does Playwright achieve isolation between parallel browser test executions?', options: ['Shared browser cache directories', 'Isolated BrowserContext instances with independent cookies and local storage', 'Restarting the physical host machine', 'Single-threaded synchronous event queue'], correctOption: 1, points: 10, difficulty: 'Medium' },
    { id: 'q_ds_1', number: 11, type: 'mcq', certificationCode: 'AICQB-DS-201', domain: 'Data Science & Machine Learning', question: 'Which technique is primarily used to prevent overfitting in complex decision trees?', options: ['Cost-complexity tree pruning', 'Increasing maximum tree depth indefinitely', 'Removing train-test splits', 'Using unnormalized one-hot vectors without scaling'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_ds_2', number: 12, type: 'mcq', certificationCode: 'AICQB-DS-201', domain: 'Data Science & Machine Learning', question: 'What does the Central Limit Theorem state regarding the sample mean of independent random variables?', options: ['Sample mean approaches a normal distribution as sample size grows large regardless of shape', 'Sample variance always equals zero', 'Population mean is never equal to sample mean', 'The distribution must always be binomial'], correctOption: 0, points: 10, difficulty: 'Hard' },
    { id: 'q_cy_1', number: 13, type: 'mcq', certificationCode: 'AICQB-CY-301', domain: 'Cybersecurity & Governance', question: 'In the Zero Trust security model, what is the foundational operational principle?', options: ['Never trust, always verify, and assume breach', 'Trust internal perimeter networks implicitly', 'Store private credentials in plain git repositories', 'Disable multi-factor authentication for administrators'], correctOption: 0, points: 10, difficulty: 'Easy' },
    { id: 'q_cy_2', number: 14, type: 'mcq', certificationCode: 'AICQB-CY-301', domain: 'Cybersecurity & Governance', question: 'Which cryptographic algorithm is classified as an asymmetric public-key cryptosystem?', options: ['AES-256', 'RSA / Elliptic Curve Cryptography (ECC)', 'HMAC-SHA256', 'ChaCha20'], correctOption: 1, points: 10, difficulty: 'Medium' },
    { id: 'q_ai_7', number: 15, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'What is the vanishing gradient problem primarily associated with in deep networks with sigmoid activations?', options: ['Gradients becoming infinitesimally small in early layers during backprop', 'Weights growing toward infinity', 'GPU out of memory exceptions', 'Loss function becoming negative'], correctOption: 0, points: 10, difficulty: 'Hard' },
    { id: 'q_ai_8', number: 16, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'Which transformer component enables attending to different representation subspaces at different positions?', options: ['Multi-Head Self-Attention', 'Dropout layer', 'Residual addition', 'Layer normalization'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_st_3', number: 17, type: 'mcq', certificationCode: 'AICQB-ST-CP', domain: 'Software Testing & Quality Engineering', question: 'What does Boundary Value Analysis (BVA) specifically target during functional test specification?', options: ['Values at the edges and just beyond valid/invalid partitions', 'Only middle median values', 'Random fuzz inputs', 'Syntactic grammatical errors'], correctOption: 0, points: 10, difficulty: 'Easy' },
    { id: 'q_pw_3', number: 18, type: 'mcq', certificationCode: 'AICQB-PW-CP', domain: 'Software Testing & Quality Engineering', question: 'What feature does Playwright use to automatically wait for elements to be actionable before performing actions?', options: ['Auto-waiting and actionability assertions', 'Hardcoded sleep timers', 'Polling every 10 seconds via while loops', 'Manual try-catch wrappers'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_ds_3', number: 19, type: 'mcq', certificationCode: 'AICQB-DS-201', domain: 'Data Science & Machine Learning', question: 'Which dimension reduction technique finds orthogonal axes maximizing dataset variance?', options: ['Principal Component Analysis (PCA)', 'K-Means clustering', 'Naive Bayes classification', 'Linear regression'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_cy_3', number: 20, type: 'mcq', certificationCode: 'AICQB-CY-301', domain: 'Cybersecurity & Governance', question: 'What type of cyberattack tricks a user into executing unwanted actions on an authenticated web app?', options: ['Cross-Site Request Forgery (CSRF)', 'SQL Injection', 'Buffer Overflow', 'DNS Poisoning'], correctOption: 0, points: 10, difficulty: 'Medium' },
    { id: 'q_ai_9', number: 21, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'In reinforcement learning, what does the discount factor (gamma) determine?', options: ['The present value of future long-term rewards vs immediate rewards', 'The learning rate of the optimizer', 'The number of hidden layers', 'The batch size during gradient descent'], correctOption: 0, points: 10, difficulty: 'Hard' },
    { id: 'q_ai_10', number: 22, type: 'mcq', certificationCode: 'AICQB-AI-CP', domain: 'Artificial Intelligence & Machine Learning', question: 'What is the purpose of temperature parameter in generative language model sampling?', options: ['Controls randomness: higher values increase diversity, lower values make output more deterministic', 'Sets the physical GPU cooling speed', 'Defines the maximum context length', 'Determines the tokenization dictionary size'], correctOption: 0, points: 10, difficulty: 'Medium' },
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'questions.json'), JSON.stringify(defaultQuestions, null, 2), 'utf-8');
  console.log(`Seeded ${defaultQuestions.length} questions in Question Bank.`);
}

seed().catch(console.error);
