# Project Overview

### Goal

Build a **Lifestyle Management Website** that:

1. Asks **10 lifestyle questions**, one at a time
2. Collects user responses conversationally
3. Generates a **structured lifestyle report**:

   * Risks
   * Positive habits
   * Improvement suggestions
4. Uses **Gemini API as a chatbot**
5. Has **only one main intelligence layer: your system prompt**

No dataset. No model training.

---

# High-Level Architecture

```
Frontend (Web UI)
   |
   |  User answers
   v
Backend (Python)
   |
   |  System Prompt + Conversation History
   v
Gemini API
   |
   |  Structured Lifestyle Report (JSON / Markdown)
   v
Frontend (Report UI)
```

---

# Tech Stack (Minimal & Fast)

### Frontend

* React

**UI libraries (pick one):**

* Tailwind

### Backend

* Python + FastAPI

### LLM

* **Google Gemini API**
* Single system prompt
* Chat-style messages

### Deployment (Optional but doable)

* Backend: Render / Railway
* Frontend: Netlify / Vercel


---

# Core System (Questions + Prompt)

## Step 1: Define the 10 Questions

These must be:

* Non-medical
* Simple

### Example Question Areas

1. Sleep duration
2. Sleep consistency
3. Physical activity
4. Diet quality
5. Hydration
6. Stress level
7. Screen time
8. Substance use (alcohol / smoking)
9. Work-life balance
10. Social interaction

📌 Each question should be answerable in **1 sentence or less**.

---

## Step 2: Design the System Prompt

Your system prompt must:

* Control question flow
* Enforce exactly 10 questions
* Store answers mentally
* Generate a **final structured report**

### Core Responsibilities of the Prompt

1. Ask **only one question at a time**
2. The next questions should be based on previous context
3. Never skip or repeat a question
4. After 10th answer:

   * Stop asking questions
   * Generate report
5. Be supportive, non-judgmental
6. Avoid medical claims

---

### Example System Prompt Skeleton

```text
You are a lifestyle assessment assistant.

Rules:
- Ask exactly 10 questions, one at a time.
- Do not explain why you are asking.
- Wait for the user's response before asking the next question.
- Store answers internally.
- After the 10th answer, generate a lifestyle report.

Question domains:
1. Sleep
2. Physical activity
3. Diet
4. Hydration
5. Stress
6. Screen time
7. Substance use
8. Routine consistency
9. Social connection
10. Personal well-being
11. Nature of work
12. City, suburb, village residence

Final Report Format:
- Overall Lifestyle Summary
- What You Are Doing Well (bullet points)
- Potential Risks (bullet points)
- Improvement Suggestions (actionable, realistic)
- Flag any serious health issues (if applicable)

Tone:
- Supportive
- Practical
- Non-medical
- Non-judgmental
```

---

## Step 3: Backend Chat Endpoint

### API Endpoint

`POST /chat`

Payload:

```json
{
  "messages": [
    {"role": "system", "content": "..."},
    {"role": "user", "content": "..."}
  ]
}
```

Response:

* Gemini output (question or final report)

### Tools

* Python: `google-generativeai`

No state in DB — just keep conversation in memory or session.

---

## Step 4: Frontend Chat UI

### Features

* Chat bubbles
* Text input
* “Next” behavior handled by LLM
* Disable input while waiting

You do **not** control question count in frontend — Gemini does.

Make package.json and vite.config.js for frontend first so that there are no dependency issues.

---

## Report Structuring + Polish

### Step 5: Force Structured Output (Critical)

At the end, force Gemini to output in **Markdown or JSON**.

### Example Structured Output (Markdown)

```markdown
## Overall Lifestyle Summary
...

## What You're Doing Well
- ...

## Potential Risks
- ...

## How to Improve
- ...

## Final Note
...
```

This makes frontend rendering trivial.

---

## Step 6: Add Guardrails in Prompt

Add rules to prevent:

* Medical advice
* Diagnoses
* Fear-based language

Example:

```text
Do not mention diseases.
Do not provide medical advice.
Use phrases like "may benefit from" instead of "should".
```

---

## Step 7: UX Improvements (Quick Wins)

* Progress indicator (Question 3 of 10)
* Typing animation
* Restart button

---

## Step 8: Deployment (Optional but Fast)

### Backend

* Render (free tier)
* Set Gemini API key as env variable

### Frontend

* Netlify or Vercel
* Connect to backend endpoint

---

# Folder Structure (Simple)

```
lifestyle-manager/
├── backend/
│   ├── index.js / main.py
│   ├── gemini.js
│   └── prompt.txt
├── frontend/
└── README.md
```

---
