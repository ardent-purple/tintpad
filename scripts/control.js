import { instructionsStart } from './instructions.js'

const controls = document.querySelector('.control')

const controlHelp = document.getElementById('control-help')
const controlShare = document.getElementById('control-share')

export const isControlElement = (element) => {
  return Boolean(element.closest('.control'))
}

export const toggleControlShow = () => {
  controls.classList.toggle('control-hidden')
}

const hideControlItem = (element) => {
  element.classList.add('control-item-none')
}

// show help
controlHelp.addEventListener('click', () => {
  toggleControlShow()
  instructionsStart()
})

// check whether this device has navigator.share
// and disable share control if it does not
if (!navigator.share) {
  hideControlItem(controlShare)
}

controlShare.addEventListener('click', () => {
  const text = `Turn on the color! It's one click away: ${window.location.href}`
  navigator.share({ url: window.location.href, text })
})
