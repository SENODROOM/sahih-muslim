<div align="center">

<h1>
  <img src="https://em-content.zobj.net/source/apple/391/mosque_1f54c.png" width="36" />
  &nbsp;sahih-muslim
</h1>

<p align="center">
  <strong>The complete Sahih Muslim — 7,563 hadiths, full Arabic & English.</strong><br />
  One repo · one dataset · published on both <strong>npm</strong> and <strong>PyPI</strong>.
</p>

<br />

<!-- Row 1: version badges -->
<p>
  <a href="https://www.npmjs.com/package/sahih-muslim" text-decoration="none">
    <img src="https://img.shields.io/npm/v/sahih-muslim?style=for-the-badge&logo=npm&logoColor=white&color=CB3837&labelColor=1a1a1a" alt="npm version" />
  </a><a href="https://pypi.org/project/sahih-muslim/" text-decoration="none">
    <img src="https://img.shields.io/pypi/v/sahih-muslim?style=for-the-badge&logo=pypi&logoColor=white&color=3775A9&labelColor=1a1a1a" alt="PyPI version" />
  </a><a href="https://github.com/SENODROOM/sahih-muslim/blob/main/LICENSE" text-decoration="none">
    <img src="https://img.shields.io/github/license/SENODROOM/sahih-muslim?style=for-the-badge&logo=gnu&logoColor=white&color=A42E2B&labelColor=1a1a1a" alt="License: AGPL-3.0" />
  </a>
</p>

<!-- Row 2: stats -->
<p>
  <a href="https://www.npmjs.com/package/sahih-muslim" text-decoration="none">
    <img src="https://img.shields.io/npm/dt/sahih-muslim?style=for-the-badge&logo=npm&logoColor=white&color=CB3837&labelColor=1a1a1a" alt="npm downloads" />
  </a><a href="https://pypi.org/project/sahih-muslim/" text-decoration="none">
    <img src="https://img.shields.io/pypi/dm/sahih-muslim?style=for-the-badge&logo=pypi&logoColor=white&color=3775A9&labelColor=1a1a1a" alt="PyPI monthly downloads" />
  </a>
</p>

<!-- Row 3: repo stats -->
<p>
  <a href="https://github.com/SENODROOM/sahih-muslim/stargazers" text-decoration="none">
    <img src="https://img.shields.io/github/stars/SENODROOM/sahih-muslim?style=for-the-badge&logo=github&logoColor=white&color=f0c040&labelColor=1a1a1a" alt="GitHub stars" />
  </a><a href="https://github.com/SENODROOM/sahih-muslim/issues" text-decoration="none">
    <img src="https://img.shields.io/github/issues/SENODROOM/sahih-muslim?style=for-the-badge&logo=github&logoColor=white&color=238636&labelColor=1a1a1a" alt="GitHub issues" />
  </a><a href="https://github.com/SENODROOM/sahih-muslim/commits/main" text-decoration="none">
    <img src="https://img.shields.io/github/last-commit/SENODROOM/sahih-muslim?style=for-the-badge&logo=github&logoColor=white&color=8957e5&labelColor=1a1a1a" alt="Last commit" />
  </a>
</p>

<!-- Row 4: tech -->
<p>
  <img src="https://img.shields.io/badge/Node.js-%3E%3D14-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=1a1a1a" alt="Node.js" /><img src="https://img.shields.io/badge/Python-%3E%3D3.8-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=1a1a1a" alt="Python" /><img src="https://img.shields.io/badge/TypeScript-Typed-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a1a" alt="TypeScript" /><img src="https://img.shields.io/badge/Zero-Dependencies-00C853?style=for-the-badge&logoColor=white&labelColor=1a1a1a" alt="Zero dependencies" />
</p>

<br />

