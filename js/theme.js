import * as THREE from 'three'
import { scene, webGLEnabled } from "./canvas"

const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
let darkModeEnabled = darkMode.matches
let wasClicked = false
let wasLoaded = false

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
switchButton.addEventListener('click', function () {
    wasClicked = true
    switchMode()
})

if (localStorage.getItem("theme") == "dark" && !darkModeEnabled) {
    console.log("was run")
    wasLoaded = true
    switchMode()
    wasLoaded = false
}

function switchMode() {
    console.log("switched mode")
    if (!darkModeEnabled) {
        switchButton.src = "images/sun.svg"
        darkModeEnabled = true
        localStorage.setItem("theme", "dark")
    } else {
        switchButton.src = "images/moon.svg"
        darkModeEnabled = false
        localStorage.setItem("theme", "light")
    }

    if (wasClicked || wasLoaded) {
        const bodyStyle = document.body.style
        const computedStyle = getComputedStyle(document.body)

        const main_color = computedStyle.getPropertyValue("--main_color")
        const secondary_color = computedStyle.getPropertyValue("--secondary_color")

        bodyStyle.setProperty("--secondary_color", main_color)
        bodyStyle.setProperty("--main_color", secondary_color)

        if(webGLEnabled) scene.background = new THREE.Color(secondary_color) // not main because we switched them
    } else {
        const computedStyle = getComputedStyle(document.body)
        const main_color = computedStyle.getPropertyValue("--main_color")

        if(webGLEnabled) scene.background = new THREE.Color(main_color)
    }
}
