# Royal Waves Hotel – Next.js (TSX + CSS Modules)

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Scroll-driven hero

The pinned hero scrubs through 477 motion-interpolated frames generated from
`public/video.mp4` at 48 fps. The frames are stored as JPEG sprite sheets in
`public/hero-frames/` (12 frames per sheet). If the source video changes,
regenerate the sheets with the same FFmpeg settings and update the frame
constants in `components/Hero.tsx`.
