
uniform float uBigWaveElevation;
uniform vec2 uBigWaveFrequency;
uniform vec2 uBigWaveSpeed;
uniform float uTime;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * uBigWaveFrequency.x + uTime * uBigWaveSpeed.x) * uBigWaveElevation;
    elevation *= sin(modelPosition.z * uBigWaveFrequency.y + uTime * uBigWaveSpeed.y) * uBigWaveElevation;

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}