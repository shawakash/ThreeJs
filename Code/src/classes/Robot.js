export default class Robot {                  // Use Pasal Case
    constructor(name, legs) {                // Contructor are called authomateical when an instance is created
        // console.log('Will always be called');
        // name can be used everywhere in constructor but this.name is avaiable everywhere in class
        this.name = name;                 // To use the name in whole class of a particular instance
        this.legs = legs;
        console.log(`I am ${this.name}. Thank You Creater`);
        this.sayHi();           // a method can be called inside another method
    }
    sayHi() {                  // Methods   --> Functions inside class
        console.log(`hoal, my name is ${this.name}. I have ${this.legs} legs.`);
    }
    
} 