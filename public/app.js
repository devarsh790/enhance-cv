// ==========================================================================
// ATS CV PRO — FRONTEND ENGINE, DIRECT PDF EXPORT, DUAL THEME & AI CHAT BOT
// ==========================================================================

const GUIDED_STARTER_TEMPLATE = `YOUR FULL NAME
City, State | email@example.com | (555) 000-0000 | linkedin.com/in/yourprofile

PROFESSIONAL SUMMARY
Results-driven professional with demonstrated experience in project execution, operational optimization, and cross-functional leadership. Skilled in strategic planning, data analysis, and delivering measurable organizational growth.

CORE COMPETENCIES & SKILLS
- Hard Skills: Project Management, Data Analysis, Process Optimization, Strategic Planning
- Tools & Software: Microsoft Office Suite, Excel (Pivot Tables/VBA), Google Analytics, CRM Systems
- Soft Skills: Leadership, Problem Solving, Communication, Team Collaboration

PROFESSIONAL EXPERIENCE
Job Title — Company Name | City, State (2021 – Present)
- Accomplished [X], as measured by [Y], by doing [Z] (e.g. Spearheaded project rollout that increased productivity by 22%)
- Orchestrated daily team workflows and reduced operational delays by 30% through process optimization
- Collaborated with senior management to track KPIs and deliver key strategic milestones

Previous Role — Previous Company | City, State (2018 – 2021)
- Managed cross-functional project deliverables ahead of target schedule
- Improved data reporting accuracy by 25% using automated spreadsheets and reporting tools

EDUCATION & CERTIFICATIONS
Bachelor of Science / Business Administration — State University (Graduation Year)
- Relevant Coursework & Academic Honors
- Professional Certification / ATS-Compliant Credentials`;

const PRESETS = {
  swe: {
    role: "Software Engineer",
    text: `ALEX RIVERA
San Francisco, CA | alex.rivera@example.com | (555) 234-5678 | linkedin.com/in/alexrivera-dev

SUMMARY
Results-oriented Full Stack Engineer with 6+ years of experience engineering high-throughput microservices and responsive web applications. Specialized in TypeScript, React, Node.js, and AWS cloud deployment.

TECHNICAL SKILLS
Languages & Frameworks: JavaScript (ES6+), TypeScript, React, Next.js, Node.js, Express, HTML5/CSS3
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, EC2, Lambda), CI/CD (GitHub Actions)
Methodologies: RESTful APIs, GraphQL, Microservices, Agile/Scrum, Test-Driven Development (Jest)

PROFESSIONAL EXPERIENCE
Software Engineer — CloudScale Technologies | San Francisco, CA (2022 – Present)
- Worked on redesigning the core customer portal using React and TypeScript
- Helped migrate monolithic backend services into Dockerized microservices on AWS
- Responsible for optimizing SQL query execution and database index structures
- Assisted in setting up automated unit testing pipelines

Full Stack Engineer — Apex Software Solutions | Oakland, CA (2019 – 2022)
- Built user interfaces for enterprise analytics dashboard using React and Redux
- Handled API integration with third-party payment processing gateways
- Did daily code reviews and participated in sprint planning meetings

EDUCATION
Bachelor of Science in Computer Science — University of California, Berkeley (2015 – 2019)`,
    job: `Looking for a Software Engineer to architect web applications, optimize REST/GraphQL APIs, reduce load times, improve microservices test coverage, and leverage Docker, React, TypeScript, and AWS.`
  },
  pm: {
    role: "Product Manager",
    text: `JORDAN TAYLOR
New York, NY | jordan.taylor@example.com | (555) 987-6543 | linkedin.com/in/jordantaylor-pm

SUMMARY
Strategic Product Manager with 7+ years of experience leading cross-functional teams to launch B2B SaaS products. Proven track record in product roadmap design, market research, and user acquisition.

CORE COMPETENCIES
Product Strategy, Roadmap Planning, User Research, Agile/Scrum, A/B Testing, Feature Prioritization, Executive Stakeholder Management, Data Analytics (Mixpanel, SQL)

PROFESSIONAL EXPERIENCE
Lead Product Manager — Apex SaaS Platforms | New York, NY (2021 – Present)
- Managed product roadmap for flagship enterprise analytics product
- Worked on improving user onboarding flow and reduced user drop-off
- Helped launch 4 major feature releases ahead of schedule
- Was responsible for coordinating sprint backlog with engineering lead

Product Manager — GrowthMetrics Inc. | New York, NY (2018 – 2021)
- Handled user interviews and competitive market analysis
- Assisted with defining product requirements and user epics
- Did weekly feature performance analytics reviews using SQL and Amplitude

EDUCATION
Bachelor of Business Administration — New York University (2014 – 2018)`,
    job: `Seeking a Product Manager to own product lifecycle, improve conversion funnel metrics, lead sprint planning, conduct user testing, write PRDs, and work with engineering.`
  },
  data: {
    role: "Data Analyst",
    text: `MORGAN CHEN
Chicago, IL | morgan.chen@example.com | (555) 345-6789 | linkedin.com/in/morganchen-data

SUMMARY
Detail-oriented Data Analyst with 4+ years of experience transforming complex datasets into actionable business intelligence. Skilled in SQL, Python, Tableau, and financial modeling.

SKILLS & TOOLS
SQL (PostgreSQL, Snowflake), Python (Pandas, NumPy), Tableau, Power BI, Excel (VBA), Statistics, Data Warehousing, ETL Processes

EXPERIENCE
Data Analyst — Vanguard Financial Group | Chicago, IL (2022 – Present)
- Worked on building automated financial reports using Python and SQL
- Helped marketing team analyze customer churn patterns
- Handled database query optimization to speed up report generation
- Did weekly executive metrics dashboards in Tableau

EDUCATION
Bachelor of Science in Statistics — Northwestern University (2018 – 2022)`,
    job: `Data Analyst position requiring strong SQL proficiency, Python data manipulation, Tableau dashboarding, ETL pipelines, and statistical modeling.`
  },
  mkt: {
    role: "Growth Marketing Manager",
    text: `TAYLOR REID
Austin, TX | taylor.reid@example.com | (555) 876-5432 | linkedin.com/in/taylorreid-mkt

SUMMARY
Data-driven Growth Marketer with 5+ years of experience scaling organic and paid customer acquisition channels. Skilled in SEO, Google Ads, LinkedIn Ads, content strategy, and conversion rate optimization (CRO).

CORE SKILLS
Search Engine Optimization (SEO), Paid Search (PPC), Content Marketing, Conversion Rate Optimization, Google Analytics 4, HubSpot, Email Marketing Campaigns

EXPERIENCE
Growth Marketing Manager — SaaSify Inc. | Austin, TX (2021 – Present)
- Managed paid acquisition budget across Google and Meta platforms
- Worked on optimizing blog content to improve search engine rankings
- Helped design email nurture sequences for leads
- Handled A/B testing for main landing pages

EDUCATION
Bachelor of Arts in Marketing — University of Texas at Austin (2016 – 2020)`,
    job: `Growth Marketer wanted to scale paid campaigns, execute SEO strategies, optimize conversion funnels, write ad copy, and manage multi-channel budgets.`
  }
};

