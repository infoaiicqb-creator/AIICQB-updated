import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const certificates = [
  {
    id: 'cert_rec_rohan_100567',
    certificateNo: 'AICQB-CERT-100567',
    candidateUid: 'usr_rohan_sharma_1001',
    candidateId: 'AICQB-100567',
    candidateName: 'Rohan Sharma',
    certificationId: 'cert_aicqb_ai_cp',
    certificationName: 'AICQB Certified AI Professional',
    certificationCode: 'AICQB-AI-CP',
    credentialLevel: 'Executive Professional Level',
    grade: 'Grade A+ (Distinction)',
    score: 94,
    issueDate: '2026-08-15T10:00:00.000Z',
    issueDateFormatted: '15 Aug 2026',
    validUntil: '2029-08-14T10:00:00.000Z',
    validUntilFormatted: '14 Aug 2029',
    status: 'Issued',
    verificationUrl: 'http://localhost:5000/verify?id=AICQB-CERT-100567',
    issuer: {
      director: 'Dr. Neha Kulkarni',
      directorTitle: 'Director – Certification',
      ceo: 'Pushpak Wani',
      ceoTitle: 'Chief Executive Officer (CEO)',
      organization: 'AI International Certification & Qualification Board (AICQB)',
    },
    disclaimer: 'Issued by AICQB under its independent certification scheme. This is a private professional certification and is not a government qualification or licence.',
    createdAt: '2026-08-15T10:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cert_rec_rahul_001',
    certificateNo: 'AICQB-ST-2026-000123',
    candidateUid: 'usr_candidate_rahul_001',
    candidateId: 'AICQB-1004587',
    candidateName: 'Rahul Deshmukh',
    certificationId: 'cert_aicqb_st_cp',
    certificationName: 'AICQB Certified Software Tester',
    certificationCode: 'AICQB-ST-CP',
    credentialLevel: 'Professional Level',
    grade: 'Grade A (Merit)',
    score: 85,
    issueDate: '2026-10-10T10:00:00.000Z',
    issueDateFormatted: '10 Oct 2026',
    validUntil: '2029-10-09T10:00:00.000Z',
    validUntilFormatted: '09 Oct 2029',
    status: 'Issued',
    verificationUrl: 'http://localhost:5000/verify?id=AICQB-ST-2026-000123',
    issuer: {
      director: 'Dr. Neha Kulkarni',
      directorTitle: 'Director – Certification',
      ceo: 'Pushpak Wani',
      ceoTitle: 'Chief Executive Officer (CEO)',
      organization: 'AI International Certification & Qualification Board (AICQB)',
    },
    disclaimer: 'Issued by AICQB under its independent certification scheme. This is a private professional certification and is not a government qualification or licence.',
    createdAt: '2026-10-10T10:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cert_rec_revoked_99',
    certificateNo: 'AICQB-INVALID-99',
    candidateUid: 'usr_unknown_99',
    candidateId: 'AICQB-999999',
    candidateName: 'Unknown',
    certificationId: 'cert_aicqb_legacy',
    certificationName: 'AICQB Certified Quality Analyst (Legacy)',
    certificationCode: 'AICQB-QA-LEGACY',
    credentialLevel: 'Revoked Credential',
    grade: 'Disqualified / Expired',
    score: 0,
    issueDate: '2022-01-10T10:00:00.000Z',
    issueDateFormatted: '10 Jan 2022',
    validUntil: '2024-01-09T10:00:00.000Z',
    validUntilFormatted: '09 Jan 2024 (Expired)',
    status: 'Revoked',
    revocationReason: 'Credential revoked by AICQB Academic & Certification Council due to credential expiration & non-compliance.',
    revokedAt: '2024-01-15T10:00:00.000Z',
    verificationUrl: 'http://localhost:5000/verify?id=AICQB-INVALID-99',
    issuer: {
      director: 'Dr. Neha Kulkarni',
      directorTitle: 'Director – Certification',
      ceo: 'Pushpak Wani',
      ceoTitle: 'Chief Executive Officer (CEO)',
      organization: 'AI International Certification & Qualification Board (AICQB)',
    },
    disclaimer: 'THIS CREDENTIAL HAS BEEN FORMALLY REVOKED. It holds no official certification validity.',
    createdAt: '2022-01-10T10:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
];

async function run() {
  for (const c of certificates) {
    c.qrCodeDataUrl = await QRCode.toDataURL(c.verificationUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 250,
      color: {
        dark: '#10264B',
        light: '#FFFFFF',
      },
    });
  }

  const filePath = path.resolve('server/src/data/certificates.json');
  fs.writeFileSync(filePath, JSON.stringify(certificates, null, 2), 'utf-8');
  console.log('Successfully updated certificates.json with', certificates.length, 'certificates.');
}

run().catch(console.error);

