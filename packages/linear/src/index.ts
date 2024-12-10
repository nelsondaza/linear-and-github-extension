export * from './client'
export * from './components'
export * from './hooks'

export const setCompareTitle = (title: string) => {
  const titleNode: HTMLInputElement = document.querySelector('#pull_request_title')
  if (titleNode) {
    titleNode.value = title
  }
}

export const getLinearCodes = (str?: null | string) => {
  const codes = (str || '').match(/([A-Z0-9]{1,7}-\d+)/gim) || []
  return codes
    .map((code) => code.toUpperCase())
    .filter((code, index, array) => array.lastIndexOf(code) === index && !code.startsWith('ISSUE-'))
}
