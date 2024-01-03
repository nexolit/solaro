import * as Controls from './control'

export default class Camera {
    renderer
    camera
    scene

    constructor(renderer, camera, scene) {
        this.renderer = renderer
        this.camera = camera
        this.scene = scene

        // Bind the animate method to the current instance
        this.animate = this.animate.bind(this);

        // Add event listeners for mouse and touch interactions
        renderer.domElement.addEventListener('mousedown', Controls.onMouseDown)
        renderer.domElement.addEventListener('mousemove', Controls.onMouseMove)
        renderer.domElement.addEventListener('mouseup', Controls.onMouseUp)

        renderer.domElement.addEventListener('touchstart', Controls.onTouchStart)
        renderer.domElement.addEventListener('touchmove', Controls.onTouchMove)
        renderer.domElement.addEventListener('touchend', Controls.onTouchEnd)

        renderer.domElement.addEventListener('wheel', Controls.onMouseWheel)
        // Set up the camera position and rendering
        camera.position.z = Controls.currentZoom

        this.animate(this.renderer, this.scene, this.camera)
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
    
    animate() {
        requestAnimationFrame(this.animate)
        this.render()
    }
}
