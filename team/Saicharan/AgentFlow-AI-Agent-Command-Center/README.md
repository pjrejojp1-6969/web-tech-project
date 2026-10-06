# AgentFlow — AI Agent Command Center

## Project overview
AgentFlow is an original AI-agent management UI for the UI Template Collection Hackathon. It combines an AI chat interface, agent profiles, status monitoring, task queue, document intelligence and activity history in one responsive workspace.

The selected UI topic is **AI Agents**. The assignment specifically lists AI Agent Dashboard, AI Agent Profile, Agent Status Monitoring, Agent Task Queue, Agent Activity Log, Execution History, Agent Workflow, Agent Configuration and related patterns as recommended UI patterns.

## What makes this implementation useful
- Real chat endpoint using the OpenAI Responses API when an API key is configured.
- Five useful built-in/custom agent roles.
- Conversation history stored locally in the browser.
- PDF upload and text extraction through the Node.js backend.
- PDF actions: summarize, questions, MCQs and key points.
- Task creation, filtering and simulated execution states.
- Agent status controls and custom agent creation.
- Searchable activity log and JSON export.
- Dark mode, compact mode, responsive layout and toast notifications.
- Demo mode works even without an API key so the UI can still be demonstrated.

## Required folder structure
```text
your-ui/
├── index.html
├── style.css
├── script.js
├── README.md
└── server/
    ├── server.js
    ├── package.json
    └── .env.example
```

## Technologies
HTML5, CSS3, vanilla JavaScript, Node.js, Express, Multer, pdf-parse and OpenAI API.

## Run locally
1. Install Node.js 20+.
2. Open a terminal inside this folder.
3. Run `cd server` then `npm install`.
4. Copy `server/.env.example` to `server/.env`.
5. Put your API key in `server/.env` as `OPENAI_API_KEY=...`.
6. Run `npm start` from the project root if your terminal is in the root, or run `node server.js` from `server/` after adjusting the static path; the easiest method is to run `cd ..` after installation and then `node server/server.js`.
7. Open `http://localhost:3000`.

### Recommended command sequence
```bash
cd server
npm install
cd ..
node server/server.js
```

The application will run in **Demo mode** without an API key. With `OPENAI_API_KEY` configured, chat and document analysis use the live AI API.

## Security
Never commit `server/.env` or expose the API key in `script.js`. The `.gitignore` already excludes `server/.env` and `node_modules`.

## Research / design rationale
Modern AI-agent interfaces commonly combine conversational input with agent identity, execution status, task management and observability. AgentFlow uses those patterns but adds a simple student-friendly document workflow: upload a PDF, extract its text, then request summaries, questions, MCQs or key points. This keeps the implementation original while making the template useful beyond a static dashboard.

## GitHub workflow
The assignment requires Fork → Clone → Branch → Develop → Commit → Push → Pull Request → Review → Merge. This project is designed so each area can be committed as a meaningful contribution, for example: dashboard UI, chat module, document module, task queue, testing/documentation.
