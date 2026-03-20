"""CLI for sahih-muslim."""
from __future__ import annotations
import argparse, sys, textwrap, time
from .muslim import Muslim

VERSION = "1.1.1"
RESET="[0m";BOLD="[1m";DIM="[2m";GREEN="[32m";YELLOW="[33m"
CYAN="[36m";MAGENTA="[35m";BLUE="[34m";RED="[31m";GRAY="[90m"
def _c(col,t): return f"{col}{t}{RESET}"
bold=lambda t:_c(BOLD,t);green=lambda t:_c(GREEN,t);yellow=lambda t:_c(YELLOW,t)
cyan=lambda t:_c(CYAN,t);magenta=lambda t:_c(MAGENTA,t);gray=lambda t:_c(GRAY,t)
red=lambda t:_c(RED,t);dim=lambda t:_c(DIM,t);blue=lambda t:_c(BLUE,t)
DIV=gray("─"*60);DIV2=gray("═"*60)

def _wrap(text,width=72,indent="  "):
    lines=textwrap.wrap(text,width=width-len(indent))
    return "\n".join(indent+l for l in lines)

def _highlight(text,term):
    if not term: return text
    lower=text.lower();tl=term.lower();out=[];i=0
    while i<len(text):
        idx=lower.find(tl,i)
        if idx==-1: out.append(text[i:]); break
        out.append(text[i:idx]); out.append(f"\x1b[1m\x1b[33m{text[idx:idx+len(term)]}{RESET}"); i=idx+len(term)
    return "".join(out)

def _print_hadith(hadith, chapters_map, *, show_arabic=False, show_english=True):
    chapter=chapters_map.get(hadith.chapterId)
    print(); print(DIV2)
    if show_arabic and not show_english:
        hdr=(bold(magenta(f"حديث #{hadith.id}"))+gray("  |  باب: ")+magenta(str(hadith.chapterId))+(gray(" — ")+magenta(chapter.arabic) if chapter and chapter.arabic else ""))
    else:
        hdr=(bold(cyan(f"Hadith #{hadith.id}"))+gray("  |  Chapter: ")+cyan(str(hadith.chapterId))+(gray(" — ")+yellow(chapter.english) if chapter and chapter.english else ""))
    print("  "+hdr); print(DIV2)
    if show_english:
        if hadith.narrator: print("  "+bold(yellow("Narrator: "))+magenta(hadith.narrator))
        if hadith.text: print(); print(_wrap(hadith.text))
    if show_arabic:
        if show_english: print("\n"+DIV)
        if hadith.arabic: print(); print("  "+magenta(hadith.arabic))
    print(); print(DIV2); print()

def main():
    parser=argparse.ArgumentParser(prog="muslim",description="Sahih Muslim CLI",formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("ids",nargs="*",type=int,metavar="ID")
    parser.add_argument("--search","-s",metavar="QUERY")
    parser.add_argument("--all",action="store_true")
    parser.add_argument("--chapter","-c",type=int,metavar="ID")
    parser.add_argument("--random","-r",action="store_true")
    parser.add_argument("--arabic","-a",action="store_true")
    parser.add_argument("--both","-b",action="store_true")
    parser.add_argument("--version","-v",action="store_true")
    args=parser.parse_args()
    show_arabic=args.arabic or args.both
    show_english=(not args.arabic) or args.both

    if args.version:
        print(f"\n  {bold(cyan('sahih-muslim'))} {gray('v'+VERSION)}\n"); sys.exit(0)

    print(gray("  Loading..."),end="\r",flush=True)
    try: muslim=Muslim()
    except Exception as e: print(red(f"\n  ✗ Failed to load: {e}")); sys.exit(1)
    print(" "*20,end="\r")
    chapters_map={c.id:c for c in muslim.chapters}

    if args.random:
        _print_hadith(muslim.getRandom(),chapters_map,show_arabic=show_arabic,show_english=show_english); sys.exit(0)

    if args.chapter is not None:
        hadiths=muslim.getByChapter(args.chapter); chapter=chapters_map.get(args.chapter)
        if not hadiths: print("\n"+red(f"  No chapter found with id {args.chapter}")+"\n"); sys.exit(1)
        print(); print(DIV2)
        print(bold(cyan(f"  Chapter {args.chapter}"))+(gray(" — ")+yellow(chapter.english) if chapter else ""))
        if chapter and chapter.arabic: print("  "+magenta(chapter.arabic))
        print(gray(f"  {len(hadiths)} hadiths")); print(DIV2)
        for h in hadiths: _print_hadith(h,chapters_map,show_arabic=show_arabic,show_english=show_english)
        sys.exit(0)

    if args.search:
        t0=time.time(); results=muslim.search(args.search); elapsed=int((time.time()-t0)*1000)
        print(); print(DIV2)
        print(bold(cyan("  Search: "))+yellow(f'"{args.search}"')+gray("  —  ")+green(f"{len(results)} results")+gray(f"  ({elapsed}ms)")); print(DIV2)
        if not results: print("\n  "+red("No results.")+"\n"); sys.exit(0)
        limit=len(results) if args.all else min(5,len(results))
        for i,h in enumerate(results[:limit],1):
            ch=chapters_map.get(h.chapterId)
            print(); print(bold(green(f"  #{i}"))+gray(f"  Hadith {h.id}")+gray("  |  Chapter: ")+cyan(str(h.chapterId))+(gray(" — ")+dim(ch.english) if ch else ""))
            if h.narrator: print("  "+bold(yellow("Narrator: "))+magenta(h.narrator))
            if h.text: print(_wrap(_highlight(h.text,args.search)))
            print(DIV)
        if not args.all and len(results)>5:
            print(f"\n  {gray('Showing')} {cyan('5')} {gray('of')} {yellow(str(len(results)))} {gray('results.')}  {bold(blue('Run with --all to see all'))}")
            print(f"  {dim(f'muslim --search \"{args.search}\" --all')}\n")
        sys.exit(0)

    if len(args.ids)==1:
        h=muslim.get(args.ids[0])
        if not h: print("\n  "+red(f"No hadith with id {args.ids[0]}")+"\n"); sys.exit(1)
        _print_hadith(h,chapters_map,show_arabic=show_arabic,show_english=show_english); sys.exit(0)

    if len(args.ids)==2:
        chapter_id,hadith_num=args.ids; in_chapter=muslim.getByChapter(chapter_id)
        if not in_chapter: print("\n  "+red(f"No chapter {chapter_id}")+"\n"); sys.exit(1)
        h=next((x for x in in_chapter if x.id==hadith_num),None)
        if h is None and 1<=hadith_num<=len(in_chapter): h=in_chapter[hadith_num-1]
        if not h: print("\n  "+red(f"No hadith #{hadith_num} in chapter {chapter_id}")+"\n"); sys.exit(1)
        _print_hadith(h,chapters_map,show_arabic=show_arabic,show_english=show_english); sys.exit(0)

    parser.print_help()

if __name__=="__main__":
    main()
