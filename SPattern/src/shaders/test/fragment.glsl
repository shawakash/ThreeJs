
// Varying
varying vec2 vUv;

void main() {
    // vec4 textureColor = texture2D();

    // Strength
    float strengthX = vUv.x;
    float strengthY = vUv.y;

    // vUv or uv goes from 0,0 from left bottom corner to 1,1 to right top corner
    // Pattern strenght varies according to uv strenght, with uv.x the pattern strenght varies in x according to the coordinates
    // when applied to certain color say r then intensity of r varies from 0 to 1 in x-direction
    // Similary case with uUv.y;

    //Pattern 4
    // gl_FragColor = vec4(vec3(strengthY), 1.0);

    // Pattern 5
    // gl_FragColor = vec4(vec3(1.0 - strengthY), 1.0);

    // Pattern 6
    // gl_FragColor = vec4(vec3(strengthY), 1.0);

    // Pattern 7
    // gl_FragColor = vec4(vec3(mod(strengthY * 10.0, 1.0)), 1.0);

    // Pattern 8
//     float strength = mod(vUv.y * 10.0, 1.0);

// // Avoid if, ternary operator , not better for performance

//     // strength = strength < 0.5 ? 1.0 : 0.0;

//     strength = step(0.5, strength);     // strength returns 0 if the value inside less than edge or else 1'
//     // Step is more efficient

//     // if(strength < 0.5) {
//     //     strength = 1.0;
//     // } else {
//     //     strength = 0.0;
//     // }

//     gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 9
    // float strength = mod(vUv.y * 10.0, 1.0);

    // strength = step(0.8, strength);     // strength returns 0 if the value inside less than edge or else 1'

    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0);

    // strength = step(0.8, strength);     // strength returns 0 if the value inside less than edge or else 1'

    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 11
    // float subStrength = vUv.x;
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // // strength = step(0.8, strength);

    // // // if(strength == 1.0) {
    // // //     subStrength = vUv.x;
    // // // } else {
    // // //     subStrength = vUv.y;
    // // // }

    // // subStrength = strength == 1.0 ? vUv.x : vUv.y;

    // // strength = mod(subStrength * 10.0, 1.0);
    // // strength = step(0.8, strength);

    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // gl_FragColor = vec4(vec3(strength), 1.0);
    
    
    // Pattern 12
    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength = step(0.8, mod((strength == 1.0 ? vUv.x : vUv.y) * 10.0, 1.0));
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // Pattern 13

    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength -= step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // Pattern 14

    float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));

    float barY = step(0.4, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));

    float strength = barX + barY;

    gl_FragColor = vec4(vec3(strength), 1.0);
}
    