import Sizes from "./utils/Sizes";
import Time from "./utils/Time";

export default class Experience {
    constructor(canvas) {

        // Global Access  --> Through console
        window.experience = this;                // Be carefull

        this.canvas = canvas;
        // console.log('Starting a great Experience, ', this.canvas);

        // Setup
        this.sizes = new Sizes(this.canvas);

        this.sizes.on('resize', () => {            // Listner
            // console.log('I heard a resize')
            this.resize()                         // action taker
        })

        // Time
        this.time = new Time();

        this.time.on('', () => {
            
        })
    }

    resize() {
        // console.log(first)
    }
}