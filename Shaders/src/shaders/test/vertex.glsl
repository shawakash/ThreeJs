// GLSL is close to C
// Typed Language

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
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


    vec2 foo = vec2(1.0, 3.0);    // Requires two float values
    // empty vec2 results into error 
    vec2 fi = vec2(0.0);          // a single value makes both the value same

    fi.x = 5.0;
    fi.y = 6.0;

    // single operation is performed on both parameters
    fi *= 5.0;

    // Vect3

    vec3 fww = vec3(0.2);
    fww.x = 56.3;
    fww.y = 5.3;
    fww.z = 56.243;

//  Instead of x, y, z rgb is also supported
// Xyz and rgb can be mixed also
    vec3 color = vec3(0);
    color.r = 0.5;
    color.g = 0.2;
    color.b = 0.12;


    vec2 f1 = vec2(1.0);

    vec3 f3 = vec3(f1, 3.0);

    // Swizzle
    vec2 f2 = f3.xy;

    // VEc4 - xyzw, rgba

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    // Hola
}