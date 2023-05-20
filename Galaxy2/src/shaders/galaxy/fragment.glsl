
varying vec3 vColor;

void main() {

    // Disc Pattern
    // float strength = step(0.5, 1.0 - distance(gl_PointCoord, vec2(0.5)));

    // Diffuse Point Pattern
    // Multiply by 2 as the gradient gets upto one and we were cutting only upto 0.5;
    // float strength =  1.0 - 2.0 * distance(gl_PointCoord, vec2(0.5));

    // Light Point Pattern
    float strength =  (1.0 - distance(gl_PointCoord, vec2(0.5)));
    strength = pow(strength, 10.0);

    //Color
    vec3 finalColor = mix(vec3(0.0), vColor, strength);

    gl_FragColor = vec4(finalColor, 1.0);
}