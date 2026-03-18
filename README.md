<div align="center">

<h1>🕌 Sahih Muslim</h1>

![npm version](https://img.shields.io/npm/v/sahih-muslim?style=for-the-badge&logo=npm)
![npm downloads](https://img.shields.io/npm/dt/sahih-muslim?style=for-the-badge&logo=npm)
![npm downloads per month](https://img.shields.io/npm/dm/sahih-muslim?style=for-the-badge&logo=npm)
![license](https://img.shields.io/github/license/SENODROOM/sahih-muslim?style=for-the-badge&logo=gnu)
![node version](https://img.shields.io/node/v/sahih-muslim?style=for-the-badge&logo=node.js)
![bundle size](https://img.shields.io/bundlephobia/minzip/sahih-muslim?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/SENODROOM/sahih-muslim?style=for-the-badge&logo=github)

**📚 Complete Sahih Muslim for JavaScript — CLI, Node.js, React, Vue, and every bundler. Tiny package, data served from CDN.**

[![NPM](https://nodei.co/npm/sahih-muslim.png)](https://nodei.co/npm/sahih-muslim/)

</div>

---

## 📊 Package Statistics

| Metric | Value | Description |
|--------|-------|-------------|
| 📚 **Total Hadiths** | 7,563 | Complete Sahih Muslim collection |
| 📝 **Chapters** | 4,000+ | Detailed chapter organization |
| 🗣️ **Narrators** | 1,000+ | Clean narrator names |
| 📦 **Package Size** | ~3KB | Core package — data loads from CDN |
| 🔧 **Dependencies** | 0 | Zero external dependencies |
| 🌐 **Bilingual** | ✅ | Full Arabic text + English translations |
| 📘 **TypeScript** | ✅ | Built-in type definitions |

---

## ✨ Features

- 📚 **Complete Collection** — All 7,563 authentic hadiths from Sahih Muslim
- 🔍 **Full-text Search** — Search English text and narrator names
- 🌐 **Bilingual** — Original Arabic + English translation
- ⚡ **Tiny Install** — ~3KB package, data loaded from CDN on demand
- 🖥️ **CLI** — Terminal access with Arabic/English flags
- ⚛️ **React Hook** — One command generates `useMuslim()` in your project
- 📦 **Universal** — Node.js CJS, Node.js ESM, React, Vue, Vite, webpack
- 📘 **TypeScript** — Full type definitions included
- 🔧 **Zero Config** — Works out of the box everywhere

---

## 🚀 Installation

```bash
# Local (Node.js / React / Vue projects)
npm install sahih-muslim

# Global (CLI usage)
npm install -g sahih-muslim
```

---

## 🖥️ CLI Usage

```bash
muslim 1                 # First hadith in English
muslim 2345              # Hadith #2345 in English
muslim 23 34             # 34th hadith of chapter 23

muslim 2345 -a           # Arabic only
muslim 2345 --arabic     # Arabic only
muslim 2345 -b           # Arabic + English
muslim 2345 --both       # Arabic + English

muslim --react           # Generate React hook in current project
muslim --help            # Show help
muslim --version         # Show version and stats
```

---

## ⚛️ React / Vue / Vite

**Step 1** — run inside your React project:

```bash
cd my-react-app
muslim --react
# ✓ Generated: src/hooks/useMuslim.js
```

**Step 2** — use the hook anywhere:

```jsx
import { useMuslim } from '../hooks/useMuslim';

function HadithOfTheDay() {
  const muslim = useMuslim();
  if (!muslim) return <p>Loading...</p>;

  const hadith = muslim.getRandom();
  return (
    <div>
      <p><strong>{hadith.english.narrator}</strong></p>
      <p>{hadith.english.text}</p>
    </div>
  );
}
```

```jsx
function HadithSearch() {
  const muslim = useMuslim();
  const [results, setResults] = useState([]);

  if (!muslim) return <p>Loading...</p>;

  return (
    <div>
      <input
        placeholder="Search hadiths..."
        onChange={e => setResults(muslim.search(e.target.value))}
      />
      {results.map(h => (
        <p key={h.id}>{h.english.text}</p>
      ))}
    </div>
  );
}
```

---

## 🟩 Node.js Usage

### CommonJS

```javascript
const muslim = require('sahih-muslim');

console.log(muslim[0]);                     // First hadith (index 0)
console.log(muslim.get(1));                 // Hadith with id: 1
console.log(muslim.search('prayer'));       // Search
console.log(muslim.getByChapter(1));        // All hadiths in chapter 1
console.log(muslim.getRandom());            // Random hadith
console.log(muslim.length);                 // 7563
console.log(muslim.metadata);               // Book metadata
console.log(muslim.chapters);               // All chapters
```

### ESM

```javascript
import muslim from 'sahih-muslim';

const hadith = muslim.get(23);
console.log(hadith.english.narrator);
console.log(hadith.english.text);
console.log(hadith.arabic);
```

### Express.js

```javascript
import express from 'express';
import muslim from 'sahih-muslim';

const app = express();

app.get('/api/hadith/random',  (req, res) => res.json(muslim.getRandom()));
app.get('/api/hadith/:id',     (req, res) => {
  const h = muslim.get(parseInt(req.params.id));
  if (!h) return res.status(404).json({ error: 'Not found' });
  res.json(h);
});
app.get('/api/search', (req, res) => res.json(muslim.search(req.query.q || '')));

app.listen(3000);
```

---

## 🛠️ API Reference

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `length` | `number` | Total hadiths |
| `metadata` | `object` | Collection title and author info |
| `chapters` | `array` | All chapter objects |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `get(id)` | `number` | `Hadith` | Hadith by ID |
| `getByChapter(id)` | `number` | `Hadith[]` | All hadiths in a chapter |
| `search(query)` | `string` | `Hadith[]` | Full-text search |
| `getRandom()` | — | `Hadith` | Random hadith |

All native array methods also work: `find`, `filter`, `map`, `forEach`, `slice`, index access.

---

## 📐 Data Structure

```javascript
// Hadith
{
  "id": 1,
  "chapterId": 1,
  "arabic": "حَدَّثَنَا...",
  "english": {
    "narrator": "Abu Huraira",
    "text": "The Prophet (ﷺ) said..."
  }
}

// Chapter
{ "id": 1, "arabic": "...", "english": "Faith" }
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit and push, then open a Pull Request

---

## 📄 License

**GNU Affero General Public License v3.0 (AGPL-3.0)** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **📖 Source** — Sahih Muslim, one of the most authentic hadith collections
- **👨‍🏫 Translations** — By reputable Islamic scholars
- **💚 Inspiration** — The Muslim community worldwide

---

<div align="center">

**Made with ❤️ for the Muslim community | Seeking knowledge together**

[![GitHub stars](https://img.shields.io/github/stars/SENODROOM/sahih-muslim?style=for-the-badge&logo=github)](https://github.com/SENODROOM/sahih-muslim)

</div>
