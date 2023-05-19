
uniform vec3 uWaveDepthColor;
uniform vec3 uWaveSurfaceColor;
uniform vec2 uElevationStrength;

varying float vElevation;

void main() {

    vec3 color = mix(uWaveDepthColor, uWaveSurfaceColor, vElevation * uElevationStrength.x + uElevationStrength.y);

    gl_FragColor = vec4(color, 1.0);
}