# CV Enhancer

An AI-powered CV/resume enhancer. Paste or upload a CV and get:

- An honest 0–100 effectiveness score
- Strengths & weaknesses
- Section-by-section feedback (Summary, Experience, Skills, Education, etc.)
- Before/after rewrites of your weakest bullet points, with reasons
- Keyword suggestions (especially useful if you paste a target job description)
- ATS (Applicant Tracking System) tips
- A full, ready-to-use rewritten version of your CV in Markdown, which you can copy or download

## Tech stack

- **Backend:** Node.js + Express, calling the Anthropic Claude API
- **Frontend:** Plain HTML/CSS/JavaScript (no build step required)
- **File parsing:** Supports `.pdf`, `.docx`, and `.txt` uploads

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Add your Anthropic API key**

   Copy `.env.example` to `.env` and paste in your key from [console.anthropic.com](https://console.anthropic.com/):

   ```bash
   cp .env.example .env
   ```

   ```
   ANTHROPIC_API_KEY=sk-ant-...
   PORT=3000
   ```

3. **Run the server**

   ```bash
   npm start
   ```

4. Open **http://localhost:3000** in your browser.

## How it works

- The frontend (`public/`) lets you paste CV text directly, or upload a `.pdf` / `.docx` / `.txt` file (parsed server-side with `pdf-parse` / `mammoth`).
- You can optionally add a **target role** and/or paste a **job description** — the AI will tailor its keyword suggestions and feedback accordingly.
- On submit, the frontend calls `POST /api/enhance`, which sends your CV (plus a detailed instruction prompt) to Claude and asks for structured JSON feedback.
- The result is rendered as: an overview tab, a bullet-rewrite tab, a keywords/ATS tab, and a full rewritten CV tab (copy or download as Markdown).

## Project structure

```
cv-enhancer/
├── package.json
├── .env.example
├── server/
│   └── index.js        # Express server + Claude API calls + file parsing
└── public/
    ├── index.html       # UI markup
    ├── style.css        # Dark-mode styling
    └── app.js           # Frontend logic (fetch calls, rendering, tabs)
```

## Customizing

- **Change the model:** edit the `model` field in `server/index.js` (`enhanceCvWithClaude`).
- **Change the tone/rules of feedback:** edit the `systemPrompt` string in `server/index.js`.
- **Style changes:** all colors are CSS variables at the top of `public/style.css`.

## Notes

- Nothing is stored — each request is stateless. If you want to save CV history, you'd add a database (e.g. SQLite/Postgres) and a `/api/history` route.
- The app never invents facts, employers, or metrics that weren't in your original CV — it only improves wording, structure, and clarity of what you gave it.
- File uploads are capped at 8MB.
