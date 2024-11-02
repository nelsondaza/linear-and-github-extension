import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*'],
}

window.addEventListener('load', () => {
  // eslint-disable-next-line no-console
  console.log('GitHub script loaded')
  // eslint-disable-next-line no-console
  console.log(document.location.href)
  // document.body.style.background = "pink"
})
