import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSeed() {
  console.log('Seeding AICQB database with multi-industry certifications and initial configuration...');

  // 1. Super Admin Account
  const existingAdmin = db.findOne('users', u => u.email === 'admin@aicqb.org');
  if (!existingAdmin) {
    db.addDoc('users', {
      uid: 'usr_super_admin_001',
      id: 'usr_super_admin_001',
      email: 'admin@aicqb.org',
      fullName: 'Super Admin',
      phoneNumber: '+91 98765 00000',
      password: 'Admin@123456',
      role: 'Super Admin',
      status: 'Active',
      emailVerified: true,
      createdAt: new Date().toISOString(),
    });
    console.log('✓ Super Admin created: admin@aicqb.org / Admin@123456');
  }

  // 1B. Official Candidate Account (Rahul Deshmukh from Screenshot)
  const existingCandidateUser = db.findOne('users', u => u.email === 'rahul.deshmukh@gmail.com');
  if (!existingCandidateUser) {
    const candidateUid = 'usr_candidate_rahul_001';
    const candidateId = 'AICQB-1004587';
    db.addDoc('users', {
      uid: candidateUid,
      id: candidateUid,
      email: 'rahul.deshmukh@gmail.com',
      fullName: 'Rahul Deshmukh',
      phoneNumber: '+91 98765 43210',
      password: 'Password@123',
      role: 'Candidate',
      candidateId,
      status: 'Active',
      emailVerified: true,
      createdAt: '2026-10-01T10:00:00.000Z',
    });

    db.addDoc('candidates', {
      id: candidateUid,
      uid: candidateUid,
      candidateId,
      fullName: 'Rahul Deshmukh',
      email: 'rahul.deshmukh@gmail.com',
      phoneNumber: '+91 98765 43210',
      dateOfBirth: '15 May 1994',
      gender: 'Male',
      country: 'India',
      address: 'Kharadi, Pune, Maharashtra – 411014',
      aboutMe: 'Software testing professional with 5+ years of experience in manual and automation testing.',
      profileCompletion: 100,
      emailVerified: true,
      rewardPoints: 280,
      activeCertificationsCount: 1,
      upcomingExamsCount: 2,
      certificatesEarnedCount: 1,
      coursesInProgressCount: 3,
      createdAt: '2026-10-01T10:00:00.000Z',
      updatedAt: new Date().toISOString(),
    });

    // Seed Certificate for Rahul (AICQB-ST-2026-000123)
    db.addDoc('certificates', {
      id: 'cert_rec_rahul_001',
      certificateNo: 'AICQB-ST-2026-000123',
      candidateUid,
      candidateId,
      candidateName: 'Rahul Deshmukh',
      certificationId: 'cert_aicqb_st_cp',
      certificationName: 'AICQB Certified Software Tester',
      certificationCode: 'AICQB-ST-CP',
      credentialLevel: 'Professional Level',
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
    });

    // Seed Scheduled Exams for Rahul matching screenshot
    db.addDoc('examSchedules', {
      id: 'sch_rahul_001',
      scheduleId: 'sch_rahul_001',
      candidateUid,
      candidateId,
      candidateName: 'Rahul Deshmukh',
      certificationId: 'cert_aicqb_ai_cp',
      certificationName: 'AICQB Certified AI Professional',
      certificationCode: 'AICQB-AI-CP',
      examId: 'exam_cert_aicqb_ai_cp',
      examName: 'AICQB Certified AI Professional',
      examCode: 'AICQB-AI-CP-EXAM',
      scheduledDate: '2026-11-16',
      scheduledDateDay: '16',
      scheduledDateMonth: 'Nov 2026',
      scheduledTime: '10:00 AM – 11:30 AM (IST)',
      mode: 'Online Proctored',
      durationMinutes: 90,
      status: 'scheduled',
      createdAt: '2026-11-01T10:00:00.000Z',
    });

    db.addDoc('examSchedules', {
      id: 'sch_rahul_002',
      scheduleId: 'sch_rahul_002',
      candidateUid,
      candidateId,
      candidateName: 'Rahul Deshmukh',
      certificationId: 'cert_aicqb_pw_cp',
      certificationName: 'AICQB Certified Playwright Automation',
      certificationCode: 'AICQB-PW-CP',
      examId: 'exam_cert_aicqb_pw_cp',
      examName: 'AICQB Certified Playwright Automation',
      examCode: 'AICQB-PW-CP-EXAM',
      scheduledDate: '2026-11-28',
      scheduledDateDay: '28',
      scheduledDateMonth: 'Nov 2026',
      scheduledTime: '02:00 PM – 03:30 PM (IST)',
      mode: 'Online Proctored',
      durationMinutes: 90,
      status: 'scheduled',
      createdAt: '2026-11-02T10:00:00.000Z',
    });

    // Seed Payments matching screenshot
    db.addDoc('payments', {
      id: 'pay_rahul_001',
      paymentId: 'TXN1002567',
      razorpayOrderId: 'order_rahul_001',
      razorpayPaymentId: 'pay_rzp_001',
      candidateUid,
      candidateId,
      candidateName: 'Rahul Deshmukh',
      candidateEmail: 'rahul.deshmukh@gmail.com',
      certificationId: 'cert_aicqb_ai_cp',
      certificationName: 'AICQB AI Professional',
      certificationCode: 'AICQB-AI-CP',
      amount: 4500,
      currency: 'INR',
      paymentStatus: 'success',
      paymentMethod: 'UPI / NetBanking',
      signatureVerificationStatus: 'verified',
      invoiceId: 'INV-AICQB-2026-1001',
      createdAt: '2026-11-09T10:00:00.000Z',
      paidAt: '09 Nov 2026',
      date: '09 Nov 2026',
      status: 'Successful',
    });

    db.addDoc('payments', {
      id: 'pay_rahul_002',
      paymentId: 'TXN1002568',
      razorpayOrderId: 'order_rahul_002',
      razorpayPaymentId: 'pay_rzp_002',
      candidateUid,
      candidateId,
      candidateName: 'Rahul Deshmukh',
      candidateEmail: 'rahul.deshmukh@gmail.com',
      certificationId: 'cert_aicqb_st_cp',
      certificationName: 'Software Tester Exam',
      certificationCode: 'AICQB-ST-CP',
      amount: 3500,
      currency: 'INR',
      paymentStatus: 'success',
      paymentMethod: 'Credit Card',
      signatureVerificationStatus: 'verified',
      invoiceId: 'INV-AICQB-2026-1002',
      createdAt: '2026-10-10T10:00:00.000Z',
      paidAt: '10 Oct 2026',
      date: '10 Oct 2026',
      status: 'Successful',
    });

    db.addDoc('payments', {
      id: 'pay_rahul_003',
      paymentId: 'TXN1002569',
      razorpayOrderId: 'order_rahul_003',
      razorpayPaymentId: 'pay_rzp_003',
      candidateUid,
      candidateId,
      candidateName: 'Rahul Deshmukh',
      candidateEmail: 'rahul.deshmukh@gmail.com',
      certificationId: 'cert_aicqb_ai_cp',
      certificationName: 'Study Material',
      certificationCode: 'AICQB-SM',
      amount: 1000,
      currency: 'INR',
      paymentStatus: 'success',
      paymentMethod: 'Debit Card',
      signatureVerificationStatus: 'verified',
      invoiceId: 'INV-AICQB-2026-1003',
      createdAt: '2026-09-15T10:00:00.000Z',
      paidAt: '15 Sep 2026',
      date: '15 Sep 2026',
      status: 'Successful',
    });

    console.log('✓ Candidate account created: rahul.deshmukh@gmail.com / Password@123 (AICQB-1004587)');
  }

  // 2. Multi-Industry Certifications
  const certificationsData = [
    {
      id: 'cert_aicqb_ai_cp',
      code: 'AICQB-AI-CP',
      name: 'AICQB Certified AI Professional',
      domain: 'AI & Machine Learning',
      domainCode: 'AI',
      domainSlug: 'ai-ml',
      level: 'Professional Level',
      description: 'Validate your expertise in Artificial Intelligence, Machine Learning and real-world AI applications.',
      learningObjectives: [
        'Build strong AI & ML fundamentals and mathematical foundations',
        'Hands-on practical assessment on neural networks & transformers',
        'Industry-relevant use cases across finance, healthcare & tech',
        'Globally verifiable digital certificate with QR authentication',
      ],
      syllabus: [
        { title: 'Module 1: Foundations of Artificial Intelligence & Math', hours: 12, topics: ['Linear Algebra', 'Calculus', 'Probability & Statistics', 'Search Algorithms'] },
        { title: 'Module 2: Machine Learning Algorithms & Optimization', hours: 18, topics: ['Supervised vs Unsupervised', 'Regression', 'Classification', 'Gradient Descent'] },
        { title: 'Module 3: Deep Learning, Neural Networks & PyTorch', hours: 20, topics: ['CNNs', 'RNNs & LSTMs', 'Attention Mechanisms', 'Transformers'] },
        { title: 'Module 4: Generative AI, LLMs & Prompt Engineering', hours: 15, topics: ['GPT Architecture', 'Embeddings & Vector Databases', 'RAG Pipelines', 'Fine-tuning'] },
        { title: 'Module 5: Responsible AI, Ethics & Deployment', hours: 10, topics: ['Model Explainability (SHAP/LIME)', 'Bias Mitigation', 'ONNX & TensorRT', 'Serving via REST APIs'] },
      ],
      eligibility: 'Degree or diploma in Computer Science, Engineering, Statistics, or 1+ year practical coding experience.',
      examPattern: 'Online proctored exam, 60 MCQ questions & 1 coding challenge, 90 minutes.',
      examFee: 4500,
      currency: 'INR',
      duration: '90 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 1420,
      icon: 'Cpu',
      popular: true,
    },
    {
      id: 'cert_aicqb_st_cp',
      code: 'AICQB-ST-CP',
      name: 'AICQB Certified Software Tester',
      domain: 'Software Testing & Quality Engineering',
      domainCode: 'ST',
      domainSlug: 'testing',
      level: 'Professional Level',
      description: 'Master manual testing, automation principles, API verification, and modern quality engineering workflows.',
      learningObjectives: [
        'End-to-end SDLC and STLC test phase execution',
        'Test case design, boundary value analysis and equivalence partitioning',
        'API testing with Postman and automated test collections',
        'Defect lifecycle and Jira integration',
      ],
      syllabus: [
        { title: 'Module 1: Quality Engineering Principles & Agile STLC', hours: 10, topics: ['Test Levels', 'Test Types', 'Agile Scrum & Kanban Testing'] },
        { title: 'Module 2: Test Analysis & Design Techniques', hours: 12, topics: ['Black-box Techniques', 'White-box Techniques', 'Risk-Based Testing'] },
        { title: 'Module 3: API & Web Services Testing', hours: 14, topics: ['REST & SOAP Protocols', 'HTTP Status Codes', 'Postman Automation'] },
        { title: 'Module 4: Continuous Quality in CI/CD', hours: 10, topics: ['Git Integration', 'GitHub Actions Test Runs', 'Automated Reporting'] },
      ],
      eligibility: 'Open to fresh graduates, QA analysts, and engineers transitioning into Quality Engineering.',
      examPattern: 'Online proctored exam, 50 MCQ questions, 75 minutes.',
      examFee: 3500,
      currency: 'INR',
      duration: '75 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 2180,
      icon: 'ShieldCheck',
      popular: true,
    },
    {
      id: 'cert_aicqb_pw_cp',
      code: 'AICQB-PW-CP',
      name: 'AICQB Certified Playwright Automation',
      domain: 'Software Testing & Quality Engineering',
      domainCode: 'PW',
      domainSlug: 'testing',
      level: 'Advance Level',
      description: 'High-speed browser automation with TypeScript, Playwright Test runner, visual regression, and CI/CD.',
      learningObjectives: [
        'Modern browser automation across Chromium, Firefox and WebKit',
        'Page Object Models (POM) and modular test architecture',
        'Network interception, API mocking, and auth state reuse',
        'Automated CI/CD test execution with trace viewers',
      ],
      syllabus: [
        { title: 'Module 1: Playwright Architecture & Setup', hours: 8, topics: ['Node.js & TypeScript', 'Browser Contexts', 'Locators & Assertions'] },
        { title: 'Module 2: Advanced Interaction & POM', hours: 14, topics: ['Auto-waiting', 'Page Object Models', 'Fixtures & Test Hooks'] },
        { title: 'Module 3: Network & API Automation', hours: 12, topics: ['Route Interception', 'Mocking API Responses', 'Har Logging'] },
        { title: 'Module 4: CI/CD & Trace Analysis', hours: 10, topics: ['Dockerization', 'GitHub Actions Matrix Runs', 'HTML Reports & Traces'] },
      ],
      eligibility: 'Knowledge of JavaScript/TypeScript and basic software testing concepts.',
      examPattern: 'Online proctored exam, 40 MCQs and 1 hands-on automation script, 90 minutes.',
      examFee: 4500,
      currency: 'INR',
      duration: '90 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 1650,
      icon: 'Terminal',
      popular: true,
    },
    {
      id: 'cert_aicqb_ds_201',
      code: 'AICQB-DS-201',
      name: 'AICQB Certified Data Science Professional',
      domain: 'Data Science & Analytics',
      domainCode: 'DS',
      domainSlug: 'data-science',
      level: 'Professional Level',
      description: 'Extract business insights from complex data through statistical modeling, Python data stack, and visualization.',
      learningObjectives: [
        'Exploratory data analysis with Pandas, NumPy, and Seaborn',
        'Predictive modeling and hypothesis testing',
        'Feature engineering and dimensionality reduction',
        'Translating data insights into executive strategy',
      ],
      syllabus: [
        { title: 'Module 1: Statistical Analysis & Probability', hours: 12, topics: ['Hypothesis Testing', 'ANOVA', 'Distributions', 'Bayesian Inference'] },
        { title: 'Module 2: Python Data Manipulation Stack', hours: 15, topics: ['Pandas Advanced Indexing', 'Data Cleaning', 'Vectorization'] },
        { title: 'Module 3: Machine Learning with Scikit-Learn', hours: 18, topics: ['Ensemble Methods', 'Cross-Validation', 'Hyperparameter Tuning'] },
      ],
      eligibility: 'Familiarity with Python or R, and basic statistics.',
      examPattern: 'Online proctored exam, 50 MCQ questions, 90 minutes.',
      examFee: 4500,
      currency: 'INR',
      duration: '90 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 890,
      icon: 'Database',
      popular: false,
    },
    {
      id: 'cert_aicqb_cy_301',
      code: 'AICQB-CY-301',
      name: 'AICQB Certified Cybersecurity Specialist',
      domain: 'Cybersecurity',
      domainCode: 'CY',
      domainSlug: 'cybersecurity',
      level: 'Advanced Level',
      description: 'Master threat intelligence, penetration testing principles, zero-trust architecture, and incident response.',
      learningObjectives: [
        'Network security defense and intrusion detection systems',
        'Vulnerability assessments and ethical penetration methodologies',
        'Zero-trust identity access management and cryptographic standards',
        'SOC incident triage and digital forensics',
      ],
      syllabus: [
        { title: 'Module 1: Threat Vectors & Cyber Warfare Landscape', hours: 10, topics: ['MITRE ATT&CK', 'OWASP Top 10', 'Malware Analysis'] },
        { title: 'Module 2: Network Defense & Cryptography', hours: 16, topics: ['Firewalls & IDS/IPS', 'PKI & TLS 1.3', 'Zero-Trust Architecture'] },
        { title: 'Module 3: Incident Response & Forensics', hours: 14, topics: ['SIEM / SOC Workflows', 'Memory Forensics', 'Disaster Recovery'] },
      ],
      eligibility: 'Knowledge of networking protocols and operating systems internals.',
      examPattern: 'Online proctored exam, 60 MCQs, 90 minutes.',
      examFee: 5500,
      currency: 'INR',
      duration: '90 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 1120,
      icon: 'Lock',
      popular: true,
    },
    {
      id: 'cert_aicqb_ba_101',
      code: 'AICQB-BA-101',
      name: 'AICQB Certified Business Analyst',
      domain: 'Business & Management',
      domainCode: 'BA',
      domainSlug: 'business',
      level: 'Foundation Level',
      description: 'Bridge business objectives with technological execution through requirements elicitation, modeling, and stakeholder management.',
      learningObjectives: [
        'BABOK guide alignment and business analysis core concepts',
        'User stories, acceptance criteria, and UML modeling',
        'Gap analysis, SWOT analysis, and ROI assessment',
        'Agile ceremonies facilitation and backlog refinement',
      ],
      syllabus: [
        { title: 'Module 1: Business Analysis Principles', hours: 10, topics: ['Enterprise Analysis', 'Stakeholder Matrix', 'Scope Definition'] },
        { title: 'Module 2: Requirements Engineering & Modeling', hours: 14, topics: ['Use Cases', 'BPMN 2.0', 'Wireframing & User Journey Mapping'] },
        { title: 'Module 3: Agile Business Analysis', hours: 10, topics: ['INVEST Matrix', 'Sprint Planning', 'Acceptance Test-Driven Dev (ATDD)'] },
      ],
      eligibility: 'Open to all aspiring business analysts, product owners, and project leads.',
      examPattern: 'Online proctored exam, 50 MCQs, 75 minutes.',
      examFee: 4000,
      currency: 'INR',
      duration: '75 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 780,
      icon: 'Briefcase',
      popular: false,
    },
    {
      id: 'cert_aicqb_pm_201',
      code: 'AICQB-PM-201',
      name: 'AICQB Certified Project Manager',
      domain: 'Business & Management',
      domainCode: 'PM',
      domainSlug: 'business',
      level: 'Professional Level',
      description: 'Lead mission-critical projects using predictive waterfall, hybrid frameworks, and agile delivery principles.',
      learningObjectives: [
        'Project charters, WBS breakdown, and critical path scheduling',
        'Risk register management, cost estimation, and EVM (Earned Value)',
        'Cross-functional team leadership and conflict resolution',
        'Post-mortem reviews and governance standards',
      ],
      syllabus: [
        { title: 'Module 1: Project Initiation & Planning', hours: 12, topics: ['Project Scope', 'Work Breakdown Structure (WBS)', 'Gantt & CPM'] },
        { title: 'Module 2: Project Execution & Resource Allocation', hours: 14, topics: ['Resource Leveling', 'Budgeting & Cost Baselines', 'Earned Value'] },
        { title: 'Module 3: Risk, Quality & Project Closure', hours: 10, topics: ['Qualitative & Quantitative Risk', 'Quality Audits', 'Handover'] },
      ],
      eligibility: '1+ year experience participating in or coordinating organizational projects.',
      examPattern: 'Online proctored exam, 60 MCQs, 90 minutes.',
      examFee: 4800,
      currency: 'INR',
      duration: '90 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 950,
      icon: 'Award',
      popular: false,
    },
    {
      id: 'cert_aicqb_cl_401',
      code: 'AICQB-CL-401',
      name: 'AICQB Certified Cloud Architect',
      domain: 'Cloud Computing',
      domainCode: 'CL',
      domainSlug: 'cloud',
      level: 'Professional Level',
      description: 'Design highly available, fault-tolerant, and cost-optimized multi-cloud systems across AWS, Azure, and GCP.',
      learningObjectives: [
        'Multi-region architectures and automated disaster recovery',
        'Serverless compute, microservices, and containerization',
        'Cloud security, IAM policies, and VPC peering',
        'FinOps and cloud cost governance strategies',
      ],
      syllabus: [
        { title: 'Module 1: Cloud Architecture Patterns', hours: 12, topics: ['Well-Architected Framework', 'High Availability', 'Load Balancing'] },
        { title: 'Module 2: Storage & Database Solutions', hours: 14, topics: ['Object Storage', 'Managed Relational & NoSQL', 'Caching Strategies'] },
        { title: 'Module 3: Cloud Security & FinOps', hours: 12, topics: ['Encryption in Transit & at Rest', 'Cost Optimization', 'Governance'] },
      ],
      eligibility: 'Foundational understanding of operating systems and networking.',
      examPattern: 'Online proctored exam, 55 MCQs, 90 minutes.',
      examFee: 5500,
      currency: 'INR',
      duration: '90 Minutes',
      passingCriteria: 70,
      validityYears: 3,
      version: '2026.1',
      status: 'Active',
      enrolledCount: 840,
      icon: 'Cloud',
      popular: true,
    },
  ];

  certificationsData.forEach(cert => {
    db.setDoc('certifications', cert.id, cert);
  });
  console.log(`✓ Seeded ${certificationsData.length} official multi-industry certifications.`);

  // 3. Question Bank for Exam Engine
  const sampleQuestions = [
    {
      id: 'q_ai_1',
      certificationId: 'cert_aicqb_ai_cp',
      questionType: 'mcq',
      question: 'Which metric is most appropriate for evaluating a binary classification model when dealing with severe class imbalance?',
      options: ['Overall Accuracy', 'Area Under ROC Curve (ROC-AUC) / Precision-Recall AUC', 'Mean Squared Error (MSE)', 'Log-cosh Loss'],
      correctAnswer: 1,
      points: 4,
    },
    {
      id: 'q_ai_2',
      certificationId: 'cert_aicqb_ai_cp',
      questionType: 'mcq',
      question: 'In deep Transformer architectures, what is the primary role of the Multi-Head Self-Attention mechanism?',
      options: [
        'To enforce sequential recurrent hidden states',
        'To allow the model to jointly attend to information from different representation subspaces at different positions',
        'To downsample feature map spatial resolution like max-pooling',
        'To replace linear projection matrices with decision trees',
      ],
      correctAnswer: 1,
      points: 4,
    },
    {
      id: 'q_ai_3',
      certificationId: 'cert_aicqb_ai_cp',
      questionType: 'mcq',
      question: 'In semantic vector retrieval and RAG pipelines, which metric is commonly used to measure the orientation similarity between two high-dimensional text embeddings, invariant to vector magnitude?',
      options: [
        'Cosine Similarity (dot product divided by product of Euclidean norms)',
        'Manhattan Distance (L1 norm)',
        'Hamming Distance',
        'Jaccard Index on raw character sets',
      ],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 'q_st_1',
      certificationId: 'cert_aicqb_st_cp',
      questionType: 'mcq',
      question: 'Which test design technique is based on identifying input ranges where the program is presumed to exhibit equivalent behavior?',
      options: ['Equivalence Partitioning', 'State Transition Testing', 'Mutation Testing', 'Fuzz Testing'],
      correctAnswer: 0,
      points: 5,
    },
    {
      id: 'q_st_2',
      certificationId: 'cert_aicqb_st_cp',
      questionType: 'mcq',
      question: 'What HTTP status code should a well-designed REST API return when a resource creation POST request successfully finishes?',
      options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified'],
      correctAnswer: 1,
      points: 5,
    },
    {
      id: 'q_pw_1',
      certificationId: 'cert_aicqb_pw_cp',
      questionType: 'mcq',
      question: 'In Playwright, what is the key advantage of using `locator` over element handles?',
      options: [
        'Locators are strict and perform automatic actionability checks and re-querying upon every action',
        'Locators run only on Chromium and bypass Firefox',
        'Locators disable JavaScript execution',
        'Locators require manual sleep statements',
      ],
      correctAnswer: 0,
      points: 5,
    },
  ];

  sampleQuestions.forEach(q => {
    db.setDoc('questions', q.id, q);
  });
  console.log(`✓ Seeded ${sampleQuestions.length} exam engine questions.`);

  // 4. Training Partners matching Screenshot
  const partners = [
    { id: 'part_1', partnerId: 'TP1001', name: 'Acceleration Training Center', location: 'Pune, India', country: 'India', programsCount: 12, status: 'Active' },
    { id: 'part_2', partnerId: 'TP1002', name: 'TechLearn Institute', location: 'Mumbai, India', country: 'India', programsCount: 8, status: 'Active' },
    { id: 'part_3', partnerId: 'TP1003', name: 'Global Skill Academy', location: 'Bengaluru, India', country: 'India', programsCount: 15, status: 'Active' },
    { id: 'part_4', partnerId: 'TP1004', name: 'NextGen Education', location: 'Singapore', country: 'Singapore', programsCount: 10, status: 'Active' },
  ];
  partners.forEach(p => db.setDoc('trainingPartners', p.id, p));

  // 5. Memberships matching Screenshot
  const memberships = [
    { id: 'mem_1', memberId: 'MEM1001', name: 'Innovatech Solutions', organization: 'Innovatech Solutions', type: 'Organization', plan: 'Corporate', validTill: '31 Dec 2026', status: 'Active' },
    { id: 'mem_2', memberId: 'MEM1002', name: 'Rohan Sharma', organization: 'Individual', type: 'Individual', plan: 'Professional', validTill: '30 Dec 2026', status: 'Active' },
    { id: 'mem_3', memberId: 'MEM1003', name: 'DataLearn Academy', organization: 'DataLearn Academy', type: 'Organization', plan: 'Training', validTill: '31 Dec 2026', status: 'Active' },
    { id: 'mem_4', memberId: 'MEM1004', name: 'Priya Deshmukh', organization: 'Individual', type: 'Individual', plan: 'Professional', validTill: '15 Nov 2026', status: 'Active' },
  ];
  memberships.forEach(m => db.setDoc('memberships', m.id, m));

  // 6. LMS Content matching Screenshot
  const lms = [
    { id: 'lms_1', courseCode: 'LMS-AI-01', title: 'AI & ML Fundamentals', domain: 'AI & Machine Learning', type: 'Course', status: 'Active', modulesCount: 8 },
    { id: 'lms_2', courseCode: 'LMS-DS-01', title: 'Data Science Essentials', domain: 'Data & Analytics', type: 'Course', status: 'Active', modulesCount: 6 },
    { id: 'lms_3', courseCode: 'LMS-CY-01', title: 'Cybersecurity Basics', domain: 'Cybersecurity', type: 'Course', status: 'Active', modulesCount: 7 },
    { id: 'lms_4', courseCode: 'LMS-PM-01', title: 'Project Management Core', domain: 'Management', type: 'Course', status: 'Active', modulesCount: 5 },
  ];
  lms.forEach(l => db.setDoc('learningMaterials', l.id, l));

  // 7. Announcements matching Screenshot
  const announcements = [
    { id: 'ann_1', title: 'AICQB New Certifications Launched', audience: 'All Users', status: 'Published', scheduledDate: '07 Nov 2026' },
    { id: 'ann_2', title: 'Exam Schedule – Nov 2026', audience: 'Candidates', status: 'Published', scheduledDate: '05 Nov 2026' },
    { id: 'ann_3', title: 'Partner Onboarding Update', audience: 'Training Partners', status: 'Published', scheduledDate: '03 Nov 2026' },
    { id: 'ann_4', title: 'Membership Renewal Reminder', audience: 'Members', status: 'Published', scheduledDate: '01 Nov 2026' },
  ];
  announcements.forEach(a => db.setDoc('announcements', a.id, a));

  console.log('✓ Database seeding complete!');
}

runSeed();

