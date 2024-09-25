import { getQueryStringParam, setQueryStringParam } from './url.js'

const DEFAULT_COLOR = '#ffac54'
const QUERY_COLOR = 'color'

const colorFromQueryString = getQueryStringParam(QUERY_COLOR)
const currentColor = new Color(
  colorFromQueryString ? `#${colorFromQueryString}` : DEFAULT_COLOR
)
currentColor.hsv.v = 100 // max brightness by default

export const displayCurrentColor = () => {
  document.body.style.setProperty(
    '--current-color',
    currentColor.toString({ format: 'hex' })
  )
}

export const setColorQueryString = () =>
  setQueryStringParam(
    QUERY_COLOR,
    currentColor.toString({ format: 'hex' }).replace('#', '')
  )

export const saturationUp = (amount = 1) => {
  currentColor.hsv.s = Math.min(99.9999, currentColor.hsv.s + amount)
}

export const saturationDown = (amount = 1) => {
  currentColor.hsv.s = Math.max(0.1, currentColor.hsv.s - amount)
}

export const hueUp = (amount = 1) => {
  currentColor.hsv.h += amount
}

export const hueDown = (amount = 1) => {
  currentColor.hsv.h -= amount
}

// set random factor
setInterval(() => {
  document.body.style.setProperty(
    '--random-hue-factor',
    `${Math.ceil(Math.random() * 360)}deg`
  )
}, 1000)

displayCurrentColor()
