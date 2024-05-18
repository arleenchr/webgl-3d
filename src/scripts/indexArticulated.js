var state;

const setInitialState = () => {
    state = {
        objects: endObject,
        viewMatrix: {
            // x, y, z
            camera: [0, 0, 1], 
            lookAt: [0, 0, 0], 
            up: [0, 1, 0],
            near: 0.1,
            far: 50,
        },
        selectedObject: null,
        projection: "orthographic", // Default
        phi: 10.0, 
        theta: 5.0,
        material: "Normal",
        radius: 1.0,
    }
}

setInitialState();

var canvas = document.querySelector("#gl-canvas")
const modelInput = document.getElementById("modelFile");
const colorCheckbox = document.getElementById("color-button");

const transX = document.getElementById('translation-x-slider');
const transY = document.getElementById('translation-y-slider');
const transZ = document.getElementById('translation-z-slider');

const rotateX = document.getElementById('rotation-x-slider');
const rotateY = document.getElementById('rotation-y-slider');
const rotateZ = document.getElementById('rotation-z-slider');

const scaleX = document.getElementById('scale-x-slider');
const scaleY = document.getElementById('scale-y-slider');
const scaleZ = document.getElementById('scale-z-slider');

const materialRadio = document.getElementsByName('material');

const cameraProjection = document.getElementById('camera-proj');

const cameraRadius = document.getElementById('radius-slider');

const resetCamera = document.getElementById('reset-camera-button');

let mouseDown = false;
let lastMouseX = null;
let lastMouseY = null;


var program = createProgram(gl, vertex_shader, fragment_shader);

const renderObject = (objects) => {
    objects.forEach(obj => {
        gl.useProgram(program);

        const view = setViewMat(state.viewMatrix);
        
        // Set up the geometry of the object
        const geometry = setObjGeometry(gl, obj.model, view); 
        
        // Set up the transformation matrix
        const transform = obj.worldMatrix;
        
        // Set up the projection matrix
        const projection = setProjectionMat(state.projection, state.viewMatrix.far, state.viewMatrix.near, state.theta, state.phi, state.radius);
        
        console.log("View: ", view);
        console.log("Projection: ", projection);
        // Set the transformation matrix uniform
        const uTransform = gl.getUniformLocation(program, "uTransformationMatrix");
        gl.uniformMatrix4fv(uTransform, false, transform);
        
        // Set the projection matrix uniform
        const uProject = gl.getUniformLocation(program, "uProjectionMatrix");
        gl.uniformMatrix4fv(uProject, false, matrices.multiply(projection, view));
        
        
        // Calculate normal matrix
        var normalMatrix = gl.getUniformLocation(program, "uNormalMatrix");
        let modelMatrix = matrices.multiply(view, transform);
        let nMatrix = matrices.inverse(modelMatrix);
        nMatrix = matrices.transpose(nMatrix);
        
        gl.uniformMatrix4fv(normalMatrix, false, nMatrix);
        
        // Set material of model
        if(state.material == "Normal"){
            setColor(gl, obj.model);
            const vertColor = gl.getAttribLocation(program, "aColor");
            gl.enableVertexAttribArray(vertColor);
            gl.vertexAttribPointer(vertColor, 3, gl.FLOAT, false, 0, 0);
        }
        else if(state.material == "Basic"){
            console.log("ini basicccccc")
        
            var userColor = gl.getUniformLocation(program, "userColor");
            gl.uniform4fv(userColor, [1,0,0,1]);
        
            var reverseLightDirectionLocation = gl.getUniformLocation(
            program,
            "uReverseLightDirection"
            );
        
            normalizeLight = matrices.normalize([0.5, 0.7, 1]);
            console.log("Normalize Light: ", normalizeLight)
            gl.uniform3fv(
                reverseLightDirectionLocation,
                matrices.normalize(normalizeLight)
            );
        }
    
        gl.drawElements(gl.TRIANGLES, geometry.lenFaces, gl.UNSIGNED_SHORT, 0);

        if (obj.children.length > 0) {
            renderObject(obj.children);
        }
    });
}

const renderModel = () => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear canvas first
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Enable face culling
    gl.enable(gl.CULL_FACE);

    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    
    state.objects[0].computeWorldMatrix();

    renderObject(state.objects);
    console.log(state);
}

const setViewMat = (viewMat) => {
    // View setup
    let cameraMat = matrices.identity();
  
    cameraMat = matrices.multiply(
        cameraMat,
        matrices.xRotate(viewMat.lookAt[0])
    );

    cameraMat = matrices.multiply(
        cameraMat,
        matrices.yRotate(viewMat.lookAt[1])
    );

    cameraMat = matrices.multiply(
        cameraMat,
        matrices.zRotate(viewMat.lookAt[2])
    );

    cameraMat = matrices.multiply(
        cameraMat,
        matrices.translate(viewMat.camera[0], viewMat.camera[1], viewMat.camera[2] * 1.5)
    );
  
    // In 4x4 transformation matrix, indices 12, 13, 14 represent x, y, z
    let cameraPos = [cameraMat[12], cameraMat[13], cameraMat[14]];
    console.log("Camera Position: ", cameraPos)
  
    let res = matrices.inverse(matrices.lookAt(cameraPos, [0, 0, 0], viewMat.up));

    console.log("Result View Mat", res);
    return res;
}

