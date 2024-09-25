import {
  displayCurrentColor,
  hueDown,
  hueUp,
  saturationDown,
  saturationUp,
  setColorQueryString,
} from './color.js'
import {
  hideAnimation,
  hideControl,
  isAnimationControlShown,
  isControlElement,
  isControlShown,
  showControl,
} from './control.js'
import {
  checkInstructionTimeout,
  instructionsStart,
  isInstructionShowing,
} from './instructions.js'
import { addTouchCallback } from './touch.js'

const root = document.getElementById('root')

const touchDirections = ['panright', 'panleft', 'panup', 'pandown']
const touchActions = [hueUp, hueDown, saturationUp, saturationDown]

touchDirections.forEach((type, index) => {
  addTouchCallback(type, () => {
    touchActions[index]()
    displayCurrentColor(root)
  })
})

// after setting the color save it to query string
addTouchCallback('panend', () => {
  setColorQueryString()
})

// show controls, but only if there's no instructions
// and we are not clicking on controls
addTouchCallback('tap', ({ target }) => {
  if (isInstructionShowing || isControlElement(target)) {
    return
  }

  if (isAnimationControlShown) {
    hideAnimation()
  } else if (isControlShown) {
    hideControl()
  } else {
    showControl()
  }
})

if (checkInstructionTimeout()) {
  instructionsStart()
}
