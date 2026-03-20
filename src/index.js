// ESM browser-safe entry (class only — no data)
export class Muslim {
  constructor(muslimData) {
    this._hadiths = muslimData.hadiths;
    return new Proxy(this._hadiths, {
      get: (target, prop) => {
        if (!isNaN(prop))   return target[parseInt(prop)];
        if (prop in target) return target[prop];
        switch (prop) {
          case 'metadata':     return muslimData.metadata;
          case 'chapters':     return muslimData.chapters;
          case 'get':          return (id) => this._hadiths.find(h => h.id === id);
          case 'getByChapter': return (id) => this._hadiths.filter(h => h.chapterId === id);
          case 'search':       return (q, limit = 0) => {
            const ql = q.toLowerCase();
            const r  = this._hadiths.filter(h =>
              h.english?.text?.toLowerCase().includes(ql) ||
              h.english?.narrator?.toLowerCase().includes(ql)
            );
            return limit > 0 ? r.slice(0, limit) : r;
          };
          case 'getRandom': return () => this._hadiths[Math.floor(Math.random() * this._hadiths.length)];
          case 'length':    return target.length;
          default:          return target[prop];
        }
      },
      ownKeys: (target) => [
        'length',
        ...Array.from({ length: target.length }, (_, i) => String(i)),
        'metadata', 'chapters', 'get', 'getByChapter', 'search', 'getRandom'
      ]
    });
  }
}
export default Muslim;
