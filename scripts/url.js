export const getQueryStringParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search)

  const color = urlParams.get(param)
  return color
}

export const setQueryStringParam = (param, value) => {
  const currentParams = new URLSearchParams(window.location.search)
  if (value === null || value === undefined) {
    currentParams.delete(param)
  } else {
    currentParams.set(param, value)
  }
  window.history.replaceState({}, '', `?${currentParams.toString()}`)
}
