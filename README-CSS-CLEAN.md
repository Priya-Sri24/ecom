Quick CSS control-character cleanup

Run the included Node script to remove BOM, zero-width and non-breaking spaces from all CSS files under `assets/css`.

Usage:

```bash
# from project root
node scripts/clean-css-control-chars.js
```

What it does:
- Removes U+FEFF (BOM), U+200B (zero-width space), U+00A0 (NBSP → normal space), and U+FFFD (replacement) from CSS files.
- Overwrites files in-place; create a git commit or backup first if you want to review changes.

If you prefer I can run this for you — tell me to execute it and I'll run the script here (if allowed).