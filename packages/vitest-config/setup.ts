import '@testing-library/jest-dom'

// @ts-ignore no `defined` var in globalThis
if (!globalThis.defined) {
  // add all global shared vars bellow
  // globalThis.MY_ENV = 'value'

  // @ts-ignore no `defined` var in globalThis
  globalThis.defined = true
}
