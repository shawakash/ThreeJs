import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor() {
        super()
        
        //setup

        this.start = Date.now();
        this.currentTime = this.start;

        this.elapsedTime = 0;
        this.deltaTime = 16;         // May lead to bug if =0

        window.requestAnimationFrame(() => {
            this.tick();
        })
    }

    tick() {
        // console.log('tick')
        // this.currentTime is the time before this animation
        // currentTime is the current Animation Time
        const currentTime = Date.now();
        this.deltaTime = currentTime - this.currentTime;
        this.currentTime = currentTime;
        this.elapsedTime = currentTime - this.start;

        window.requestAnimationFrame(() => {
            this.tick();
        })
    }
}