
uniform vec3 uWaveDepthColor;
uniform vec3 uWaveSurfaceColor;

varying float vElevation;

void main() {

    vec3 color = mix(uWaveSurfaceColor, uWaveDepthColor,vElevation * 4 .0 + 0.5);

    gl_FragColor = vec4(color, 1.0);
}