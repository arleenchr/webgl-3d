// Shaders
const vertex_shader = `
attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;

varying vec4 fragColor;
varying vec4 vNormal;
varying float colorFactor;

uniform float fudgeFactor;
uniform mat4 uTransformationMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

void main(void) {
    vec4 transformedPos = uTransformationMatrix * vec4(aPosition, 1.0);
    vec4 transformedNormal = uTransformationMatrix * vec4(aNormal, 1.0);
    vec4 projectedPos = uProjectionMatrix * transformedPos;
    if (fudgeFactor < 0.01)
        gl_Position = projectedPos;
    else {
        float zDivider = 1.0 + projectedPos.z * fudgeFactor;
        gl_Position = vec4(projectedPos.xy / zDivider, projectedPos.zw);
    }
  
    vNormal = uNormalMatrix * vec4(aNormal, 0.0);
    fragColor = vec4(aColor, 1.0);    
    colorFactor = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);
}
`;

const fragment_shader = `
precision mediump float;
varying vec4 fragColor;

void main(void) {
    gl_FragColor = fragColor;
}
`;

var canvas = document.querySelector("#gl-canvas")
var gl = canvas.getContext("webgl")

if (!gl){
    console.error("Unable to initialize WebGL.")
} else {
    console.log("Initialize successful.")
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Failed to compile shader: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return;
    }
    return shader;
}

function createProgram(gl, vertexShaderText, fragmentShaderText) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("Failed to create program: " + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return;
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("Failed to validate program!", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return;
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
}