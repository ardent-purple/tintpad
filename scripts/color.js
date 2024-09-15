const currentColor = new Color('hsv', [31, 67, 100])

export const displayCurrentColor = (element) => {
  element.style.backgroundColor = currentColor.toString({ format: 'hex' })
}

export const saturationUp = (amount = 1) => {
  currentColor.hsv[1] = Math.min(99.9999, currentColor.hsv[1] + amount)
}

export const saturationDown = (amount = 1) => {
  currentColor.hsv[1] = Math.max(0.1, currentColor.hsv[1] - amount)
}

export const hueUp = (amount = 1) => {
  currentColor.hsv[0] += amount
}

export const hueDown = (amount = 1) => {
  currentColor.hsv[0] -= amount
}