const els = {
  inputView: document.getElementById('input-view'),
  loadingView: document.getElementById('loading-view'),
  resultsView: document.getElementById('results-view'),
  loadingStep: document.getElementById('loading-step'),
  cvText: document.getElementById('cv-text'),
  targetRole: document.getElementById('target-role'),
  jobDesc: document.getElementById('job-desc'),
  cvFile: document.getElementById('cv-file'),
  dropZone: document.getElementById('drop-zone'),
  browseBtn: document.getElementById('browse-btn'),
  uploadStatus: document.getElementById('upload-status'),
  enhanceBtn: document.getElementById('enhance-btn'),
  errorMsg: document.getElementById('error-msg'),
  
  // Results Elements
  scoreNumber: document.getElementById('score-number'),
  scoreVerdict: document.getElementById('score-verdict'),
  summaryText: document.getElementById('summary-text'),
  
  // Breakdown Meters
  mFormat: document.getElementById('m-format'),
  barFormat: document.getElementById('bar-format'),
  mVerbs: document.getElementById('m-verbs'),
  barVerbs: document.getElementById('bar-verbs'),
  mImpact: document.getElementById('m-impact'),
  barImpact: document.getElementById('bar-impact'),
  mKeywords: document.getElementById('m-keywords'),
  barKeywords: document.getElementById('bar-keywords'),

  // Lists & Tabs
  strengthsList: document.getElementById('strengths-list'),
  weaknessesList: document.getElementById('weaknesses-list'),
  sectionFeedback: document.getElementById('section-feedback'),
  bulletsList: document.getElementById('bullets-list'),
  keywordsChips: document.getElementById('keywords-chips'),
  paperDocument: document.getElementById('paper-document'),
  paperContent: document.getElementById('paper-content'),

  // Buttons & Navigation
  backBtn: document.getElementById('back-btn'),
  topBtn: document.getElementById('top-btn'),
  copyBtn: document.getElementById('copy-btn'),
  downloadMdBtn: document.getElementById('download-md-btn'),
  downloadPdfBtn: document.getElementById('download-pdf-btn'),

  // Scratch & Upload New Buttons
  createScratchBtn: document.getElementById('create-scratch-btn'),
  heroBlankBtn: document.getElementById('hero-blank-btn'),
  loadGuideTemplateBtn: document.getElementById('load-guide-template-btn'),
  newUploadNavBtn: document.getElementById('new-upload-nav-btn'),
  toolbarNewUploadBtn: document.getElementById('toolbar-new-upload-btn'),

  // AI Chat Bot
  chatToggleBtn: document.getElementById('chat-toggle-btn'),
  chatDrawer: document.getElementById('chat-drawer'),
  chatCloseBtn: document.getElementById('chat-close-btn'),
  chatMessages: document.getElementById('chat-messages'),
  chatInput: document.getElementById('chat-input'),
  chatSendBtn: document.getElementById('chat-send-btn')
};

