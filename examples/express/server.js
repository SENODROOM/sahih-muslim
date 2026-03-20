// Express REST API example
// run: node examples/express/server.js
import express from 'express';
import muslim from 'sahih-muslim';

const app  = express();
const PORT = process.env.PORT || 3000;

app.get('/api/hadith/random',    (_, res) => res.json(muslim.getRandom()));
app.get('/api/hadith/:id',       (req, res) => { const h = muslim.get(parseInt(req.params.id)); h ? res.json(h) : res.status(404).json({ error: 'Not found' }); });
app.get('/api/chapter/:id',      (req, res) => { const h = muslim.getByChapter(parseInt(req.params.id)); h.length ? res.json({ count: h.length, hadiths: h }) : res.status(404).json({ error: 'Not found' }); });
app.get('/api/search',           (req, res) => { const r = muslim.search(req.query.q || '', parseInt(req.query.limit) || 0); res.json({ count: r.length, results: r }); });
app.get('/api/chapters',         (_, res) => res.json(muslim.chapters));
app.get('/api/meta',             (_, res) => res.json({ ...muslim.metadata, total: muslim.length }));

app.listen(PORT, () => console.log(`Sahih Muslim API running at http://localhost:${PORT}`));
