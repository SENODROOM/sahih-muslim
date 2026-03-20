# API Reference — sahih-muslim

## muslim.get(id)
Returns the hadith with the given global ID, or `undefined`/`None`.

## muslim.getByChapter(chapterId)
Returns all hadiths in a chapter as an array.

## muslim.search(query, limit?)
Full-text search. `limit=0` means return all results.

## muslim.getRandom()
Returns a random hadith.

## muslim.find(predicate)
First match. `muslim.find(h => h.id === 23)` / `muslim.find(lambda h: h.id == 23)`

## muslim.filter(predicate)
All matches.

## muslim.map(fn)
Transform each hadith.

## muslim.forEach(fn)
Iterate with index.

## muslim.slice(start, end?)
Slice the collection.

## Properties
- `muslim.length` — total hadiths
- `muslim.metadata` — `{ english: { title, author }, arabic: { title, author } }`
- `muslim.chapters` — array of `{ id, arabic, english }`

## Hadith shape
```json
{ "id": 1, "chapterId": 1, "arabic": "...", "english": { "narrator": "...", "text": "..." } }
```
