
uniform float uSize;
attribute float aScale;



void main() {
    vec4 modalPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modalPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale;    // Fragment size
    gl_PointSize *= ( 1.0 / - viewPosition.z );
}