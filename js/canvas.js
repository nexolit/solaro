import * as THREE from 'three'

const container = document.getElementById('renderer')
const renderer = new THREE.WebGLRenderer()
container.appendChild(renderer.domElement)

const computedStyle = getComputedStyle(container)
const width = parseInt(computedStyle.width)
const height = parseInt(computedStyle.height)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000)

scene.background = new THREE.Color(getComputedStyle(document.body).getPropertyValue("--main_color"))
renderer.setSize(width, height)
renderer.setPixelRatio(window.devicePixelRatio)

export {renderer, camera, scene}