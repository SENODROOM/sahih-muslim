# Contributing

## Getting Started

```bash
git clone https://github.com/SENODROOM/sahih-muslim.git
cd sahih-muslim
```

## Project Structure

```
data/muslim.json    ← shared data (JS + Python source of truth)
src/                ← JS source
python/             ← Python source
scripts/            ← build scripts
examples/           ← runnable examples
docs/               ← documentation
tests/              ← test suites
```

## Making Changes

**JS changes** — edit files in `src/`
**Python changes** — edit files in `python/sahih_muslim/`
**Data changes** — edit `data/muslim.json` then run `node scripts/build.mjs`

## Running Tests

```bash
# JS (Node 18+)
node --test tests/js/muslim.test.js

# Python
pip install pytest
python -m pytest tests/python/
```

## Publishing (maintainers only)

Publishing is automatic via GitHub Actions on every GitHub Release.
