import * as Controls from './control'

export default class Camera {
    renderer
    camera
    scene
    onAnimateCallBack

    constructor(renderer, camera, scene, onAnimateCallBack) {
        this.renderer = renderer
        this.camera = camera
        this.scene = scene
        this.onAnimateCallBack = onAnimateCallBack

        // Bind the animate method to the current instance
        this.animate = this.animate.bind(this)
        this.onAnimateCallBack = this.onAnimateCallBack.bind(this)

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

        this.animate()
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    animate() {
        requestAnimationFrame(this.animate)
        this.onAnimateCallBack()
        this.render()
    }
}