const setObjGeometry = (gl, model) => {
    console.log("Model", model);

    // Flatten to be used
    const vertices = new Float32Array(model.vertices.flat(1));

    // -1 to convert to 0-based index since the faces are 1-based index
    const normals = new Float32Array(model.normals.flat(1));
    const faces = new Uint16Array(model.faces.flat(1).map((x) => x - 1));
    
    const vertexBuff = gl.createBuffer();
    if (!vertexBuff) { 
        console.error('Failed to create the buffer object'); 
        return null; 
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuff);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

    var aNormal = gl.getAttribLocation(program, "aNormal");
    gl.enableVertexAttribArray(aNormal);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);

    const faceBuff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuff);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW);
  
    const normalBuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuff);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  
    console.log("LenFaces HOHO:", faces.length);
    return { vertexBuff: vertexBuff, normalBuff: normalBuff, faceBuff: faceBuff, lenFaces: faces.length };
}

const setProjectionMat = (proj, far, near, theta, phi, radius) => {
    const left = -2;
    const right = 2;
    const top = 2;
    const bottom = -2;

    const aspect = canvas.width / canvas.height;
    const fovy = (Math.PI / 180) * 45;

    let farOrthogonal = far;
    let nearOrthogonal = -farOrthogonal;
  
    // Oblique Projection
    if (proj === "oblique") {
        orthoMatrices = matrices.orthographic(left, right, bottom, top, nearOrthogonal, farOrthogonal);
        obliqueMatrices = matrices.oblique(phi, theta, orthoMatrices);

        return matrices.multiply(matrices.scale(1/radius, 1/radius, 1/radius), obliqueMatrices);
    } 
    // Orthographic Projection
    else if (proj === "orthographic") {
        orthoMatrices = matrices.orthographic(left, right, bottom, top, nearOrthogonal, farOrthogonal);

        return matrices.multiply(matrices.scale(1/radius, 1/radius, 1/radius), orthoMatrices);
    } 
    // Perspective Projection
    else {
        return matrices.perspective(fovy, aspect, near, far);
    }
}

// Scene Graph
let graphContainer = document.getElementById('graph-container');
let selectedComponent = null;

function generateSceneGraph (models, level = 0){
    const padding = "padding-left: " + level * 20 + "px;";
    let idx = 0;
    models.forEach((model) => {
        let graphComponent = document.createElement("p");
        graphComponent.className = "graph-component";
        graphComponent.style = padding;
        graphComponent.innerHTML += `
            <p class="graph-component-name">${model.name}</p>`;
        graphComponent.addEventListener("click", () => {
            if (selectedComponent) {
                selectedComponent.classList.remove("selected");
            }
            graphComponent.classList.add("selected");
            selectedComponent = graphComponent;
            state.focus = model;
            state.selectedObject = model;
            console.log("select model")
            console.log(state.selectedObject);
        });
        graphContainer.appendChild(graphComponent);
        if (model.children && model.children.length > 0) {
          generateSceneGraph(model.children, level + 1);
        }
      });
}

generateSceneGraph(state.objects);

// Color
const setColor = (gl, model) => {
    const colorBuffer = gl.createBuffer();
    const colors = new Float32Array(model.colors.flat(1));
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
}

transX.addEventListener('input', () => {
    state.selectedObject.translate[0] = transX.value / 100;
    renderModel();
})

rotateX.addEventListener('input', () => {
    state.selectedObject.rotate[0] = (rotateX.value * Math.PI) / 100;
    renderModel();
})

rotateY.addEventListener('input', () => {
    state.selectedObject.rotate[1] = (rotateY.value * Math.PI) / 100;
    renderModel();
})

/* Rotate Z */
rotateZ.addEventListener('input', () => {
    state.selectedObject.rotate[2] = (rotateZ.value * Math.PI) / 100;
    renderModel();
})

/* Scale X */
scaleX.addEventListener('input', () => {
    state.selectedObject.scale[0] = scaleX.value;
    renderModel();
})

/* Scale Y */
scaleY.addEventListener('input', () => {
    state.selectedObject.scale[1] = scaleY.value;
    renderModel();
})

/* Scale Z */
scaleZ.addEventListener('input', () => {
    state.selectedObject.scale[2] = scaleZ.value;
    renderModel();
})

/* Change Projection */
cameraProjection.addEventListener('change', () => {
    state.projection = cameraProjection.value;
    renderModel();
})

materialRadio.forEach((radio) => {
    radio.addEventListener('change', () => {
        if (radio.value == "Normal") {
            state.selectedObject = state.objects[0];
        }
        else {
            state.selectedObject = state.selectedObject.children[0];
        }
        renderModel();
    })
})

window.onload = () => {
    if (!gl) {
        alert("WebGL not available!");
    } else {
        state.chosenColor = [1, 0, 0];
        state.selectedObject = state.objects[0];
        renderModel();
    }
};