import {
  displayCurrentColor,
  hueDown,
  hueUp,
  saturationDown,
  saturationUp,
  setColorQueryString,
} from './color.js'
import {
  initInstructionsByTimeout,
  isInstructionShowing,
} from './instructions.js'
import { addTouchCallback } from './touch.js'

const root = document.getElementById('root')
const controls = document.querySelector('.control')

const touchDirections = ['panright', 'panleft', 'panup', 'pandown']
const touchActions = [hueUp, hueDown, saturationUp, saturationDown]

displayCurrentColor(root)

touchDirections.forEach((type, index) => {
  addTouchCallback(type, () => {
    touchActions[index]()
    displayCurrentColor(root)
  })
})

addTouchCallback('panend', () => {
  setColorQueryString()
})

// show controls, but only if there's no instructions
addTouchCallback('tap', () => {
  if (isInstructionShowing) {
    return
  }
  controls.classList.toggle('control-hidden')
  console.log('controls hidden state changed')
})

initInstructionsByTimeout()
