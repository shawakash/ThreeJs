import Experience from "./Experience";


export default class Camera {
    constructor(experience) {

        // One of the solution
        // this.experience = window.experience;   // To access the fov, pixelRatio from sizes via experience we need experience and it has been declared global;
        // console.log(this.experience)

        // From A Parameter    --> A lot heavy
        // this.experience = experience;
        // console.log(experience)

        // Third solution is Singelton 
        /**
         * A variable is created and intanciated at the very begining of the call of experience
         * If the experience is changed again then we don't send the changed one instead we send the old one
         */
        this.experience = new Experience();
        console.log(this.experience)

    }
}