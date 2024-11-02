import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://github.com/*"]
}

window.addEventListener("load", () => {
    console.log("GitHub script loaded")
    console.log(document.location.href)
    // document.body.style.background = "pink"
})
