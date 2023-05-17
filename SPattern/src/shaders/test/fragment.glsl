
// Varying
varying vec2 vUv;

void main()
{
    // vec4 textureColor = texture2D();
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}