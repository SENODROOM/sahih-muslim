# CLI Reference — sahih-muslim

```
muslim <hadithId>
muslim <chapterId> <hadithId>
muslim --search "<query>" [--all]
muslim --chapter <id>
muslim --random
muslim --react
muslim --version
muslim --help
```

## Language flags
- (default) — English only
- `-a` / `--arabic` — Arabic only
- `-b` / `--both` — Arabic + English

## Examples
```bash
muslim 1
muslim 2345 -b
muslim --search "prayer" --all
muslim --chapter 1
muslim --random -a
muslim --react
```
