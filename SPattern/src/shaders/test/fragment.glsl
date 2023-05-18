
// Varying
varying vec2 vUv;

#define PI 3.14

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

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

    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));

    // float strength = barX + barY;
    
    
    // Pattern 15

    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.4, mod(vUv.y * 10.0 , 1.0)) * step(0.8, mod(vUv.x * 10.0  + 0.2, 1.0));

    // float strength = barX + barY;
    
    // Pattern 16
    // float strength = abs(vUv.x - 0.5);
    
    // Pattern 17
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    
    // Pattern 18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    
    // Pattern 19

    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    
    // Pattern 20
    // float strength = step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    
    // Pattern 21
    // float strength = floor(vUv.x * 10.0) / 10.0;
    
    // Pattern 22
    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
    
    // Pattern 23
    // float strength = random(vUv);
    
    // Pattern 24
    // vec2 gridUv = vec2(
        // floor(vUv.x * 10.0) / 10.0,
        // floor(vUv.y * 10.0) / 10.0
    // );
    // float strength = random(gridUv);
    
    // Pattern 25
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0
    // );
    // float strength = random(gridUv);
    
    // Pattern 26
    // float strength = sqrt(vUv.y * vUv.y + vUv.x * vUv.x);               // || || length(vUv)
    
    // Pattern 27
    // float strength = length(vUv - 0.5);
    // float strength = distance(vUv, vec2(0.5));
    
    // Pattern 28
    // float strength = 1.0 - distance(vUv, vec2(0.5));
    
    // Pattern 29
    // float strength = 0.015 / distance(vUv, vec2(0.5));
    
    // Pattern 30
    // vec2 lightUv = vec2(
    //     vUv.x * 0.1 + 0.45,
    //     vUv.y * 0.5 + 0.25
    // );
    // float strength = 0.015 / distance(lightUv, vec2(0.5));

    // Pattern 31
    // vec2 lightUvX = vec2(
    //     (vUv.x * 0.1 + 0.45) ,
    //     vUv.y * 0.5 + 0.25
    // );
    // float lightX = 0.025 / distance(lightUvX, vec2(0.5));
    
    // vec2 lightUvY = vec2(
    //     vUv.y * 0.1 + 0.45,
    //     vUv.x * 0.5 + 0.25
    // );
    // float lightY = 0.025 / distance(lightUvY, vec2(0.5));

    // // Pattern 32
    // vec2 rotatevUv = rotate(vUv, PI * 0.25, vec2(.5, .5));

    // vec2 lightUvX = vec2(
    //     (rotatevUv.x * 0.1 + 0.45) ,
    //     rotatevUv.y * 0.5 + 0.25
    // );
    // float lightX = 0.025 / distance(lightUvX, vec2(0.5));
    
    // vec2 lightUvY = vec2(
    //     rotatevUv.y * 0.1 + 0.45,
    //     rotatevUv.x * 0.5 + 0.25
    // );
    // float lightY = 0.025 / distance(lightUvY, vec2(0.5));


    // float strength = lightX * lightY;

    // Pattern 33
    // float strength = step(0.25, distance(vUv, vec2(0.5)));
    
    // Pattern 34
    float strength = abs(distance(vUv, vec2(0.5)) - 0.3);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
    