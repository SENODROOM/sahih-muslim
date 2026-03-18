export interface HadithEnglish { narrator: string; text: string; }
export interface Hadith { id: number; chapterId: number; arabic: string; english: HadithEnglish; }
export interface Chapter { id: number; arabic: string; english: string; }
export interface Metadata {
  id: number;
  length: number;
  arabic:  { title: string; author: string; introduction: string };
  english: { title: string; author: string; introduction: string };
}
export interface MuslimData { metadata: Metadata; chapters: Chapter[]; hadiths: Hadith[]; }

export interface MuslimInstance extends ArrayLike<Hadith> {
  [index: number]: Hadith;
  readonly length:   number;
  readonly metadata: Metadata;
  readonly chapters: Chapter[];
  get(id: number): Hadith | undefined;
  getByChapter(chapterId: number): Hadith[];
  search(query: string): Hadith[];
  getRandom(): Hadith;
  find(predicate: (h: Hadith) => boolean): Hadith | undefined;
  filter(predicate: (h: Hadith) => boolean): Hadith[];
  map<T>(cb: (h: Hadith, i: number) => T): T[];
  forEach(cb: (h: Hadith, i: number) => void): void;
  slice(start?: number, end?: number): Hadith[];
}

export declare class Muslim {
  constructor(data: MuslimData);
}

export declare function loadMuslim(): Promise<MuslimInstance>;

declare const muslim: MuslimInstance;
export default muslim;
