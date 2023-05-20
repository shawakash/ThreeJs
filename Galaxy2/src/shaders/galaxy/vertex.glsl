
uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    vec4 modalPosition = modelMatrix * vec4(position, 1.0);

    // Spin;
    float angle = atan(modalPosition.x, modalPosition.z);
    float distanceToCenter = length(modalPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.1;

    angle += angleOffset;

    modalPosition.x = distanceToCenter * cos(angle);
    modalPosition.z = distanceToCenter * sin(angle);

    // Randomness

    modalPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modalPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale;    // Fragment size
    gl_PointSize *= ( 1.0 / - viewPosition.z );

    vColor = color;
}