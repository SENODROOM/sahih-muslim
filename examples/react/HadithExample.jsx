// React example — run `muslim --react` in your project first
import { useState } from 'react';
import { useMuslim } from '../hooks/useMuslim';

export function HadithOfTheDay() {
  const muslim = useMuslim();
  if (!muslim) return <p>Loading...</p>;
  const h = muslim.getRandom();
  return (
    <div>
      <strong>{h.english.narrator}</strong>
      <p>{h.english.text}</p>
      <small>Hadith #{h.id} · Chapter {h.chapterId}</small>
    </div>
  );
}

export function HadithSearch() {
  const muslim = useMuslim();
  const [results, setResults] = useState([]);
  if (!muslim) return <p>Loading...</p>;
  return (
    <>
      <input placeholder="Search hadiths..." onChange={e => setResults(muslim.search(e.target.value, 20))} />
      {results.map(h => <div key={h.id}><strong>{h.english.narrator}</strong><p>{h.english.text}</p></div>)}
    </>
  );
}
