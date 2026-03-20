"""
sahih_muslim.muslim — Python library for Sahih Muslim.

API mirrors the npm package exactly (camelCase method names):
    muslim = Muslim()
    muslim.get(1)
    muslim.getByChapter(1)
    muslim.search("prayer")
    muslim.getRandom()
    muslim[0]
    muslim.length
    muslim.metadata
    muslim.chapters

Data source priority:
  1. data_path kwarg
  2. data/muslim.json.gz  (repo root — auto-detected)
  3. data/muslim.json     (uncompressed fallback)
  4. jsDelivr CDN         (standalone pip install fallback)
"""
from __future__ import annotations

import gzip
import json
import random
import threading
from pathlib import Path
from typing import Callable, Dict, Iterator, List, Optional, Union

_THIS_DIR       = Path(__file__).parent
_REPO_ROOT      = _THIS_DIR.parent.parent
_INSTALLED_DATA = _THIS_DIR / "data" / "muslim.json.gz"   # inside installed wheel
_SHARED_JSON    = _REPO_ROOT / "data" / "muslim.json.gz"  # repo root (dev mode)
_SHARED_JSON_FB = _REPO_ROOT / "data" / "muslim.json"     # uncompressed fallback

_cache: Dict[str, "_Store"] = {}
_lock  = threading.Lock()


class Hadith:
    def __init__(self, data: dict):
        self._data           = data
        self.id: int         = data.get("id", 0)
        self.chapterId: int  = data.get("chapterId", 0)
        self.arabic: str     = data.get("arabic", "")
        _en                  = data.get("english") or {}
        self.english: dict   = _en
        self.narrator: str   = _en.get("narrator", "")
        self.text: str       = _en.get("text", "")

    def to_dict(self) -> dict: return self._data
    def __repr__(self) -> str:
        p = self.text[:80] + "..." if len(self.text) > 80 else self.text
        return f"<Hadith id={self.id} chapterId={self.chapterId} text={p!r}>"


class Chapter:
    def __init__(self, data: dict):
        self._data        = data
        self.id: int      = data.get("id", 0)
        self.arabic: str  = data.get("arabic", "")
        self.english: str = data.get("english", "")

    def to_dict(self) -> dict: return self._data
    def __repr__(self) -> str: return f"<Chapter id={self.id} english={self.english!r}>"


class Metadata:
    def __init__(self, data: dict):
        self._data         = data
        self.id: int       = data.get("id", 0)
        self.length: int   = data.get("length", 0)
        self.arabic: dict  = data.get("arabic") or {}
        self.english: dict = data.get("english") or {}

    def to_dict(self) -> dict: return self._data
    def __repr__(self) -> str:
        return f"<Metadata title={self.english.get('title')!r} author={self.english.get('author')!r}>"


class _Store:
    def __init__(self, hadiths, chapters, metadata):
        self.hadiths  = hadiths
        self.chapters = chapters
        self.metadata = metadata
        self._by_id: Dict[int, Hadith]            = {h.id: h for h in hadiths}
        self._by_chapter: Dict[int, List[Hadith]] = {}
        for h in hadiths:
            self._by_chapter.setdefault(h.chapterId, []).append(h)


