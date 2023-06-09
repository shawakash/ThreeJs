import { BlendFunction, Effect } from 'postprocessing'
import { Uniform } from 'three'

// Const - doesn't changes actual with the change in initial
// in   -  creates a copy of actual parameter such that changes in local doesn't affects initial
// out -   changes with the change in local parameter 
// input color contains the color of previous vertex changed with the effect
// outputColor contains what is needed to change in order to carry the effect on


const fragmentShaders = /* glsl */`
    
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;
    uniform vec3 color;

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        // outputColor = vec4(uv, 1.0, 1.0);
        outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);;
    }

`

export default class DrunkEffect extends Effect {

    constructor({ frequency = 2, amplitude = 0.1, blendFunction = BlendFunction.DARKEN, color, speed = 0.1 }) {
        super('DrunkEffect', fragmentShaders, {
            blendFunction,
            uniforms: new Map([
                // ['frequency', new Uniform(frequency)],
                ['frequency', { value: frequency }],
                ['amplitude', { value: amplitude }],
                ['offset', new Uniform(0)],
                ['speed', { value: speed }],
                ['color', { value: color }],
            ])

        })
        console.log(this.uniforms.get('color').value)
    }

    update(renderer, inputBuffer, deltaTime) {
        this.uniforms.get('offset').value += deltaTime * this.uniforms.get('speed').value;
        console.log('Hola')
    }

}