let currentEnhancedCvMd = '';

// ---- Theme Switcher Engine (Light / Dark Mode) ----
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ats_theme', theme);
  if (theme === 'light') {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Light Mode';
  } else {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeLabel) themeLabel.textContent = 'Dark Mode';
  }
}

const savedTheme = localStorage.getItem('ats_theme') || 'dark';
setTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

function showView(view) {
  [els.inputView, els.loadingView, els.resultsView].forEach((v) => v.classList.add('hidden'));
  view.classList.remove('hidden');
}

// ---- Create Blank Resume & New Upload Actions ----
function loadStarterTemplate() {
  els.cvText.value = GUIDED_STARTER_TEMPLATE;
  els.targetRole.value = '';
  els.jobDesc.value = '';
  els.errorMsg.textContent = '';
  els.uploadStatus.textContent = '✨ Loaded ATS Blank Resume Starter Template';
  showView(els.inputView);
  window.scrollTo({ top: els.inputView.offsetTop - 20, behavior: 'smooth' });
}

function triggerNewUpload() {
  els.uploadStatus.textContent = '';
  els.errorMsg.textContent = '';
  showView(els.inputView);
  els.cvFile.click();
}

if (els.createScratchBtn) els.createScratchBtn.addEventListener('click', loadStarterTemplate);
if (els.heroBlankBtn) els.heroBlankBtn.addEventListener('click', loadStarterTemplate);
if (els.loadGuideTemplateBtn) els.loadGuideTemplateBtn.addEventListener('click', loadStarterTemplate);
if (els.newUploadNavBtn) els.newUploadNavBtn.addEventListener('click', triggerNewUpload);
if (els.toolbarNewUploadBtn) els.toolbarNewUploadBtn.addEventListener('click', triggerNewUpload);

// ---- Presets Loader ----
document.querySelectorAll('.preset-chip[data-preset]').forEach((chip) => {
  chip.addEventListener('click', () => {
    const pKey = chip.dataset.preset;
    if (PRESETS[pKey]) {
      els.cvText.value = PRESETS[pKey].text;
      els.targetRole.value = PRESETS[pKey].role;
      els.jobDesc.value = PRESETS[pKey].job;
      els.errorMsg.textContent = '';
      els.uploadStatus.textContent = `✓ Loaded sample preset: ${PRESETS[pKey].role}`;
    }
  });
});

// ---- File Upload & Drop Zone Handlers ----
if (els.browseBtn) {
  els.browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    els.cvFile.click();
  });
}

if (els.dropZone) {
  els.dropZone.addEventListener('click', () => {
    els.cvFile.click();
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    els.dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      els.dropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    els.dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      els.dropZone.classList.remove('dragover');
    });
  });

  els.dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) {
      handleFileUpload(dt.files[0]);
    }
  });
}

els.cvFile.addEventListener('change', () => {
  if (els.cvFile.files.length) {
    handleFileUpload(els.cvFile.files[0]);
  }
});

async function handleFileUpload(file) {
  els.uploadStatus.textContent = `Extracting text from ${file.name}...`;
  const formData = new FormData();
  formData.append('cvFile', file);

  try {
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    els.cvText.value = data.text.trim();
    els.uploadStatus.textContent = `✓ Loaded ${file.name}`;
    els.errorMsg.textContent = '';
  } catch (err) {
    els.uploadStatus.textContent = '';
    els.errorMsg.textContent = err.message;
  }
}

