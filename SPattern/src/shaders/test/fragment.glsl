
// Varying
varying vec2 vUv;

void main()
{
    // vec4 textureColor = texture2D();

    // Strength
    float strengthX = vUv.x;
    float strengthY = vUv.y;

    // vUv or uv goes from 0,0 from left bottom corner to 1,1 to right top corner
    // Pattern strenght varies according to uv strenght, with uv.x the pattern strenght varies in x according to the coordinates
    // when applied to certain color say r then intensity of r varies from 0 to 1 in x-direction
    // Similary case with uUv.y;

    //Pattern 4
    // gl_FragColor = vec4(vec3(strengthY), 1.0);

    // Pattern 5
    gl_FragColor = vec4(vec3(1.0 - strengthY), 1.0);
}