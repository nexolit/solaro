// Import the necessary Three.js components
import * as THREE from 'three'

import './canvas'
import './theme'
import { renderer, camera, scene } from './canvas'
import Camera from './camera'

export const mainCamera = new Camera(renderer, camera, scene)

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

drawGrid()
fetchData()
