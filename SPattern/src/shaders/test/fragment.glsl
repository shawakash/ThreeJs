
// Varying
varying vec2 vUv;

void main()
{
    // vec4 textureColor = texture2D();

    // Strength
    float strengthX = vUv.x;
    float strengthY = vUv.y;

    gl_FragColor = vec4(vec3(strengthX), 1.0);
}