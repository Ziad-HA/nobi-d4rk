// Homepage photos live here. Swap these URLs (or files in /public) for your own shoot.
// Best results: portrait photos on a plain light-grey wall, same lighting across the set.
const u = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const siteImages = {
  // Three full-height photos side by side in the hero (only the middle one shows on phones)
  hero: [
    u('photo-1496360166961-10a51d5f367a'),
    u('photo-1551028719-00167b16eac5'),
    u('photo-1520975916090-3105956dac38'),
  ],
  // Two halves of the category split section
  splitLeft: u('photo-1556821840-3a69f8430e75', 1200),
  splitRight: u('photo-1624378439575-d8705ad7ae80', 1200),
}

export const tickerLines = [
  ['Clean cuts.', 'Heavy cotton.'],
  ['Small runs.', 'No restocks.'],
  ['Limited drops.', 'Honest quality.'],
  ['Made in Alexandria.', 'Worn everywhere.'],
]
