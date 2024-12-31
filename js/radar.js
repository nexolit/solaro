// Import the necessary Three.js components
import * as THREE from 'three'
import { renderer, camera, scene, webGLEnabled } from './canvas'
import './theme'
import { load_svg } from './svgloader'
import Camera from './camera'
import FirebaseConnection from './database'

export let mainCamera = undefined
export const database = new FirebaseConnection()

let drone
let robot

if(webGLEnabled) {
    mainCamera = new Camera(renderer, camera, scene, loop)
    drawGrid()
    database.loadData(onDataRefresh)

    drone = load_svg('icons/drone.svg', 0.1)
    drone.position.set(-1, 1, 0)
    robot = load_svg('icons/robot.svg', 0.01)
    robot.position.set(4, 6, 0)
}

function loop() {
    if(drone != undefined) {
        drone.rotation.z += 0.05; // Rotate around Z-axis
    }
}

let lines = undefined
//Fetch the data and do a for loop
function onDataRefresh(positions) {
    let points = []
    for(let i = 0; i < positions.X.length; i++) {
        points.push(addPoint(positions.X[i], positions.Y[i]))
    }

    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    scene.remove(lines)
    lines = new THREE.Line(geometry, material)
    scene.add(lines)
}

function addPoint(x, y) {
    // Make a point from two coordinates 
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
//TODO: Resizing
