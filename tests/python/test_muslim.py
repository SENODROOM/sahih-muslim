# Python tests — run: python -m pytest tests/python/
import pytest
from sahih_muslim import Muslim

@pytest.fixture(scope="module")
def muslim(): return Muslim()

def test_has_hadiths(muslim):      assert len(muslim) > 0
def test_get_by_id(muslim):        h = muslim.get(1); assert h is not None; assert h.id == 1
def test_get_missing(muslim):      assert muslim.get(999999) is None
def test_get_by_chapter(muslim):   h = muslim.getByChapter(1); assert len(h) > 0
def test_search(muslim):           assert len(muslim.search("prayer")) > 0
def test_search_limit(muslim):     assert len(muslim.search("prayer", limit=5)) <= 5
def test_random(muslim):           assert muslim.getRandom().id > 0
def test_index(muslim):            assert muslim[0].id > 0
def test_metadata(muslim):         assert muslim.metadata.english.get("title")
def test_chapters(muslim):         assert len(muslim.chapters) > 0
def test_to_dict(muslim):          d = muslim.get(1).to_dict(); assert "id" in d and "english" in d
def test_filter(muslim):           assert all(h.chapterId == 1 for h in muslim.filter(lambda h: h.chapterId == 1))
def test_find(muslim):             h = muslim.find(lambda h: h.id == 1); assert h is not None
def test_slice(muslim):            assert len(muslim.slice(0, 10)) == 10
