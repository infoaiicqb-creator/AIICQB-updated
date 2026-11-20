import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function verify() {
  console.log('--- TESTING RULE: FAILED EXAMS MUST NOT BE IN COMPLETED EXAMS ---');

  // 1. Register new candidate
  const email = `fail_test_${Date.now()}@aicqb.org`;
  const reg = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/auth/register', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { fullName: 'Ananya Roy', email, password: 'Password@123', confirmPassword: 'Password@123', phoneNumber: '9811223344', country: 'India', agreeTerms: true }
  );
  const token = reg.data.token;
  console.log('1. Candidate Registered:', reg.data.user.candidateId);

  // 2. Enroll via payment
  const ord = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/payments/create-order', method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    { certificationId: 'cert_aicqb_ai_cp', amount: 4500 }
  );
  await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/payments/verify', method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    { razorpayOrderId: ord.data.order.id, paymentId: ord.data.order.paymentId, razorpayPaymentId: 'pay_sim_1', razorpaySignature: 'simulated_sig_1', certificationId: 'cert_aicqb_ai_cp' }
  );

  // 3. Check initial schedules
  let sch = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/exams/my-schedules', method: 'GET', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`2. Initial Schedules: Upcoming = ${sch.data.upcoming.length}, Completed = ${sch.data.completed.length}`);
  const targetSchedule = sch.data.upcoming.find((u) => u.certificationCode === 'AICQB-AI-CP') || sch.data.upcoming[0];
  const examId = targetSchedule.id;

  // 4. Start Exam & Submit FAILED Attempt (Score 60% < 70%)
  const start = await request(
    { hostname: '127.0.0.1', port: 5000, path: `/api/exams/session/${examId}`, method: 'GET', headers: { Authorization: `Bearer ${token}` } }
  );
  const failAnswers = {};
  (start.data.questions || []).forEach((q, idx) => {
    failAnswers[q.id] = idx < 6 ? 0 : 1; // 60% score < 70%
  });

  const submitFail = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/exams/submit', method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    { attemptId: start.data.attemptId, answers: failAnswers }
  );

  console.log(`3. Exam Submitted with Failure:`);
  console.log(`   - Percentage: ${submitFail.data.results.percentage}%`);
  console.log(`   - Passed: ${submitFail.data.results.passed}`);
  console.log(`   - Certificate Issued: ${submitFail.data.results.certificate}`);

  // 5. Check Schedules after FAIL: MUST NOT be in Completed! Must remain in Upcoming only!
  sch = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/exams/my-schedules', method: 'GET', headers: { Authorization: `Bearer ${token}` } }
  );

  console.log(`4. Schedules after Failure:`);
  console.log(`   - Upcoming Exams Count: ${sch.data.upcoming.length}`);
  console.log(`   - Completed Exams Count: ${sch.data.completed.length}`);
  if (sch.data.upcoming.length > 0) {
    console.log(`   - Upcoming Exam Name: ${sch.data.upcoming[0].examName} (Status: ${sch.data.upcoming[0].status})`);
  }

  const notInCompleted = sch.data.completed.length === 0;
  const inUpcoming = sch.data.upcoming.length > 0 && sch.data.upcoming[0].status === 'scheduled';

  if (notInCompleted && inUpcoming) {
    console.log('\n SUCCESS: FAILED EXAM IS NOT IN COMPLETED EXAMS! KEPT IN UPCOMING EXAMS ONLY!');
  } else {
    console.error('\n FAILURE: Failed exam was found in completed exams or missing from upcoming:', { completed: sch.data.completed });
  }

  // 6. Now Candidate passes retake (70%)
  const retakeSchedule = sch.data.upcoming.find((u) => u.certificationCode === 'AICQB-AI-CP') || sch.data.upcoming[0];
  const startRetake = await request(
    { hostname: '127.0.0.1', port: 5000, path: `/api/exams/session/${retakeSchedule.id}`, method: 'GET', headers: { Authorization: `Bearer ${token}` } }
  );
  const passAnswers = {};
  (startRetake.data.questions || []).forEach((q, idx) => {
    passAnswers[q.id] = idx < 7 ? 0 : 1; // 70% score
  });

  const submitPass = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/exams/submit', method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } },
    { attemptId: startRetake.data.attemptId, answers: passAnswers }
  );
  console.log(`\n5. Retake Exam Submitted with PASS:`);
  console.log(`   - Percentage: ${submitPass.data.results.percentage}%`);
  console.log(`   - Passed: ${submitPass.data.results.passed}`);
  console.log(`   - Certificate: ${submitPass.data.results.certificate?.certificateNo}`);

  // 7. Check Schedules after PASS: MUST be in Completed now!
  sch = await request(
    { hostname: '127.0.0.1', port: 5000, path: '/api/exams/my-schedules', method: 'GET', headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`6. Schedules after Retake Passed:`);
  console.log(`   - Upcoming Exams Count: ${sch.data.upcoming.length}`);
  console.log(`   - Completed Exams Count: ${sch.data.completed.length}`);
  if (sch.data.completed.length > 0) {
    console.log(`   - Completed Exam Name: ${sch.data.completed[0].examName} (Cert #: ${sch.data.completed[0].certificateNo})`);
  }

  if (sch.data.completed.length === 1 && sch.data.completed[0].passed) {
    console.log('\n FINAL VERIFICATION PASSED: Completed exams contains only PASSED exams with certificates!');
  }
}

verify();