// ---- Enhance Flow ----
els.enhanceBtn.addEventListener('click', async () => {
  const cvText = els.cvText.value.trim();
  els.errorMsg.textContent = '';

  showView(els.loadingView);
  
  const steps = [
    'Scanning ATS formatting and section boundaries...',
    'Evaluating Google XYZ action verbs & metrics density...',
    'Checking target role keyword alignment...',
    'Formatting 100% ATS-compliant pure paper document...'
  ];
  let stepIdx = 0;
  const interval = setInterval(() => {
    stepIdx = (stepIdx + 1) % steps.length;
    els.loadingStep.textContent = steps[stepIdx];
  }, 650);

  try {
    const res = await fetch('/api/enhance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cvText,
        targetRole: els.targetRole.value.trim(),
        jobDescription: els.jobDesc.value.trim(),
      }),
    });

    clearInterval(interval);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Enhancement failed.');

    renderResults(data);
    showView(els.resultsView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    clearInterval(interval);
    showView(els.inputView);
    els.errorMsg.textContent = err.message;
  }
});

// ---- Render Results ----
function renderResults(data) {
  const score = data.overall_score ?? 80;
  els.scoreNumber.textContent = score;

  if (score >= 85) {
    els.scoreVerdict.textContent = 'EXCELLENT • TOP 5% ATS READINESS';
  } else if (score >= 70) {
    els.scoreVerdict.textContent = 'GOOD • PASSES ATS THRESHOLD';
  } else {
    els.scoreVerdict.textContent = 'NEEDS ENHANCEMENT • ATS RISK';
  }

  const bd = data.ats_breakdown || { formatting: 90, impact: 70, action_verbs: 75, keywords: 80 };
  
  els.mFormat.textContent = `${bd.formatting}%`;
  els.barFormat.style.width = `${bd.formatting}%`;
  
  els.mVerbs.textContent = `${bd.action_verbs}%`;
  els.barVerbs.style.width = `${bd.action_verbs}%`;

  els.mImpact.textContent = `${bd.impact}%`;
  els.barImpact.style.width = `${bd.impact}%`;

  els.mKeywords.textContent = `${bd.keywords}%`;
  els.barKeywords.style.width = `${bd.keywords}%`;

  els.summaryText.textContent = data.summary || '';

  els.strengthsList.innerHTML = (data.strengths || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
  els.weaknessesList.innerHTML = (data.weaknesses || []).map(w => `<li>${escapeHtml(w)}</li>`).join('');

  els.sectionFeedback.innerHTML = (data.section_feedback || []).map(sf => `
    <div class="feedback-item">
      <strong>${escapeHtml(sf.section)}</strong>
      <p>${escapeHtml(sf.feedback)}</p>
    </div>
  `).join('');

  els.bulletsList.innerHTML = (data.bullet_rewrites || []).map((b, i) => `
    <div class="bullet-card-mono">
      <span class="bullet-badge orig">ORIGINAL BULLET #${i + 1}</span>
      <p class="bullet-text orig-text">${escapeHtml(b.original)}</p>
      
      <span class="bullet-badge improved">GOOGLE XYZ POWER BULLET</span>
      <p class="bullet-text imp-text">
        ${escapeHtml(b.improved)}
        <button class="btn-outline-theme" style="margin-left: 10px; padding: 2px 8px; font-size: 11px;" onclick="copySingleBullet(this, '${escapeJs(b.improved)}')">📋 Copy</button>
      </p>
      
      <div class="bullet-why-box">💡 ${escapeHtml(b.why)}</div>
    </div>
  `).join('');

  els.keywordsChips.innerHTML = (data.keyword_suggestions || []).map(k => `
    <span class="chip-mono">+ ${escapeHtml(k)}</span>
  `).join('');

  currentEnhancedCvMd = data.enhanced_cv_markdown || '';
  els.paperContent.innerHTML = markdownToHtml(currentEnhancedCvMd);
}

function copySingleBullet(btn, text) {
  navigator.clipboard.writeText(text);
  const origText = btn.textContent;
  btn.textContent = '✓ Copied!';
  setTimeout(() => (btn.textContent = origText), 1500);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function escapeJs(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, ' ');
}

function markdownToHtml(md) {
  if (!md) return '';
  
  let html = md
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^---/gim, '<hr/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>');

  html = html.replace(/(<li>.*<\/li>)/gis, '<ul>$1</ul>');
  
  const paragraphs = html.split('\n\n');
  return paragraphs.map(p => {
    if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<hr')) {
      return p;
    }
    return `<p>${p.trim()}</p>`;
  }).join('');
}

