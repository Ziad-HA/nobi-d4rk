
const sounds = {
  click: '/sounds/click.mp3',
  addToCart: '/sounds/add-to-cart.mp3',
}

export function playSound(type = 'click') {
  const audio = new Audio(sounds[type] || sounds.click)
  audio.volume = 0.2
  audio.play().catch(() => {})
}
