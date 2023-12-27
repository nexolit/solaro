// Import the necessary Three.js components
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

// Initialize variables for tracking mouse/touch interactions
let isDragging = false
let previousMouseX, previousMouseY
let touchStartDistance

const zoomSpeed = 0.003
const minZoom = 1
const maxZoom = 15
let currentZoom = 10

// Add event listeners for mouse and touch interactions
renderer.domElement.addEventListener('mousedown', onMouseDown)
renderer.domElement.addEventListener('mousemove', onMouseMove)
renderer.domElement.addEventListener('mouseup', onMouseUp)

renderer.domElement.addEventListener('touchstart', onTouchStart)
renderer.domElement.addEventListener('touchmove', onTouchMove)
renderer.domElement.addEventListener('touchend', onTouchEnd)

renderer.domElement.addEventListener('wheel', onMouseWheel)

const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
let darkModeEnabled = darkMode.matches
let wasClicked = false

darkMode.addEventListener('change', function (e) {
    if (e.matches && !darkModeEnabled) {
        switchMode()
    } else if(!e.matches && darkModeEnabled) {
        switchMode()
    }
});

const switchButton = document.getElementById("switch")
if(darkModeEnabled) {
    switchButton.src = "images/sun.svg"
} else {
    switchButton.src = "images/moon.svg"
}
switchButton.addEventListener('click', function(e) {
    wasClicked = true
    switchMode()
})

function switchMode() {
    if(!darkModeEnabled) {
        switchButton.src = "images/sun.svg"
        darkModeEnabled = true
    } else {
        switchButton.src = "images/moon.svg"
        darkModeEnabled = false
    }

    if(wasClicked) {
        const bodyStyle = document.body.style
        const computedStyle = getComputedStyle(document.body)

        const main_color = computedStyle.getPropertyValue("--main_color")
        const secondary_color = computedStyle.getPropertyValue("--secondary_color")

        bodyStyle.setProperty("--secondary_color", main_color)
        bodyStyle.setProperty("--main_color", secondary_color)

        scene.background = new THREE.Color(secondary_color) // not main because we switched them
    }
}

function onMouseDown(event) {
    renderer.domElement.style.cursor = "grabbing"
    
    isDragging = true
    previousMouseX = event.clientX
    previousMouseY = event.clientY
}

function onMouseMove(event) {
    if (isDragging) {
        const deltaX = ((event.clientX - previousMouseX) / 100) * currentZoom
        const deltaY = ((event.clientY - previousMouseY) / 100) * currentZoom
        camera.position.x -= deltaX
        camera.position.y += deltaY // Invert Y-axis for Three.js
        previousMouseX = event.clientX
        previousMouseY = event.clientY
        render()
    }
}

function onMouseUp() {
    renderer.domElement.style.cursor = "grab"
    isDragging = false
}

function onMouseWheel(event) {
    event.preventDefault()
    currentZoom += event.deltaY * zoomSpeed

    currentZoom = Math.max(minZoom, Math.min(currentZoom, maxZoom))

    camera.position.z = currentZoom
    render()
}

function onTouchStart(event) {
    event.preventDefault()
    isDragging = true
    if(event.touches.length > 1) {
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        touchStartDistance = (touch1.clientX - touch2.clientX) + (touch1.clientY - touch2.clientY)
    } else {
        const touch = event.touches[0]
        previousMouseX = touch.clientX
        previousMouseY = touch.clientY
    }
}

function onTouchMove(event) {
    event.preventDefault()
    if (isDragging) {
        if(event.touches.length > 1) {
            touchZoom(event.touches)
        } else {
            const touch = event.touches[0]
            const deltaX = ((touch.clientX - previousMouseX) / 100) * currentZoom
            const deltaY = ((touch.clientY - previousMouseY) / 100) * currentZoom
            camera.position.x -= deltaX
            camera.position.y += deltaY
            previousMouseX = touch.clientX
            previousMouseY = touch.clientY
        }
        render()
    }
}

function touchZoom(touches) {
    const touch1 = touches[0]
    const touch2 = touches[1]

    const touchCurrentDistance = (touch1.clientX - touch2.clientX) + (touch1.clientY - touch2.clientY)
    
    currentZoom *= touchStartDistance / touchCurrentDistance
    currentZoom = Math.max(minZoom, Math.min(currentZoom, maxZoom))

    camera.position.z = currentZoom

    render()

    touchStartDistance = touchCurrentDistance
}

function onTouchEnd() {
    isDragging = false
}

// Set up the camera position and rendering
camera.position.z = currentZoom

//Fetch the data and do a for loop
function fetchData() {
    let points = []
    points.push(addPoint(1, 2))
    points.push(addPoint(1, 10))
    points.push(addPoint(5, 8))
    points.push(addPoint(5, 2))

    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const lines = new THREE.Line(geometry, material)
    scene.add(lines)
}

function addPoint(x, y) {
    //Draw an image a dot
    return new THREE.Vector2(x, y)
}

function drawGrid() {
    const size = 100;
    const divisions = size;

    const grid = new THREE.GridHelper(size, divisions);

    grid.rotation.x = Math.PI / 2;
    grid.position.z = 0

    scene.add(grid);
}

function animate() {
    requestAnimationFrame(animate)
    render()
}

function render() {
    renderer.render(scene, camera)
}

drawGrid()
fetchData()
animate()
