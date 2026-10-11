// Safe local development server: no credential collection or device tracking.
const express = require('express');
const path = require('path');
const app = express();
const PORT = Number(process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'Money development server' }));
app.get('/api/security-demo', (_req, res) => res.json({ message: 'Training only. Never enter real passwords into imitation login pages.' }));
app.listen(PORT, '127.0.0.1', () => console.log('Local development server listening on http://127.0.0.1:' + PORT));
