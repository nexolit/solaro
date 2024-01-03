import { renderer, camera } from './canvas'

// Initialize variables for tracking mouse/touch interactions
export let isDragging = false
export let previousMouseX, previousMouseY
export let touchStartDistance

export const zoomSpeed = 0.003
export const minZoom = 1
export const maxZoom = 15
export let currentZoom = 10

export function onMouseDown(event) {
    renderer.domElement.style.cursor = "grabbing"

    isDragging = true
    previousMouseX = event.clientX
    previousMouseY = event.clientY
}

export function onMouseMove(event) {
    if (isDragging) {
        const deltaX = ((event.clientX - previousMouseX) / 100) * currentZoom
        const deltaY = ((event.clientY - previousMouseY) / 100) * currentZoom
        camera.position.x -= deltaX
        camera.position.y += deltaY // Invert Y-axis for Three.js
        previousMouseX = event.clientX
        previousMouseY = event.clientY
    }
}

export function onMouseUp() {
    renderer.domElement.style.cursor = "grab"
    isDragging = false
}

export function onMouseWheel(event) {
    event.preventDefault()
    currentZoom += event.deltaY * zoomSpeed

    currentZoom = Math.max(minZoom, Math.min(currentZoom, maxZoom))

    camera.position.z = currentZoom
}

export function onTouchStart(event) {
    event.preventDefault()
    isDragging = true
    if (event.touches.length > 1) {
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        touchStartDistance = (touch1.clientX - touch2.clientX) + (touch1.clientY - touch2.clientY)
    } else {
        const touch = event.touches[0]
        previousMouseX = touch.clientX
        previousMouseY = touch.clientY
    }
}

export function onTouchMove(event) {
    event.preventDefault()
    if (isDragging) {
        if (event.touches.length > 1) {
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

    }
}

export function touchZoom(touches) {
    const touch1 = touches[0]
    const touch2 = touches[1]

    const touchCurrentDistance = (touch1.clientX - touch2.clientX) + (touch1.clientY - touch2.clientY)

    currentZoom *= touchStartDistance / touchCurrentDistance
    currentZoom = Math.max(minZoom, Math.min(currentZoom, maxZoom))

    camera.position.z = currentZoom


    touchStartDistance = touchCurrentDistance
}

export function onTouchEnd() {
    isDragging = false
}