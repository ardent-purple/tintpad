import { instructionsStart } from './instructions.js'

const controls = document.querySelector('.control')

const controlHelp = document.getElementById('control-help')

export const isControlElement = (element) => {
  return Boolean(element.closest('.control'))
}

export const toggleControlShow = () => {
  controls.classList.toggle('control-hidden')
}

controlHelp.addEventListener('click', () => {
  toggleControlShow()
  instructionsStart()
})
