import { addTouchCallback, removeTouchCallback } from './touch.js'

const LEFT_RIGHT_IMAGE = '/img/left-right-min.svg'
const LEFT_RIGHT_TEXT_HTML =
  'Swipe left&nbsp;/ right to&nbsp;change hue. Try&nbsp;it!'
const UP_DOWN_IMAGE = '/img/up-down-min.svg'
const UP_DOWN_TEXT_HTML =
  'Swipe up&nbsp;/ down to&nbsp;change saturation. You can try it&nbsp;too!'

const hintImageElement = document.querySelector('.hint-image')
const hintTextElement = document.querySelector('.hint-text')
const hintHideInstructionsElement = document.querySelector(
  '.hint-hide-instruction'
)

const hideInstructions = () => {
  hintImageElement.classList.add('hide')
  hintTextElement.classList.add('hide')
}

const showInstructions = () => {
  hintImageElement.classList.remove('hide')
  hintTextElement.classList.remove('hide')
}

const setInstructions = (image, text, dir) => {
  hintImageElement.src = image
  hintTextElement.innerHTML = text

  if (dir === 'left-right') {
    hintImageElement.classList.add('hint-image-left-right')
    hintImageElement.classList.remove('hint-image-up-down')
  } else if (dir === 'up-down') {
    hintImageElement.classList.add('hint-image-up-down')
    hintImageElement.classList.remove('hint-image-left-right')
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
    hintHideInstructionsElement.classList.add('hide')
  },
]

const instructionsStart = () => {
  let instructionIndex = 0

  INSTRUCTIONS_ACTIONS[instructionIndex]()
  instructionIndex = 1

  const listInstruction = async () => {
    if (instructionIndex >= INSTRUCTIONS_ACTIONS.length) {
      removeTouchCallback('tap', listInstruction)
      return
    }

    INSTRUCTIONS_ACTIONS[instructionIndex]()
    instructionIndex = instructionIndex + 1
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
