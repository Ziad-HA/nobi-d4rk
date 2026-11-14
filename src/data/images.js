// Homepage photos live here. Replace these with your own shoot:
//   1. put the files in /public/images (for example /public/images/hero.jpg)
//   2. point the entries below at them: "/images/hero.jpg"
// Mood that fits this layout: dark, grainy, a bit documentary. Landscape for hero + manifesto, portrait for lookbook.
const u = (id, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const siteImages = {
  hero: '/images/hero.png',
  manifesto: u('photo-1496360166961-10a51d5f367a'),
  lookbook: [
    u('photo-1520975916090-3105956dac38', 900),
    u('photo-1556821840-3a69f8430e75', 900),
    u('photo-1624378439575-d8705ad7ae80', 900),
    u('photo-1588850561407-ed78c282e89b', 900),
  ],
}
