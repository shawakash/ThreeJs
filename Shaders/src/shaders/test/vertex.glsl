// GLSL is close to C
// Typed Language

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute float arandom;
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

// varying float vrandom;

// float func() {
//     float a = 1.0;
//     float b = 2.0;

//     return a+b;
// }

void main() {
    // float fooBar = 0.2225;
    // float fooBar2 = -0.2225;
    // int foo = 4646;
    // int foo2 = -4646;

    // int a = foo2/foo;
    // float b = fooBar * fooBar2;
    
    // Impicit Type casting is not allowed so use arithmetic operation wisely

    // bool fo = true;
    // bool fi = false;


//     vec2 foo = vec2(1.0, 3.0);    // Requires two float values
//     // empty vec2 results into error 
//     vec2 fi = vec2(0.0);          // a single value makes both the value same

//     fi.x = 5.0;
//     fi.y = 6.0;

//     // single operation is performed on both parameters
//     fi *= 5.0;

//     // Vect3

//     vec3 fww = vec3(0.2);
//     fww.x = 56.3;
//     fww.y = 5.3;
//     fww.z = 56.243;

// //  Instead of x, y, z rgb is also supported
// // Xyz and rgb can be mixed also
//     vec3 color = vec3(0);
//     color.r = 0.5;
//     color.g = 0.2;
//     color.b = 0.12;


//     vec2 f1 = vec2(1.0);

//     vec3 f3 = vec3(f1, 3.0);

//     // Swizzle
//     vec2 f2 = f3.xy;

//     // VEc4 - xyzw, rgba

//     // Gl_position contains information regarding the vertex
//     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
//     gl_Position.x += 0.5;
    // gl_Position.y += 0.5;

    // gl_position contains 4 value(vec4) widht, height, depth of the clip and the fourth is perspective of the clip
    // These 4 together is called homogenous coordinates
    // position attribute contains the first three coordinates of the vertex of coordinates(multiple)
    // Then it is converted to vec4 for gl_position is vec4
    // Each matrix will transform the position in order to get final clip space coodinates
    // matrix is uinform here
    // gl_Position is a range space of transformation of position
    // modelMat --> apply transformation of position relative to mesh position, rotation, and scale 
    // viewMat --> is tranformation related to camera(position, fov, ascpect)
    // projectionMatrix  --> projects the coordinates to clip space coordinates
    // model and view matrix can be merged as modelViewMatrix


    // seperatting gives more control
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.10 ;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.10 ;

    modelPosition.z += elevation;
    // modelPosition.z += arandom * 0.1 ;

    vec4 viewPostion = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPostion;

    gl_Position = projectedPosition;

    // Passing a varying
    // vrandom = arandom;
    vElevation = elevation;
    vUv = uv;

    // Hola
}