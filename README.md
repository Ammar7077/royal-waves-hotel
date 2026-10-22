# Royal Waves Hotel – Next.js (TSX + CSS Modules)

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Scroll-driven hero

The pinned hero scrubs through `public/hero-scrub.mp4`, a 48 fps H.264
transcode of `public/6.mov` with short dissolves between scenes and a keyframe
every two frames for responsive, frame-accurate seeking. GSAP ScrollTrigger
coalesces seek updates while a previous decode is in progress.