class Muslim:
    """
    Complete Sahih Muslim collection. API identical to the npm package.

    muslim = Muslim()
    muslim = Muslim(data_path="/path/to/muslim.json")
    """

    def __init__(self, data_path: Optional[Union[str, Path]] = None):
        key = _resolve_cache_key(data_path)
        if key not in _cache:
            with _lock:
                if key not in _cache:
                    _cache[key] = _load(data_path)
        self._s = _cache[key]

    @property
    def metadata(self) -> Metadata: return self._s.metadata
    @property
    def chapters(self) -> List[Chapter]: return self._s.chapters
    @property
    def length(self) -> int: return len(self._s.hadiths)

    def get(self, hadith_id: int) -> Optional[Hadith]:
        return self._s._by_id.get(hadith_id)

    def getByChapter(self, chapter_id: int) -> List[Hadith]:
        return self._s._by_chapter.get(chapter_id, [])

    def search(self, query: str, limit: int = 0) -> List[Hadith]:
        q = query.lower()
        r = [h for h in self._s.hadiths if q in h.text.lower() or q in h.narrator.lower()]
        return r[:limit] if limit > 0 else r

    def getRandom(self) -> Hadith:
        return random.choice(self._s.hadiths)

    def find(self, predicate: Callable) -> Optional[Hadith]:
        return next((h for h in self._s.hadiths if predicate(h)), None)

    def filter(self, predicate: Callable) -> List[Hadith]:
        return [h for h in self._s.hadiths if predicate(h)]

    def map(self, fn: Callable) -> list:
        return [fn(h) for h in self._s.hadiths]

    def forEach(self, fn: Callable) -> None:
        for i, h in enumerate(self._s.hadiths): fn(h, i)

    def slice(self, start: int = 0, end: Optional[int] = None) -> List[Hadith]:
        return self._s.hadiths[start:end]

    def __len__(self) -> int: return len(self._s.hadiths)
    def __getitem__(self, index): return self._s.hadiths[index]
    def __iter__(self) -> Iterator[Hadith]: return iter(self._s.hadiths)
    def __repr__(self) -> str: return f"<Muslim hadiths={len(self)} chapters={len(self.chapters)}>"


def _resolve_cache_key(data_path) -> str:
    if data_path is not None: return str(Path(data_path).resolve())
    if _INSTALLED_DATA.exists() or _SHARED_JSON.exists() or _SHARED_JSON_FB.exists():
        return "__shared__"
    return "__cdn__"


def clear_cache(data_path=None) -> None:
    with _lock:
        if data_path is None: _cache.clear()
        else: _cache.pop(str(Path(data_path).resolve()), None)


def _load(data_path=None) -> _Store:
    if data_path is not None:        return _load_from_file(Path(data_path))
    if _INSTALLED_DATA.exists():     return _load_from_file(_INSTALLED_DATA)
    if _SHARED_JSON.exists():        return _load_from_file(_SHARED_JSON)
    if _SHARED_JSON_FB.exists():     return _load_from_file(_SHARED_JSON_FB)
    return _load_from_cdn()


def _load_from_file(path: Path) -> _Store:
    if not path.exists():
        raise FileNotFoundError(f"Data file not found: {path}")
    if path.suffix == '.gz':
        with gzip.open(path, 'rt', encoding='utf-8') as f:
            data = json.load(f)
    else:
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
    if "hadiths" not in data:
        raise ValueError(f"Missing 'hadiths' key in: {path}")
    return _build_store(data)


def _load_from_cdn() -> _Store:
    try:
        import requests
    except ImportError:
        raise RuntimeError(
            "data/muslim.json.gz not found and 'requests' is not installed.\n"
            "Either bundle the data file or run: pip install requests"
        )
    CDN_BASE = "https://cdn.jsdelivr.net/npm/sahih-muslim@1.0.1/data/chapters"
    session  = requests.Session()
    meta     = session.get(f"{CDN_BASE}/meta.json", timeout=30)
    meta.raise_for_status()
    meta_json = meta.json()
    hadiths_raw = []
    for ch in meta_json.get("chapters", []):
        r = session.get(f"{CDN_BASE}/{ch['id']}.json", timeout=30)
        r.raise_for_status()
        hadiths_raw.extend(r.json())
    return _build_store({"metadata": meta_json.get("metadata", {}), "chapters": meta_json.get("chapters", []), "hadiths": hadiths_raw})


def _build_store(data: dict) -> _Store:
    return _Store(
        hadiths  = [Hadith(h)  for h in (data.get("hadiths")  or [])],
        chapters = [Chapter(c) for c in (data.get("chapters") or [])],
        metadata = Metadata(data.get("metadata") or {}),
    )
