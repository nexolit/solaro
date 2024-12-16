// Import the necessary Three.js components
import * as THREE from 'three'
import { renderer, camera, scene, webGLEnabled } from './canvas'
import './theme'
import { load_svg } from './svgloader'
import Camera from './camera'

export let mainCamera = undefined
let drone
let robot

if(webGLEnabled) {
    mainCamera = new Camera(renderer, camera, scene, loop)

    drawGrid()
    fetchData()
    drone = load_svg('icons/drone.svg', 0.1)
    drone.position.set(-1, 1, 0)
    robot = load_svg('icons/robot.svg', 0.01)
    robot.position.set(4, 6, 0)
}

console.log(drone)

function loop() {
    if(drone != undefined) {
        drone.rotation.z += 0.05; // Rotate around Z-axis
    }
}

//Fetch the data and do a for loop
function fetchData() {
    let points = []
    points.push(addPoint(0, -2))
    points.push(addPoint(1, 2))
    points.push(addPoint(0, 3))
    points.push(addPoint(0, 5))
    points.push(addPoint(1, 6))
    points.push(addPoint(1, 10))
    points.push(addPoint(5, 10))
    points.push(addPoint(6, 8))
    points.push(addPoint(6, -2))
    points.push(addPoint(0, -2))

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
    const size = 100
    const divisions = size

    const grid = new THREE.GridHelper(size, divisions)

    grid.rotation.x = Math.PI / 2
    grid.position.z = 0

    scene.add(grid)
}
