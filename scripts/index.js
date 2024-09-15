import {
  displayCurrentColor,
  hueDown,
  hueUp,
  saturationDown,
  saturationUp,
  setColorQueryString,
} from './color.js'
import { addTouchCallback } from './touch.js'

const root = document.getElementById('root')

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
