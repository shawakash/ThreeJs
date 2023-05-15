export default class Experience {
    constructor(canvas) {

        // Global Access  --> Through console
        window.experience = this;                // Be carefull

        this.canvas = canvas;
        console.log('Starting a great Experience, ', this.canvas);
    }
}