void main() {

    float strength =  (1.0 - distance(gl_PointCoord, vec2(0.5))) * 5.0;

    gl_FragColor = vec4(vec3(strength), 1.0);
}