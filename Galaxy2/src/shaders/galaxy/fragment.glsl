

void main() {
    float strength = step(0.5, 1.0 - distance(gl_PointCoord, vec2(0.5)));

    gl_FragColor = vec4(vec2(strength * gl_PointCoord), strength, 1.0);
}