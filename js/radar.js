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
    drone = load_svg('icons/drone.svg', 0.1)
    robot = load_svg('icons/robot.svg', 0.01)
    drawGrid()

    database.loadData(onDataRefresh)
}

function loop() {
    if(drone != undefined) {
        drone.rotation.z += 0.05 // Rotate around Z-axis
    }
}

let lines = undefined
//Fetch the data and do a for loop
function onDataRefresh(position_data) {
    const drone_position = position_data.drone
    const robot_position = position_data.robot

    let points = []
    for(let i = 0; i < position_data.X.length; i++) {
        points.push(addPoint(position_data.X[i], position_data.Y[i]))
    }

    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    scene.remove(lines)
    lines = new THREE.Line(geometry, material)
    scene.add(lines)

    drone.position.set(drone_position.X, drone_position.Y, 0)
    robot.position.set(robot_position.X, robot_position.Y, 0)
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
