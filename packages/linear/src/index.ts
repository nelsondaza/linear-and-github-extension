export * from './client'
export * from './components'
export * from './hooks'

export const setCompareTitle = (title: string) => {
  const titleNode: HTMLInputElement = document.querySelector('#pull_request_title')
  if (titleNode) {
    titleNode.value = title
  }
}
