import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'

const container = document.getElementById('renderer')
let renderer, scene, camera = undefined
let webGLEnabled = false

if (WebGL.isWebGLAvailable() && container != null) {
    renderer = new THREE.WebGLRenderer()
    container.appendChild(renderer.domElement)
	webGLEnabled = true

    const computedStyle = getComputedStyle(container)
    const width = parseInt(computedStyle.width)
    const height = parseInt(computedStyle.height)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000)

    scene.background = new THREE.Color(getComputedStyle(document.body).getPropertyValue("--main_color"))
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)    
} else if(container != null) {
	const warning = WebGL.getWebGLErrorMessage()
	container.appendChild(warning)
}

export {renderer, camera, scene, webGLEnabled}