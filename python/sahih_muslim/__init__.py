"""
sahih-muslim — Complete Sahih Muslim for Python.

from sahih_muslim import Muslim

muslim = Muslim()
muslim.get(1)
muslim.search("prayer")
muslim.getRandom()
muslim.getByChapter(1)
"""
from .muslim import Muslim, Hadith, Chapter, Metadata, clear_cache

__all__     = ["Muslim", "Hadith", "Chapter", "Metadata", "clear_cache"]
__version__ = "1.0.1"