[![NPM](https://nodei.co/npm/sahih-muslim.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sahih-muslim/)

</div>

---

## ✨ Features at a Glance

|     | Feature                 | Details                                                 |
| --- | ----------------------- | ------------------------------------------------------- |
| 📚  | **Complete Collection** | All 7,563 authentic hadiths from Sahih Muslim           |
| 🌐  | **Bilingual**           | Full Arabic text + English translation for every hadith |
| 📝  | **Chapters**            | 2,200+ chapters with Arabic & English names             |
| ⚡  | **Tiny Install**        | ~3KB package — data loaded from CDN on demand           |
| 🔍  | **Full-text Search**    | Search English text and narrator names instantly        |
| 🖥️  | **CLI**                 | Terminal access with Arabic/English/both flags          |
| ⚛️  | **React Hook**          | One command generates `useMuslim()` in your project     |
| 🐍  | **Python**              | Identical API — same method names as the npm package    |
| 📘  | **TypeScript**          | Full type definitions, zero `@types` package needed     |
| 🔧  | **Zero Config**         | Works out of the box everywhere                         |
| 🗄️  | **One Dataset**         | `bin/muslim.json` shared by both JS and Python          |

---

## 🚀 Installation

<table>
<tr>
<td><strong>JavaScript / Node.js</strong></td>
<td><strong>Python</strong></td>
</tr>
<tr>
<td>

```bash
# local (for projects)
npm install sahih-muslim

# global (for CLI)
npm install -g sahih-muslim
```

</td>
<td>

```bash
# local (for projects)
pip install sahih-muslim

# global CLI is included automatically
```

</td>
</tr>
</table>

---

## 🟨 JavaScript / Node.js

### CommonJS & ESM

```javascript
// CommonJS — require()
const muslim = require("sahih-muslim");

// ESM — import
import muslim from "sahih-muslim";

// Get by ID
muslim.get(1); // → Hadith

// Get by chapter
muslim.getByChapter(1); // → Hadith[]

// Full-text search
muslim.search("prayer"); // → Hadith[]

// Random
muslim.getRandom(); // → Hadith

// Index access
muslim[0]; // → Hadith (first)
muslim.length; // → 7563

// Metadata
muslim.metadata; // → { title, author, ... }
muslim.chapters; // → Chapter[]
```

### Hadith object shape

```javascript
{
  id: 1,
  chapterId: 1,
  arabic: "حَدَّثَنِي يَحْيَى بْنُ يَحْيَى...",
  english: {
    narrator: "Yahya bin Yahya",
    text: "It is narrated on the authority of Amir al-Mu'minin..."
  }
}
```

### Native array methods — all work

```javascript
muslim.find((h) => h.id === 23);
muslim.filter((h) => h.chapterId === 1);
muslim.map((h) => h.english.narrator);
muslim.forEach((h) => console.log(h.id));
muslim.slice(0, 10);
```

---

## ⚛️ React / Vue / Vite

Run this **once** inside your React project:

```bash
cd my-react-app
muslim --react
```

This auto-generates `src/hooks/useMuslim.js`. Then use it anywhere:

```jsx
import { useMuslim } from "../hooks/useMuslim";

function HadithOfTheDay() {
  const muslim = useMuslim();
  if (!muslim) return <p>Loading...</p>;

  const h = muslim.getRandom();
  return (
    <div>
      <p>
        <strong>{h.english.narrator}</strong>
      </p>
      <p>{h.english.text}</p>
    </div>
  );
}
```

```jsx
// Search example
function HadithSearch() {
  const muslim = useMuslim();
  const [results, setResults] = useState([]);
  if (!muslim) return <p>Loading...</p>;

  return (
    <>
      <input
        placeholder="Search hadiths..."
        onChange={(e) => setResults(muslim.search(e.target.value, 10))}
      />
      {results.map((h) => (
        <p key={h.id}>{h.english.text}</p>
      ))}
    </>
  );
}
```

> Data is fetched from jsDelivr CDN once and cached globally. All components share the same request — no duplicates.

---

## 🐍 Python

The Python API is **identical** to the npm package — same camelCase method names, same behaviour.

```python
from sahih_muslim import Muslim

muslim = Muslim()   # reads bin/muslim.json if in repo, else fetches from CDN

# Exact same API as JS
muslim.get(1)                          # Hadith | None
muslim.getByChapter(1)                 # list[Hadith]
muslim.search("prayer")                # list[Hadith]
muslim.search("prayer", limit=5)       # list[Hadith] — top 5
muslim.getRandom()                     # Hadith

# Index access & iteration
muslim[0]                              # first hadith
muslim.length                          # 7563
len(muslim)                            # 7563
for h in muslim: print(h.id)

# Array-style methods (matches JS prototype)
muslim.find(lambda h: h.id == 23)
muslim.filter(lambda h: h.chapterId == 1)
muslim.map(lambda h: h.narrator)
muslim.slice(0, 10)

# Metadata
muslim.metadata.english   # {"title": ..., "author": ...}
muslim.chapters           # list[Chapter]
```

### Custom data path

```python
# Use your own muslim.json at any path
muslim = Muslim(data_path="/absolute/path/to/muslim.json")
muslim = Muslim(data_path=Path(__file__).parent / "muslim.json")
```

### Flask API example

```python
from flask import Flask, jsonify, request
from sahih_muslim import Muslim

app = Flask(__name__)
muslim = Muslim()

@app.get("/api/hadith/<int:hadith_id>")
def get_hadith(hadith_id):
    h = muslim.get(hadith_id)
    return jsonify(h.to_dict()) if h else ("Not found", 404)

@app.get("/api/search")
def search():
    return jsonify([h.to_dict() for h in muslim.search(request.args.get("q", ""), limit=20)])
```

---

## 🖥️ CLI

The same `muslim` command works whether installed via **npm** or **pip**.

```bash
# By ID
muslim 1
muslim 2345

# Within a chapter
muslim 23 34

# Language flags
muslim 2345              # English only (default)
muslim 2345 -a           # Arabic only
muslim 2345 --arabic     # Arabic only
muslim 2345 -b           # Arabic + English
muslim 2345 --both       # Arabic + English

# Search
muslim --search "prayer"
muslim --search "fasting" --all    # show all results (default: top 5)

# Chapter listing
muslim --chapter 5

# Random
muslim --random
muslim --random -b

# React hook generator (JS only — run inside your React project)
muslim --react

# Info
muslim --version
muslim --help
```

### Example output

```
════════════════════════════════════════════════════════════
Hadith #1  |  Chapter: 1 — Faith
════════════════════════════════════════════════════════════
Narrator: Yahya bin Yahya

It is narrated on the authority of Amir al-Mu'minin, Abu Hafs
Umar ibn al-Khattab, who said: I heard the Messenger of Allah
(ﷺ) say: "Actions are judged by intentions..."
════════════════════════════════════════════════════════════
```

---

## 🗄️ Monorepo Structure

```
sahih-muslim/
│
├── bin/
│   ├── muslim.json         ← 🔑 SHARED — single source of truth for JS + Python
│   └── index.js            ← JS CLI entry
│
├── chapters/               ← 🔑 SHARED — generated by `node build.mjs`
│   ├── meta.json               used by CDN loader (JS browser) + Python CDN fallback
│   ├── 1.json
│   └── ...
│
├── sahih_muslim/           ← Python package
│   ├── __init__.py
│   ├── muslim.py           ← auto-reads bin/muslim.json
│   └── cli.py
│
├── index.js                ← JS ESM (browser-safe)
├── index.cjs               ← JS CommonJS
├── index.node.js           ← JS Node ESM
├── index.browser.js        ← JS browser / CDN (auto-generated)
├── index.d.ts              ← TypeScript definitions
├── build.mjs               ← generates chapters/ from bin/muslim.json
│
├── package.json            ← npm config
├── pyproject.toml          ← Python / Poetry config
├── MANIFEST.in             ← Python sdist: include data, exclude JS
└── .npmignore              ← npm publish: exclude Python files
```

### Shared data — how it works

| File              | Used by                                                     |
| ----------------- | ----------------------------------------------------------- |
| `bin/muslim.json` | JS Node (CJS + ESM) · Python (auto-detected from repo root) |
| `chapters/`       | JS browser CDN fetch · Python CDN fallback                  |

**You never duplicate data.** Both packages read the exact same file.

---

## 📊 API Reference

### Methods

| Method                  | JS  | Python | Returns                    |
| ----------------------- | --- | ------ | -------------------------- |
| `get(id)`               | ✅  | ✅     | `Hadith \| undefined/None` |
| `getByChapter(id)`      | ✅  | ✅     | `Hadith[]`                 |
| `search(query, limit?)` | ✅  | ✅     | `Hadith[]`                 |
| `getRandom()`           | ✅  | ✅     | `Hadith`                   |
| `find(predicate)`       | ✅  | ✅     | `Hadith \| undefined/None` |
| `filter(predicate)`     | ✅  | ✅     | `Hadith[]`                 |
| `map(fn)`               | ✅  | ✅     | `any[]`                    |
| `forEach(fn)`           | ✅  | ✅     | `void/None`                |
| `slice(start, end)`     | ✅  | ✅     | `Hadith[]`                 |

### Properties

| Property   | Type           | Description                 |
| ---------- | -------------- | --------------------------- |
| `length`   | `number / int` | Total hadiths — 7,563       |
| `metadata` | `Metadata`     | Title, author, introduction |
| `chapters` | `Chapter[]`    | All chapters                |

---

## 💡 Examples

<details>
<summary><strong>Seed a MongoDB database (Node.js)</strong></summary>

```javascript
import { MongoClient } from "mongodb";
import muslim from "sahih-muslim";

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
await client
  .db("islam")
  .collection("hadiths")
  .insertMany([...muslim]);
await client.close();
console.log("Seeded", muslim.length, "hadiths");
```

</details>

<details>
<summary><strong>Seed a database (Python)</strong></summary>

```python
from sahih_muslim import Muslim

muslim = Muslim()
records = [h.to_dict() for h in muslim]
# Insert into any DB
print(f"Seeded {len(records)} hadiths")
```

</details>

<details>
<summary><strong>Thematic search</strong></summary>

```python
from sahih_muslim import Muslim

muslim = Muslim()
topics = ["prayer", "charity", "fasting", "knowledge", "patience"]
for topic in topics:
    count = len(muslim.search(topic))
    print(f"{topic:12} → {count} hadiths")
```

</details>

<details>
<summary><strong>Express.js REST API</strong></summary>

```javascript
import express from "express";
import muslim from "sahih-muslim";

const app = express();

app.get("/api/hadith/random", (_, res) => res.json(muslim.getRandom()));
app.get("/api/hadith/:id", (req, res) => {
  const h = muslim.get(parseInt(req.params.id));
  h ? res.json(h) : res.status(404).json({ error: "Not found" });
});
app.get("/api/search", (req, res) =>
  res.json(muslim.search(req.query.q || "")),
);
app.get("/api/chapter/:id", (req, res) =>
  res.json(muslim.getByChapter(parseInt(req.params.id))),
);

app.listen(3000, () => console.log("Running on :3000"));
```

</details>

---

## 🔧 Development

```bash
git clone https://github.com/SENODROOM/sahih-muslim.git
cd sahih-muslim
npm install

# Regenerate chapters/ from bin/muslim.json
node build.mjs

# Publish to npm
npm publish

# Publish to PyPI
pip install build twine
python -m build
python -m twine upload dist/*
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

Licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **📖 Source** — Sahih Muslim, one of the most authentic hadith collections in Islam
- **👨‍🏫 Translations** — By reputable Islamic scholars
- **💚 Inspiration** — The global Muslim community seeking knowledge

---

<div align="center">

### 🌟 If this project helped you, please give it a star!

[![GitHub stars](https://img.shields.io/github/stars/SENODROOM/sahih-muslim?style=for-the-badge&logo=github&logoColor=white&color=f0c040&labelColor=1a1a1a)](https://github.com/SENODROOM/sahih-muslim/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SENODROOM/sahih-muslim?style=for-the-badge&logo=github&logoColor=white&color=8957e5&labelColor=1a1a1a)](https://github.com/SENODROOM/sahih-muslim/fork)

<br />

**Made with ❤️ for the Muslim community · Seeking knowledge together**

[📖 Docs](https://github.com/SENODROOM/sahih-muslim#readme) · [🐛 Issues](https://github.com/SENODROOM/sahih-muslim/issues) · [💬 Discussions](https://github.com/SENODROOM/sahih-muslim/discussions)

</div>
