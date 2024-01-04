import * as THREE from 'three'
import { scene } from "./canvas"

const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
let darkModeEnabled = darkMode.matches
let wasClicked = false

darkMode.addEventListener('change', function (e) {
    if (e.matches && !darkModeEnabled) {
        switchMode()
    } else if (!e.matches && darkModeEnabled) {
        switchMode()
    }
})

const switchButton = document.getElementById("switch")
if (darkModeEnabled) {
    switchButton.src = "images/sun.svg"
} else {
    switchButton.src = "images/moon.svg"
}
switchButton.addEventListener('click', function (e) {
    wasClicked = true
    switchMode()
})

function switchMode() {
    if (!darkModeEnabled) {
        switchButton.src = "images/sun.svg"
        darkModeEnabled = true
    } else {
        switchButton.src = "images/moon.svg"
        darkModeEnabled = false
    }

    if (wasClicked) {
        const bodyStyle = document.body.style
        const computedStyle = getComputedStyle(document.body)

        const main_color = computedStyle.getPropertyValue("--main_color")
        const secondary_color = computedStyle.getPropertyValue("--secondary_color")

        bodyStyle.setProperty("--secondary_color", main_color)
        bodyStyle.setProperty("--main_color", secondary_color)

        scene.background = new THREE.Color(secondary_color) // not main because we switched them
    }
}