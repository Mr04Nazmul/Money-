const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const app = express();
const dataDir = path.join(__dirname, 'data');
const eventsFile = path.join(dataDir, 'events.json');
app.disable('x-powered-by');
app.use(express.json({ limit: '8kb' }));
app.use(express.static(path.join(__dirname, 'public')));
const allowedTypes = new Set(['demo-login', 'phishing-clue', 'reset']);
function readEvents() {
  try { return JSON.parse(fs.readFileSync(eventsFile, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
}
app.post('/api/events', (req, res) => {
  const { type, scenario } = req.body || {};
  if (!allowedTypes.has(type) || typeof scenario !== 'string' || !/^[a-z0-9-]{1,40}$/.test(scenario)) {
    return res.status(400).json({ error: 'Invalid demo event' });
  }
  fs.mkdirSync(dataDir, { recursive: true });
  const events = readEvents().slice(-99);
  events.push({ type, scenario, timestamp: new Date().toISOString() });
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
  res.json({ success: true });
});
app.get('/api/events', (req, res) => res.json(readEvents().slice(-100)));
const port = Number(process.env.PORT) || 3000;
if (require.main === module) app.listen(port, '127.0.0.1', () => console.log('Security lab: http://127.0.0.1:' + port));
module.exports = app;
