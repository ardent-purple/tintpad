import Hammer from 'hammerjs'

const touchControls = {
  panright: { callbacks: [] },
  panleft: { callbacks: [] },
  panup: { callbacks: [] },
  pandown: { callbacks: [] },
  panend: { callbacks: [] },
  tap: { callbacks: [] },
}

const execCallbacks = (type, ...args) => {
  touchControls[type].callbacks.forEach((callback) => {
    callback(...args)
  })
}

const hammer = new Hammer(document.body)
hammer.off('swipe')
hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, thresshold: 30 })

Object.keys(touchControls).forEach((type) => {
  hammer.on(type, (...args) => {
    execCallbacks(type, ...args)
  })
})

export const addTouchCallback = (type, callback) => {
  touchControls[type]?.callbacks.push(callback)
}

export const removeTouchCallback = (type, callback) => {
  touchControls[type]?.callbacks.splice(
    touchControls[type]?.callbacks.indexOf(callback),
    1
  )
}
