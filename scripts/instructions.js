import { addTouchCallback, removeTouchCallback } from './touch.js'

const LEFT_RIGHT_IMAGE = '/img/left-right-min.svg'
const LEFT_RIGHT_TEXT_HTML =
  'Swipe left&nbsp;/ right to&nbsp;change hue. Try&nbsp;it!'
const UP_DOWN_IMAGE = '/img/up-down-min.svg'
const UP_DOWN_TEXT_HTML =
  'Swipe up&nbsp;/ down to&nbsp;change saturation. You can try it&nbsp;too!'
const TAP_IMAGE = '/img/tap.svg'
const TAP_TEXT_HTML = 'Tap screen to&nbsp;display options and credits'

const hintImageElement = document.querySelector('.hint-image')
const hintTextElement = document.querySelector('.hint-text')
const hintContinueElement = document.querySelector('.hint-hide-instruction')

export let isInstructionShowing = false

const hideInstructions = () => {
  hintImageElement.classList.add('hide')
  hintTextElement.classList.add('hide')
  hintContinueElement.classList.add('hide')
}

const showInstructions = () => {
  hintImageElement.classList.remove('hide')
  hintTextElement.classList.remove('hide')
  hintContinueElement.classList.remove('hide')
}

const setInstructions = (image, text, dir) => {
  if (image) {
    hintImageElement.src = image
    hintImageElement.classList.remove('hide')
  } else {
    hintImageElement.classList.add('hide')
  }
  hintTextElement.innerHTML = text

  if (dir === 'left-right') {
    hintImageElement.classList.remove('hint-image-up-down')
    hintImageElement.classList.remove('hint-image-tap')
    hintImageElement.classList.add('hint-image-left-right')
  } else if (dir === 'up-down') {
    hintImageElement.classList.remove('hint-image-left-right')
    hintImageElement.classList.remove('hint-image-tap')
    hintImageElement.classList.add('hint-image-up-down')
  } else if (dir === 'tap') {
    hintImageElement.classList.remove('hint-image-left-right')
    hintImageElement.classList.remove('hint-image-up-down')
    hintImageElement.classList.add('hint-image-tap')
  }
}

const INSTRUCTIONS_ACTIONS = [
  () => {
    setInstructions(LEFT_RIGHT_IMAGE, LEFT_RIGHT_TEXT_HTML, 'left-right')
    showInstructions()
  },
  () => {
    hideInstructions()
    setTimeout(() => {
      setInstructions(UP_DOWN_IMAGE, UP_DOWN_TEXT_HTML, 'up-down')
      showInstructions()
    }, 300)
  },
  () => {
    hideInstructions()
    setTimeout(() => {
      setInstructions(TAP_IMAGE, TAP_TEXT_HTML, 'tap')
      showInstructions()
    }, 300)
  },
  () => {
    hideInstructions()
  },
]

const instructionsStart = () => {
  isInstructionShowing = true
  let instructionIndex = 0

  INSTRUCTIONS_ACTIONS[instructionIndex]()
  instructionIndex = 1

  const listInstruction = async () => {
    INSTRUCTIONS_ACTIONS[instructionIndex]()
    instructionIndex = instructionIndex + 1
    if (instructionIndex >= INSTRUCTIONS_ACTIONS.length) {
      isInstructionShowing = false
      removeTouchCallback('tap', listInstruction)
      return
    }
  }

  addTouchCallback('tap', listInstruction)
}

const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30

const checkInstructionTimeout = () => {
  const localStorageInstructionLastOpenedTimestamp = localStorage.getItem(
    'dateInstructionLastOpened'
  )

  return Date.now() - localStorageInstructionLastOpenedTimestamp > MONTH_IN_MS
}

export const initInstructionsByTimeout = () => {
  if (checkInstructionTimeout()) {
    instructionsStart()
    localStorage.setItem('dateInstructionLastOpened', Date.now())
  }
}
