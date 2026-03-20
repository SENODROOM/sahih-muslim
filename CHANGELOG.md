# Changelog

## [1.0.1] — 2026-03-20

### Added
- Python package published to PyPI (`pip install sahih-muslim`)
- Python API identical to npm — same camelCase method names
- Monorepo structure — single `data/muslim.json.gz` shared by JS and Python
- `data/` folder for all data files
- `src/` for JS source, `types/` for TypeScript, `scripts/` for build
- `python/` for Python source
- `examples/` — Node CJS, Node ESM, React, Express, Flask
- `docs/` — API, CLI, data format documentation
- `tests/` — JS and Python test suites
- `.github/workflows/` — auto-publish to npm and PyPI on GitHub release
- `CONTRIBUTING.md`, `CHANGELOG.md`

## [1.0.0] — 2026-01-01

### Added
- Initial release
- 7,563 hadiths with Arabic text and English translations
- `get()`, `search()`, `getRandom()`, `getByChapter()`
- CLI with `--search`, `--chapter`, `--random`, `--react` flags
- React hook generator (`muslim --react`)
- TypeScript definitions
