
uniform float uBigWaveElevation;
uniform vec2 uBigWaveFrequency;
uniform float uTime;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * uBigWaveFrequency.x + uTime) * uBigWaveElevation;
    elevation *= sin(modelPosition.z * uBigWaveFrequency.y + uTime) * uBigWaveElevation;

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}