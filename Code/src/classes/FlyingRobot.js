import Robot from "./Robot";

export default class FlyingRobot extends Robot {            // Inheirtance
    // All those code from Robot is implemented if an instance of FlyingRobot is created;
    constructor(name, legs) {  // Nothing Special The code written Inside Is merged with initial constructor
        super(name, legs);             // Need To use this to overwrite constructor
        // Super is used to refer to parent class
        // super.sayHi();               // to implement the parent class
        console.log(`I am ${this.name}. Thank You To Create Your Destroyer :) `);
    }

    takeOf() {
        console.log(`Have A Good Flight ${this.name}`);
    }

    landing() {
        console.log(`That was a hell off a trip, you ${this.legs} legged bitch`);
    }

    sayHi() {        // Overwriting      --> Every Method other than constructor can be overwritten as this
        console.log('OverWriting SyHi')
    }

}