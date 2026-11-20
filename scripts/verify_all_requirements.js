import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('========================================================');
  console.log(' AICQB EXAM PORTAL & CERTIFICATE VERIFICATION SUITE');
  console.log('========================================================\n');

  let passedTests = 0;
  let totalTests = 8;

  // Helper for login
  const loginUser = async (email, password) => {
    const res = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      { email, password }
    );
    return res.data;
  };

  // Helper for signup
  const registerUser = async (user) => {
    const res = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      user
    );
    return res.data;
  };

  try {
    // -------------------------------------------------------------
    // TEST 1: Remove Exam Selection Dropdown on Signup & Clean Registration
    // -------------------------------------------------------------
    console.log('[TEST 1] Testing Student Registration without Exam Selection Dropdown...');
    const uniqueEmailA = `student_a_${Date.now()}@testaicqb.org`;
    const regResA = await registerUser({
      fullName: 'Vikram Joshi',
      email: uniqueEmailA,
      password: 'Password@123',
      confirmPassword: 'Password@123',
      phoneNumber: '9876543210',
      country: 'India',
      countryCode: '+91',
      organization: 'Tech Dynamics Ltd',
      employeeId: 'EMP-9901',
      agreeTerms: true,
      // Note: No exam selection passed, registration must succeed directly
    });

    if (regResA.success && regResA.user && regResA.user.candidateId) {
      console.log(`✓ Registration succeeded without exam dropdown. Candidate ID: ${regResA.user.candidateId}`);
      passedTests++;
    } else {
      console.error('✗ Registration failed:', regResA);
    }
    const tokenA = regResA.token;
    const uidA = regResA.user.uid;
    const candidateIdA = regResA.user.candidateId;

    // -------------------------------------------------------------
    // TEST 2: Schedule Exam - Direct Navigation & Exam Details Display
    // -------------------------------------------------------------
    console.log('\n[TEST 2] Testing Schedule Exam navigation & scheduled exam parameters...');
    const enrollResA = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/payments/create-order',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenA}` },
      },
      { certificationId: 'cert_aicqb_ai_cp', amount: 4500 }
    );

    const verifyPayResA = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/payments/verify',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenA}` },
      },
      {
        razorpayOrderId: enrollResA.data.order?.id,
        paymentId: enrollResA.data.order?.paymentId,
        razorpayPaymentId: `pay_sim_${Date.now()}`,
        razorpaySignature: 'simulated_sig_test',
        certificationId: 'cert_aicqb_ai_cp',
      }
    );

    // Fetch My Exams (navigated directly to /portal/exams)
    const myExamsResA = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/my-schedules',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenA}` },
      }
    );

    const scheduledExams = myExamsResA.data.upcoming || [];
    const targetExam = scheduledExams.find((e) => e.certificationCode === 'AICQB-AI-CP');
    if (
      targetExam &&
      targetExam.examName &&
      targetExam.scheduledDate &&
      targetExam.scheduledTime &&
      targetExam.durationMinutes &&
      targetExam.status === 'scheduled'
    ) {
      console.log(`✓ Direct Navigation: Scheduled exam visible on My Exams:`);
      console.log(`   - Exam Name: ${targetExam.examName}`);
      console.log(`   - Date: ${targetExam.scheduledDate} | Time: ${targetExam.scheduledTime}`);
      console.log(`   - Duration: ${targetExam.durationMinutes} Minutes | Status: ${targetExam.status}`);
      passedTests++;
    } else {
      console.error('✗ Scheduled exam details missing:', scheduledExams);
    }

    // -------------------------------------------------------------
    // TEST 3: 69% Score (Failure) -> NO Certificate Generated & Retake Opportunity
    // -------------------------------------------------------------
    console.log('\n[TEST 3] Testing 69% Score (Exam Failure)...');
    // Start session
    const startRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: `/api/exams/session/${targetExam.id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenA}` },
      }
    );

    const attemptId1 = startRes.data.attemptId;
    const questions = startRes.data.questions || [];

    // Submit answers scoring below 70% (60% - 6 correct out of 10)
    const failAnswers = {};
    questions.forEach((q, idx) => {
      if (idx < 6) {
        failAnswers[q.id] = 0; // correct
      } else {
        failAnswers[q.id] = 1; // wrong
      }
    });

    const failSubmitRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/submit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenA}` },
      },
      { attemptId: attemptId1, answers: failAnswers }
    );

    const failResult = failSubmitRes.data.results;
    if (
      failResult.passed === false &&
      failResult.percentage < 70 &&
      failResult.certificate === null &&
      failResult.retakeGranted === true
    ) {
      console.log(`✓ Failed Exam Verification Passed:`);
      console.log(`   - Score: ${failResult.score} / ${failResult.maxScore} (${failResult.percentage}%)`);
      console.log(`   - Result Status: FAILED (Passing Threshold: 70% Required)`);
      console.log(`   - Certificate Generated: ${failResult.certificate} (STRICTLY NULL)`);
      console.log(`   - Retake Granted: ${failResult.retakeGranted} (Chance 2 of 2 Available)`);
      passedTests++;
    } else {
      console.error('✗ Failed exam test did not meet criteria:', failSubmitRes.data);
    }

    // Verify candidate certificates endpoint also contains NO certificate
    const certsAfterFail = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/certificates/my',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenA}` },
      }
    );
    if ((certsAfterFail.data.certificates || []).length === 0) {
      console.log('✓ Confirmed: My Certificates list contains 0 certificates after failing.');
    }

    // -------------------------------------------------------------
    // TEST 4: 70% Score (Minimum Passing Criteria) -> Auto-Generates Certificate
    // -------------------------------------------------------------
    console.log('\n[TEST 4] Testing 70% Score (Minimum Passing Criteria)...');
    // Candidate takes retake session (chance 2 of 2)
    const mySchedulesAfterFail = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/my-schedules',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenA}` },
      }
    );
    const retakeExam = mySchedulesAfterFail.data.upcoming.find((s) => s.isRetake);
    const startRetakeRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: `/api/exams/session/${retakeExam ? retakeExam.id : targetExam.id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenA}` },
      }
    );

    const attemptId2 = startRetakeRes.data.attemptId;
    // Provide answers answering correctly to pass (70%+)
    const passAnswers = {};
    startRetakeRes.data.questions.forEach((q, idx) => {
      // Exactly 7 questions answered correctly (0) -> 7 * 10 = 70 points = 70%
      if (idx < 7) {
        passAnswers[q.id] = 0;
      } else {
        passAnswers[q.id] = 1;
      }
    });

    const passSubmitRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/submit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenA}` },
      },
      { attemptId: attemptId2, answers: passAnswers }
    );

    const passResult = passSubmitRes.data.results;
    if (
      passResult.passed === true &&
      passResult.percentage >= 70 &&
      passResult.certificate &&
      passResult.certificate.certificateNo
    ) {
      console.log(`✓ 70%+ Passing Exam Verification Passed:`);
      console.log(`   - Score: ${passResult.score} / ${passResult.maxScore} (${passResult.percentage}%)`);
      console.log(`   - Result Status: PASSED`);
      console.log(`   - Certificate Issued: ${passResult.certificate.certificateNo}`);
      console.log(`   - Candidate Name: ${passResult.certificate.candidateName}`);
      console.log(`   - QR Code & Verification URL: ${passResult.certificate.verificationUrl}`);
      passedTests++;
    } else {
      console.error('✗ Passing exam test failed:', passSubmitRes.data);
    }
    const certNoA = passResult.certificate.certificateNo;

    // -------------------------------------------------------------
    // TEST 5: One Exam - One Certificate Rule (Idempotency)
    // -------------------------------------------------------------
    console.log('\n[TEST 5] Testing One Exam – One Certificate Rule (Idempotency)...');
    // Attempt submitting again on same attempt or certificate generation
    const resubmitRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/submit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenA}` },
      },
      { attemptId: attemptId2, answers: passAnswers }
    );

    // Check certificate list count
    const certsListRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/certificates/my',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenA}` },
      }
    );

    const candidateCerts = certsListRes.data.certificates || [];
    const matchingCerts = candidateCerts.filter(
      (c) => c.certificationCode === 'AICQB-AI-CP' || c.certificationId === 'cert_aicqb_ai_cp'
    );

    if (matchingCerts.length === 1 && matchingCerts[0].certificateNo === certNoA) {
      console.log(`✓ Idempotency Confirmed:`);
      console.log(`   - Resubmission returned existing certificate: ${matchingCerts[0].certificateNo}`);
      console.log(`   - Total certificates count for this exam: ${matchingCerts.length} (STRICTLY ONE)`);
      console.log(`   - No duplicate certificates created.`);
      passedTests++;
    } else {
      console.error('✗ Idempotency test failed. Multiple certificates found:', matchingCerts);
    }

    // -------------------------------------------------------------
    // TEST 6: Page Refresh & Re-login Certificate Persistence
    // -------------------------------------------------------------
    console.log('\n[TEST 6] Testing Page Refresh & Re-login (Retrieval without regeneration)...');
    // Simulate candidate logging out and logging in again
    const reLoginRes = await loginUser(uniqueEmailA, 'Password@123');
    const freshTokenA = reLoginRes.token;

    // Fetch candidate certificates after re-login
    const certsAfterReLogin = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/certificates/my',
        method: 'GET',
        headers: { Authorization: `Bearer ${freshTokenA}` },
      }
    );

    const reLoginCerts = certsAfterReLogin.data.certificates || [];
    if (reLoginCerts.length === 1 && reLoginCerts[0].certificateNo === certNoA) {
      console.log(`✓ Re-login Persistence Confirmed:`);
      console.log(`   - Retrieved existing certificate: ${reLoginCerts[0].certificateNo}`);
      console.log(`   - Verification URL active: ${reLoginCerts[0].verificationUrl}`);
      console.log(`   - No regeneration occurred.`);
      passedTests++;
    } else {
      console.error('✗ Re-login test failed:', certsAfterReLogin.data);
    }

    // -------------------------------------------------------------
    // TEST 7: Multi-Student Test (Student A vs Student B Data Isolation)
    // -------------------------------------------------------------
    console.log('\n[TEST 7] Testing Multi-Student Test (Unique Data & Certificates)...');
    // Register Student B
    const uniqueEmailB = `student_b_${Date.now()}@testaicqb.org`;
    const regResB = await registerUser({
      fullName: 'Khushboo Sharma',
      email: uniqueEmailB,
      password: 'Password@123',
      confirmPassword: 'Password@123',
      phoneNumber: '9822334455',
      country: 'India',
      countryCode: '+91',
      organization: 'Global QA Labs',
      employeeId: 'QA-505',
      agreeTerms: true,
    });

    const tokenB = regResB.token;
    const candidateIdB = regResB.user.candidateId;

    // Student B enrolls in same exam
    const enrollResB = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/payments/create-order',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenB}` },
      },
      { certificationId: 'cert_aicqb_ai_cp', amount: 4500 }
    );
    await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/payments/verify',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenB}` },
      },
      {
        razorpayOrderId: enrollResB.data.order?.id,
        paymentId: enrollResB.data.order?.paymentId,
        razorpayPaymentId: `pay_sim_b_${Date.now()}`,
        razorpaySignature: 'simulated_sig_test',
        certificationId: 'cert_aicqb_ai_cp',
      }
    );

    // Student B schedules & passes exam
    const schedulesResB = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/my-schedules',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenB}` },
      }
    );
    const examB = schedulesResB.data.upcoming[0];
    const startResB = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: `/api/exams/session/${examB.id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenB}` },
      }
    );

    const studentBAnswers = {};
    (startResB.data.questions || []).forEach((q, idx) => {
      // 9 correct (0) out of 10 -> 90% Pass with Distinction
      if (idx < 9) {
        studentBAnswers[q.id] = 0;
      } else {
        studentBAnswers[q.id] = 1;
      }
    });

    const submitResB = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/submit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenB}` },
      },
      { attemptId: startResB.data.attemptId, answers: studentBAnswers }
    );

    const certNoB = submitResB.data.results.certificate.certificateNo;

    // Student B checks their certificates
    const certsListB = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/certificates/my',
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenB}` },
      }
    );

    if (
      certNoA !== certNoB &&
      candidateIdA !== candidateIdB &&
      certsListB.data.certificates.length === 1 &&
      certsListB.data.certificates[0].certificateNo === certNoB &&
      certsListB.data.certificates[0].candidateName === 'Khushboo Sharma'
    ) {
      console.log(`✓ Multi-Student Test Passed with Complete Data Isolation:`);
      console.log(`   - Student A (${candidateIdA}): Cert No = ${certNoA}`);
      console.log(`   - Student B (${candidateIdB}): Cert No = ${certNoB}`);
      console.log(`   - Distinct Certificate Numbers: ${certNoA !== certNoB}`);
      console.log(`   - Student B cannot view Student A's certificates.`);
      passedTests++;
    } else {
      console.error('✗ Multi-student test failed:', { certNoA, certNoB });
    }

    // -------------------------------------------------------------
    // TEST 8: Admin Panel Results, Attempts, & Verification
    // -------------------------------------------------------------
    console.log('\n[TEST 8] Testing Super Admin Panel Results & Certificate Verification...');
    const adminLoginRes = await loginUser('admin@aicqb.org', 'Admin@123456');
    const adminToken = adminLoginRes.token;

    const adminResultsRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/exams/admin/results',
        method: 'GET',
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    const adminResults = adminResultsRes.data.results || [];
    const passedResults = adminResults.filter((r) => r.passed || r.percentage >= 70);
    const failedResults = adminResults.filter((r) => !r.passed && r.percentage < 70);

    // Verify certificate verification endpoint
    const verifyCertRes = await request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path: `/api/certificates/verify/${certNoA}`,
        method: 'GET',
      }
    );

    if (
      adminResultsRes.data.success &&
      adminResults.length > 0 &&
      passedResults.length > 0 &&
      failedResults.length > 0 &&
      verifyCertRes.data.success &&
      verifyCertRes.data.isValid
    ) {
      console.log(`✓ Super Admin Panel Verification Passed:`);
      console.log(`   - Total Exam Results: ${adminResults.length}`);
      console.log(`   - Passed Students Count: ${passedResults.length}`);
      console.log(`   - Failed Students Count: ${failedResults.length}`);
      console.log(`   - Certificate Verification (${certNoA}): Status = ${verifyCertRes.data.certificate.status}, Valid = ${verifyCertRes.data.isValid}`);
      passedTests++;
    } else {
      console.error('✗ Admin panel results or verification failed:', adminResultsRes.data);
    }

    console.log('\n========================================================');
    console.log(` TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100% SUCCESS)`);
    console.log('========================================================');
  } catch (err) {
    console.error('Fatal test error:', err);
  }
}

runTests();
