import  { Effect } from 'postprocessing'

// Const - doesn't changes actual with the change in initial
// in   -  creates a copy of actual parameter such that changes in local doesn't affects initial
// out -   changes with the change in local parameter 
// input color contains the color of previous vertex changed with the effect
// outputColor contains what is needed to change in order to carry the effect on


const fragmentShaders = /* glsl */`
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec2 outpuColor) {
        outputColor = vec4(uv, 1.0, 1.0);
    }
`

export default class DrunkEffect extends Effect {

    constructor() {
        super('DrunkEffect', fragmentShaders, {
            
        })
    }

}