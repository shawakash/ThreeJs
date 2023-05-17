    // Precicision value refers to the extend to which it will color
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

// varying float vrandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    // Applying Texture

    // Texture2d needs a sampler and a coordinate
    // Texture can be imported as uniform from js and coord ie uv can be uploaded from vertexShaders(by attributes from js) as varying

    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 1.5 + 0.70;

    // Gl_FlagColor refers to the rgba color
    // For alpha to work on gl_flagcolor make the transparent true
    // gl_FragColor = vec4(uColor, 1.0);
    gl_FragColor = vec4(textureColor);

}