import { instructionsStart } from './instructions.js'
import { getQueryStringParam, setQueryStringParam } from './url.js'

const root = document.getElementById('root')

const controls = document.getElementById('main-control')
const animations = document.getElementById('animation-control')

const controlAnimationShow = document.getElementById('control-animation')
const controlHelp = document.getElementById('control-help')
const controlShare = document.getElementById('control-share')

const animationBack = document.getElementById('animation-back')
const animationPickItems = [
  ...document.querySelectorAll('.animation-item-pick'),
]
const animationNone = document.getElementById('animation-none')

export let isAnimationControlShown = false
export let isControlShown = false

export const isControlElement = (element) => {
  return Boolean(element.closest('.control'))
}

export const showControl = () => {
  isControlShown = true
  controls.classList.remove('control-hidden')
}

export const hideControl = () => {
  isControlShown = false
  controls.classList.add('control-hidden')
}

export const showAnimation = () => {
  isAnimationControlShown = true
  animations.classList.remove('animation-hidden')
}

export const hideAnimation = () => {
  isAnimationControlShown = false
  animations.classList.add('animation-hidden')
}

const hideControlItem = (element) => {
  element.classList.add('control-item-none')
}

// animation controls
controlAnimationShow.addEventListener('click', () => {
  showAnimation()
  hideControl()
})

animationBack.addEventListener('click', () => {
  hideAnimation()
  showControl()
})

const currentAnimationIndexFromQS = getQueryStringParam('animation')
let currentAnimationIndex =
  currentAnimationIndexFromQS !== null
    ? Number(currentAnimationIndexFromQS)
    : null

const getAnimationClassname = () =>
  currentAnimationIndex === null ? '' : `animation-${currentAnimationIndex}`

if (currentAnimationIndex !== null) {
  animationPickItems[currentAnimationIndex].classList.add(
    'animation-item-picked'
  )
  root.classList.add(getAnimationClassname())
} else {
  animationNone.classList.add('animation-item-picked')
}

const onAnimationPick = (element) => {
  const oldCn = getAnimationClassname()
  if (oldCn) {
    root.classList.remove(oldCn)
  }

  currentAnimationIndex = element.dataset.animationIndex
    ? Number(element.dataset.animationIndex)
    : null
  setQueryStringParam('animation', currentAnimationIndex)

  const newCn = getAnimationClassname()
  if (newCn) {
    root.classList.add(newCn)
  }
}

animationPickItems.forEach((element) => {
  element.addEventListener('click', () => {
    animationPickItems.forEach((inactiveElements) => {
      inactiveElements.classList.remove('animation-item-picked')
    })
    element.classList.add('animation-item-picked')

    onAnimationPick(element)
  })
})

// show help
controlHelp.addEventListener('click', () => {
  hideAnimation()
  hideControl()
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
