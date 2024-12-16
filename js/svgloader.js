//This code implements SVG loading
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'

import { scene } from './canvas'
export { load_svg }

// Load the SVG using SVGLoader
const loader = new SVGLoader()

function load_svg(src, scale) {
    const mesh_group = new THREE.Group()

    loader.load(src, (data) => {
        const paths = data.paths
        const min = new THREE.Vector3()
        const max = new THREE.Vector3()

        // Compute global bounds for all shapes
        paths.forEach((path) => {
            const shapes = SVGLoader.createShapes(path)

            shapes.forEach((shape) => {
                const geometry = new THREE.ShapeGeometry(shape)

                // Compute bounding box for this shape
                geometry.computeBoundingBox()
                const boundingBox = geometry.boundingBox

                // Update global min and max
                min.x = Math.min(min.x, boundingBox.min.x)
                min.y = Math.min(min.y, boundingBox.min.y)
                min.z = Math.min(min.z, boundingBox.min.z)

                max.x = Math.max(max.x, boundingBox.max.x)
                max.y = Math.max(max.y, boundingBox.max.y)
                max.z = Math.max(max.z, boundingBox.max.z)
            })
        })

        // Calculate overall center from bounds
        const center = new THREE.Vector3(
            max.x / 1.68,
            max.y / 1.68,
            max.z / 1.68
        )

        let layer_order = 0;
        // Set the center for each shape's geometry
        paths.forEach((path) => {
            const material = new THREE.MeshBasicMaterial({
                color: path.color || 0x000000,
                side: THREE.DoubleSide,
                depthWrite: false,
            })

            const shapes = SVGLoader.createShapes(path)

            shapes.forEach((shape) => {
                const geometry = new THREE.ShapeGeometry(shape)

                // Translate and scale geometry to normalize it
                geometry.translate(-center.x, -center.y, 0) // Center it at (0, 0)
                geometry.scale(scale, scale, scale)        // Normalize size
                geometry.rotateZ(Math.PI) // Rotate it 90 degrees 

                // Create mesh and add it to the group
                const mesh = new THREE.Mesh(geometry, material)
                mesh.renderOrder = layer_order++;
                mesh_group.add(mesh)
            })

            // Optionally, add strokes
            const strokeMaterial = new THREE.LineBasicMaterial({
                color: path.userData.style.stroke || 0x000000, // Stroke color
                side: THREE.DoubleSide,
                depthWrite: false
            });

            path.subPaths.forEach((subPath) => {
                const strokePoints = subPath.getPoints();
                const geometry = new THREE.BufferGeometry().setFromPoints(strokePoints);

                // Same transform change
                geometry.translate(-center.x, -center.y, 0) // Center it at (0, 0)
                geometry.scale(scale, scale, scale)        // Normalize size
                geometry.rotateZ(Math.PI) // Rotate it 90 degrees 

                const line = new THREE.Line(geometry, strokeMaterial);
                line.renderOrder = layer_order++;
                mesh_group.add(line);
            });
        })
    })

    scene.add(mesh_group)
    return mesh_group
}
