

// Varying
varying vec2 vUv;
// vUv or uv goes from 0,0 from left bottom corner to 1,1 to right top corner

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // Varying
    vUv = uv;
}