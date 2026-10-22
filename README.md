# Royal Waves Hotel – Next.js (TSX + CSS Modules)

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Scroll-driven hero

The pinned hero scrubs through 381 motion-interpolated frames generated from
`public/6.mov` at 48 fps. The JPEG sprite sheets in `public/hero-frames/` hold
12 frames each. Sheets 21–25 are intentionally omitted and their section
crossfades between the surrounding frames. The remaining sheets are prefetched
as compressed blobs while only nearby decoded images are kept in memory.
