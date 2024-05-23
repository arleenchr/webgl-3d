// Shaders
const vertex_shader = `
attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;

varying vec4 fragColor;
varying vec3 vNormal;
varying float colorFactor;

uniform float fudgeFactor;
uniform mat4 uTransformationMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

varying vec3 vEyeVec; 

varying vec4 v_color;

void main(void) {
    vec4 transformedPos = uTransformationMatrix * vec4(aPosition, 1.0);
    vec4 transformedNormal = uTransformationMatrix * vec4(aNormal, 1.0);
    vec4 projectedPos = uProjectionMatrix * transformedPos;
    vEyeVec = -vec3(transformedPos);
    if (fudgeFactor < 0.01)
        gl_Position = projectedPos;
    else {
        float zDivider = 1.0 + projectedPos.z * fudgeFactor;
        gl_Position = vec4(projectedPos.xy / zDivider, projectedPos.zw);
    }
  
    vNormal = vec3(uNormalMatrix * vec4(aNormal, 1.0)); 
    fragColor = vec4(aColor, 1.0);    
    colorFactor = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);
    v_color = fragColor;
}
`;

const fragment_shader_phong = `
precision mediump float;

uniform float shininess;
uniform vec3 uLightDirection; 
uniform vec4 uLightAmbient; 
uniform vec4 uLightDiffuse; 
uniform vec4 uLightSpecular;
uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialSpecular;
varying vec4 v_color;
varying vec3 vNormal;
varying vec3 vEyeVec;

void main(void) {
    vec3 L = normalize(uLightDirection); 
    vec3 N = normalize(vNormal); 
    float lambertTerm = dot(N,-L);
    vec4 Ia = uLightAmbient * uMaterialAmbient;
    vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);
    if(lambertTerm > 0.0) {
        Id = uLightDiffuse * v_color * lambertTerm;
        vec3 E = normalize(vEyeVec);
        vec3 R = reflect(-L, N);
        float specular = pow( max(dot(R, E), 0.0), shininess);
        Is = uLightSpecular * uMaterialSpecular * specular * v_color;
    }
    gl_FragColor = Ia + Id + Is;
}

`
const fragment_shader_basic = `
precision mediump float;

uniform vec4 uLightAmbient; 

varying vec4 v_color;

void main() {
   gl_FragColor = uLightAmbient * v_color;
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