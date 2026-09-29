# ✦ Executive ATS CV Pro — AI Resume Enhancer & Builder

An enterprise-grade, Fortune 500 MNC-trained AI Resume Enhancer & Builder built for Vercel serverless deployment and local execution.

![ATS CV Pro](https://img.shields.io/badge/Vercel-Ready-blue.svg) ![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg) ![Express](https://img.shields.io/badge/Express-4.19-black.svg) ![Anthropic](https://img.shields.io/badge/Claude-3.7--Sonnet-purple.svg)

---

## 🌟 Key Features

1. **Enterprise MNC ATS Priority Scoring (Workday, Taleo, iCIMS, Greenhouse Standard)**
   - **Priority 1: Hard Skills & Domain Competency (35% Weight)** — Scans matched hard skills vs. missing critical job skills with **1-click "+ Add to Resume"** integration.
   - **Priority 2: Work Experience & Google XYZ Impact (30% Weight)** — Formulates achievement bullets into Google's formula: *"Accomplished [X], as measured by [Y], by doing [Z]"*.
   - **Priority 3: Education & Credentials Verification (15% Weight)** — Validates degrees, academic honors, and ATS-compliant certifications.
   - **Priority 4: ATS Structural Parsability (20% Weight)** — Ensures 100% single-column scannability free of table traps or text-box header graphics.

2. **Resume Creator Studio & Scratchpad Editor**
   - Live real-time word counter, bullet point counter, and metric detector.
   - Quick section insertion toolbar: 👤 Contact, 📝 Summary, 💼 Experience, ⚡ Google XYZ Bullet, 🎯 Technical Skills, 🎓 Education, 🏆 Projects.
   - Rich formatting: Bold, Italic, Bullet, H2 Section, Divider Line, Clear Canvas.

3. **Live White Paper Preview & High-Res PDF Export**
   - 3 Executive Templates: **Harvard Classic**, **Modern Tech**, and **Minimalist Pro**.
   - 1-Click high-resolution vector PDF export using standalone DOM node cloning (no scroll clipping or page cutoff).
   - Markdown (`.md`) download and 1-click text copying.

4. **Floating AI Career Coach Chatbot**
   - Real-time executive AI advisor for career questions, custom bullet rewrites, summary crafting, and target role advice.

5. **Dual Executive Theme System**
   - Seamless dark mode (`#090d16`) and light mode (`#f8fafc`) with HSL sapphire blue accents.

6. **Zero-Lockout Fallback Architecture**
   - Operates using **Claude 3.7 Sonnet** when an `ANTHROPIC_API_KEY` is provided, and gracefully falls back to an embedded high-performance ML/NLP engine if no API key is set.

---

## 🚀 Deploying to Vercel (1-Click Ready)

This repository is fully configured for Vercel deployment out of the box.

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Push this codebase to your GitHub / GitLab / Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" -> "Project"**.
3. Import your repository.
4. (Optional) In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY`: `sk-ant-...` (Your Anthropic Claude API Key)
5. Click **Deploy**. Vercel will automatically detect `api/index.js` and serve the application serverlessly.

### Option B: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cv-enhancer.git
cd cv-enhancer

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env
# Add ANTHROPIC_API_KEY=sk-ant-... to .env if you have a Claude API key

# 4. Start local development server
npm start
# or for auto-reload:
npm run dev

# 5. Open in browser
http://localhost:3000
```

---

## 📂 Project Architecture

```
cv-enhancer/
├── api/
│   └── index.js          # Vercel Serverless Function entrypoint
├── server/
│   └── index.js          # Express server, Claude API integration, ML/NLP engine & PDF/DOCX parsing
├── public/
│   ├── index.html        # Main application markup & executive UI structure
│   ├── style.css         # Executive dual-theme CSS (Dark/Light), paper sheet renderer & animations
│   └── app.js            # Frontend logic (file upload, scratchpad editor, tabs, PDF export, AI Chatbot)
├── package.json          # Dependencies & npm scripts
├── vercel.json           # Vercel routing & serverless configuration
├── .vercelignore         # Files excluded from Vercel deployments
└── README.md             # Project documentation
```

---

## 🛠️ API Endpoints

- `POST /api/enhance` — Accepts `cvText`, `targetRole`, `jobDescription` and returns multi-dimensional ATS audit JSON.
- `POST /api/upload` — Accepts multipart file upload (`.pdf`, `.docx`, `.txt`) and returns extracted raw text.
- `POST /api/chat` — Accepts user query and resume context, returns AI career strategy response.
- `GET /api/health` — Returns server health and active AI engine status (`claude-ai` or `ml-local-ats-engine`).

---

## 🔒 Privacy & Data Handling

All processing occurs in-memory during request execution. No resume contents or personal candidate data are stored to disk or external databases.