// ---- Templates Switcher ----
document.querySelectorAll('.template-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const tpl = btn.dataset.tpl;
    els.paperDocument.className = `paper-sheet tpl-${tpl}`;
  });
});

// ---- Tabs Navigation ----
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
  });
});

// ---- Back & Scroll Top ----
els.backBtn.addEventListener('click', () => showView(els.inputView));
els.topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- Export Actions ----
els.copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(currentEnhancedCvMd);
  els.copyBtn.textContent = '✓ Copied!';
  setTimeout(() => (els.copyBtn.textContent = '📋 Copy Text'), 1500);
});

els.downloadMdBtn.addEventListener('click', () => {
  const blob = new Blob([currentEnhancedCvMd], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Executive_ATS_Resume.md';
  a.click();
  URL.revokeObjectURL(url);
});

// ---- PDF Export Trigger Engine ----
function triggerPdfExport(btn) {
  const targetBtn = btn || els.downloadPdfBtn;
  const origText = targetBtn.textContent;
  targetBtn.textContent = '⌛ Generating PDF...';

  // 1. Clone the paper document element
  const originalEl = els.paperDocument;
  const clone = originalEl.cloneNode(true);

  // 2. Set explicit standalone styling to prevent scroll clipping or blank canvas issues
  clone.id = 'pdf-export-temp-node';
  clone.style.position = 'fixed';
  clone.style.top = '0';
  clone.style.left = '-9999px';
  clone.style.width = '780px';
  clone.style.padding = '40px 50px';
  clone.style.backgroundColor = '#ffffff';
  clone.style.color = '#000000';
  clone.style.zIndex = '99999';
  clone.style.boxShadow = 'none';

  document.body.appendChild(clone);

  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     'Executive_ATS_Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const cleanup = () => {
    const tempNode = document.getElementById('pdf-export-temp-node');
    if (tempNode && tempNode.parentNode) {
      tempNode.parentNode.removeChild(tempNode);
    }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(clone).save().then(() => {
      cleanup();
      targetBtn.textContent = '✓ PDF Downloaded!';
      setTimeout(() => (targetBtn.textContent = origText), 2000);
    }).catch(err => {
      console.error('PDF Export Error:', err);
      cleanup();
      window.print();
      targetBtn.textContent = origText;
    });
  } else {
    cleanup();
    window.print();
    targetBtn.textContent = origText;
  }
}

if (els.downloadPdfBtn) els.downloadPdfBtn.addEventListener('click', () => triggerPdfExport(els.downloadPdfBtn));
const directPaperPdfBtn = document.getElementById('direct-paper-pdf-btn');
if (directPaperPdfBtn) directPaperPdfBtn.addEventListener('click', () => triggerPdfExport(directPaperPdfBtn));

const printPdfBtn = document.getElementById('print-pdf-btn');
const directPrintPdfBtn = document.getElementById('direct-print-pdf-btn');
if (printPdfBtn) printPdfBtn.addEventListener('click', () => window.print());
if (directPrintPdfBtn) directPrintPdfBtn.addEventListener('click', () => window.print());

// ---- AI Assistant Chatbot Widget ----
els.chatToggleBtn.addEventListener('click', () => {
  els.chatDrawer.classList.toggle('hidden');
});

els.chatCloseBtn.addEventListener('click', () => {
  els.chatDrawer.classList.add('hidden');
});

document.querySelectorAll('.chat-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const promptText = chip.dataset.prompt;
    sendChatMessage(promptText);
  });
});

els.chatSendBtn.addEventListener('click', () => {
  const msg = els.chatInput.value.trim();
  if (msg) {
    sendChatMessage(msg);
    els.chatInput.value = '';
  }
});

els.chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const msg = els.chatInput.value.trim();
    if (msg) {
      sendChatMessage(msg);
      els.chatInput.value = '';
    }
  }
});

async function sendChatMessage(userText) {
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.textContent = userText;
  els.chatMessages.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.className = 'chat-msg bot';
  botDiv.innerHTML = '<p><em>✦ ATS AI Coach is analyzing your request...</em></p>';
  els.chatMessages.appendChild(botDiv);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        cvText: els.cvText.value.trim(),
        targetRole: els.targetRole.value.trim()
      })
    });

    const data = await res.json();
    botDiv.innerHTML = markdownToHtml(data.reply || 'Thank you! Let me know if you need further resume refinements.');
  } catch (err) {
    botDiv.innerHTML = '<p>Unable to connect to AI Coach. Please check server logs.</p>';
  }

  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}
