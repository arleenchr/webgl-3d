var newModel = {
    colors: [],
    vertices: [],
    faces: [],
    normals: [],
}

var state;

// Set initial state for webgl canvas
const setInitialState = () => {
    state = {
        model: newModel,
        chosenColor: [1, 0, 0],
        transform: {
            // x, y, z
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: [1, 1, 1],
        },
        viewMatrix: {
            // x, y, z
            camera: [0, 0, 1], 
            lookAt: [0, 0, 0], 
            up: [0, 1, 0],
            near: 0.1,
            far: 50,
        },
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

//material 
const lightColor = document.getElementById("light-color");
const lightAmbient = document.getElementById("light-ambient");
const lightSpecular = document.getElementById("light-specular");
const materialColor = document.getElementById("material-color");
const materialAmbient = document.getElementById("material-ambient");
const materialDiffuse = document.getElementById("material-diffuse");

let mouseDown = false;
let lastMouseX = null;
let lastMouseY = null;




var program = createProgram(gl, vertex_shader, fragment_shader);

const renderModel = () => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear canvas first
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Enable face culling
    gl.enable(gl.CULL_FACE);

    // Enable depth testing
    gl.enable(gl.DEPTH_TEST); 

    gl.useProgram(program);

    const view = setViewMat(state.viewMatrix);

    // Set up the geometry of the object
    const geometry = setObjGeometry(gl, state.model, view); 

    // Set up the transformation matrix
    const transform = setTransformMat(state.model, state.transform);

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
        setColor(gl, state.model);
        const vertColor = gl.getAttribLocation(program, "aColor");
        gl.enableVertexAttribArray(vertColor);
        gl.vertexAttribPointer(vertColor, 3, gl.FLOAT, false, 0, 0);
    }
    else if(state.material == "Basic"){
        console.log("ini basicccccc")

        var lightDirection = gl.getUniformLocation(program, "uLightDirection");
        gl.uniform3fv(lightDirection, [0.0, -1.0, 1.0]);

        // Change light ambient to a subtle blue color
        var lightAmbient = gl.getUniformLocation(program, "uLightAmbient");
        gl.uniform4fv(lightAmbient, [0.2, 0.2, 0.6, 1.0]);
    }
    else if(state.material == "Phong"){
        console.log("ini phonggggg")

        var lightDirection = gl.getUniformLocation(program, "uLightDirection");
        gl.uniform3fv(lightDirection, [0.0, -1.0, 1.0]);

        // Change light ambient to a subtle blue color
        //get light ambient
        
        var lightAmbient = gl.getUniformLocation(program, "uLightAmbient");
        gl.uniform4fv(lightAmbient, [0.2, 0.2, 0.6, 1.0]);

        // Change light diffuse to a soft white color
        var lightDiffuse = gl.getUniformLocation(program, "uLightDiffuse");
        gl.uniform4fv(lightDiffuse, [0.8, 0.8, 0.8, 1.0]);

        // Change light specular to a bright blue color
        var lightSpecular = gl.getUniformLocation(program, "uLightSpecular");
        gl.uniform4fv(lightSpecular, [0.3, 0.3, 1.0, 1.0]);

        // Change material ambient to a green color
        var materialAmbient = gl.getUniformLocation(program, "uMaterialAmbient");
        gl.uniform4fv(materialAmbient, [0.0, 0.5, 0.0, 1.0]);

        // Change material diffuse to a yellow-green color
        var materialDiffuse = gl.getUniformLocation(program, "uMaterialDiffuse");
        gl.uniform4fv(materialDiffuse, [0.5, 0.8, 0.1, 1.0]);

        // Change material specular to a subtle white color
        var materialSpecular = gl.getUniformLocation(program, "uMaterialSpecular");
        gl.uniform4fv(materialSpecular, [0.9, 0.9, 0.9, 1.0]);
    }

    gl.drawElements(gl.TRIANGLES, geometry.lenFaces, gl.UNSIGNED_SHORT, 0);
}

// Input model from JSON file
modelInput.addEventListener("change", () => {
    const file = modelInput.files[0];

    // Check file extension
    if (file.type !== "application/json") {
        alert("Wrong file extension! Please upload a file with JSON extension!");
        return;
    }
  
    // Read file
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const color = state.chosenColor;

        // Set initial state
        setInitialState();

        // Clear canvas first
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Load object
        state.model = JSON.parse(text);
        // console.log("Test HOHO", state.model);
        state.chosenColor = color;

        renderModel();
    };
    reader.readAsText(file);    
});

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

const setTransformMat = (model, transform) => {
    // Find centroid
    let centroid = locateCentroid(model.vertices);

    // Initialize with identity matrix first
    let matTransform = matrices.identity();

    matTransform = matrices.multiply(
        matTransform,
        matrices.translate(
            transform.translate[0],
            transform.translate[1],
            transform.translate[2]
        )
    );
  
    matTransform = matrices.multiply(
        matTransform,
        matrices.translate(centroid[0], centroid[1], centroid[2])
    );
  
    matTransform = matrices.multiply(
        matTransform,
        matrices.xRotate(transform.rotate[0])
    );

    matTransform = matrices.multiply(
        matTransform,
        matrices.yRotate(transform.rotate[1])
    );

    matTransform = matrices.multiply(
        matTransform,
        matrices.zRotate(transform.rotate[2])
    );
  
    matTransform = matrices.multiply(
        matTransform,
        matrices.scale(transform.scale[0], transform.scale[1], transform.scale[2])
    );
  
    matTransform = matrices.multiply(
        matTransform,
        matrices.translate(-centroid[0], -centroid[1], -centroid[2])
    );
  
    return matTransform;
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

const setColor = (gl, model) => {
    const colorBuffer = gl.createBuffer();
    const colors = new Float32Array(model.colors.flat(1));
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
}

/* Translate X */
transX.addEventListener('input', () => {
    state.transform.translate[0] = transX.value / 100;
    renderModel();
})

/* Translate Y */
transY.addEventListener('input', () => {
    state.transform.translate[1] = transY.value / 100;
    renderModel();
})

/* Translate Z */
transZ.addEventListener('input', () => {
    state.transform.translate[2] = -transZ.value / 100;
    renderModel();
})

/* Rotate X */
rotateX.addEventListener('input', () => {
    state.transform.rotate[0] = (rotateX.value * Math.PI) / 100;
    renderModel();
})

/* Rotate Y */
rotateY.addEventListener('input', () => {
    state.transform.rotate[1] = (rotateY.value * Math.PI) / 100;
    renderModel();
})

/* Rotate Z */
rotateZ.addEventListener('input', () => {
    state.transform.rotate[2] = (rotateZ.value * Math.PI) / 100;
    renderModel();
})

/* Scale X */
scaleX.addEventListener('input', () => {
    state.transform.scale[0] = scaleX.value;
    renderModel();
})

/* Scale Y */
scaleY.addEventListener('input', () => {
    state.transform.scale[1] = scaleY.value;
    renderModel();
})

/* Scale Z */
scaleZ.addEventListener('input', () => {
    state.transform.scale[2] = scaleZ.value;
    renderModel();
})

/* Material */
materialRadio.forEach((radio) => {
    radio.addEventListener('change', () => {
        state.material = radio.value;
        console.log("Material: ", state.material);
        if(state.material == "Normal"){
            // renderModel();
            const lightColor = document.getElementById("light-color");
            const lightAmbient = document.getElementById("light-ambient");
            const lightSpecular = document.getElementById("light-specular");
            const materialColor = document.getElementById("material-color");
            const materialAmbient = document.getElementById("material-ambient");
            const materialDiffuse = document.getElementById("material-diffuse");

            lightColor.disabled=true;
            lightAmbient.disabled=true;
            lightSpecular.disabled=true;
            materialColor.disabled=true;
            materialAmbient.disabled=true;
            materialDiffuse.disabled=true;

            program = createProgram(gl,vertex_shader, fragment_shader)
        }
        else if(state.material == "Basic"){
            console.log("ini basicc material")
            const lightColor = document.getElementById("light-color");
            const lightAmbient = document.getElementById("light-ambient");
            const lightSpecular = document.getElementById("light-specular");
            const materialColor = document.getElementById("material-color");
            const materialAmbient = document.getElementById("material-ambient");
            const materialDiffuse = document.getElementById("material-diffuse");

            lightColor.disabled=false;
            lightAmbient.disabled=true;
            lightSpecular.disabled=true;
            materialColor.disabled=false;
            materialAmbient.disabled=true;
            materialDiffuse.disabled=true;
            program = createProgram(gl,vertex_shader, fragment_shader_3d);
        }
        else if(state.material == "Phong"){
            console.log("ini phong material")
            const lightColor = document.getElementById("light-color");
            const lightAmbient = document.getElementById("light-ambient");
            const lightSpecular = document.getElementById("light-specular");
            const materialColor = document.getElementById("material-color");
            const materialAmbient = document.getElementById("material-ambient");
            const materialDiffuse = document.getElementById("material-diffuse");

            lightColor.disabled=false;
            lightAmbient.disabled=false;
            lightSpecular.disabled=false;
            materialColor.disabled=false;
            materialAmbient.disabled=false;
            materialDiffuse.disabled=false;
            program = createProgram(gl,vertex_shader, fragment_shader_phong);
        }
        renderModel();
    })
})

/* Change Light Color */
lightColor.addEventListener('input', () => {
    
    var hexColor = lightColor.value;

    var r = parseInt(hexColor.slice(1, 3), 16);
    var g = parseInt(hexColor.slice(3, 5), 16);
    var b = parseInt(hexColor.slice(5, 7), 16);

    var lightDiffuse = gl.getUniformLocation(program, "uLightDiffuse");
    gl.uniform4fv(lightDiffuse, [r,g,b, 1.0]);
    renderModel();
})

/* Change Light Ambient */
lightAmbient.addEventListener('input', () => {
    var lightAmbient = gl.getUniformLocation(program, "uLightAmbient");
    gl.uniform4fv(lightAmbient, [lightAmbient.value, lightAmbient.value, lightAmbient.value, 1.0]); 
    renderModel();
})

/* Change Light Specular */
lightSpecular.addEventListener('input', () => {
    var lightSpecular = gl.getUniformLocation(program, "uLightSpecular");
    gl.uniform4fv(lightSpecular, [lightSpecular.value, lightSpecular.value, lightSpecular.value, 1.0]);
    renderModel();
})

/* Change Material Color */
materialColor.addEventListener('input', () => {
    var hexColor = materialColor.value;

    var r = parseInt(hexColor.slice(1, 3), 16);
    var g = parseInt(hexColor.slice(3, 5), 16);
    var b = parseInt(hexColor.slice(5, 7), 16);

    var materialDiffuse = gl.getUniformLocation(program, "uMaterialDiffuse");
    gl.uniform4fv(materialDiffuse, [r,g,b, 1.0]);
    renderModel();
})

/* Change Material Ambient */
materialAmbient.addEventListener('input', () => {
    var materialAmbient = gl.getUniformLocation(program, "uMaterialAmbient");
    gl.uniform4fv(materialAmbient, [materialAmbient.value, materialAmbient.value, materialAmbient.value, 1.0]); 
    renderModel();
})

/* Change Material Diffuse */
materialSpecular.addEventListener('input', () => {
    var materialSpecular = gl.getUniformLocation(program, "uMaterialSpecular");
    gl.uniform4fv(materialSpecular, [materialSpecular.value, materialSpecular.value, materialSpecular.value, 1.0]);
    renderModel();
})

/* Change Projection */
cameraProjection.addEventListener('change', () => {
    state.projection = cameraProjection.value;
    renderModel();
})

/* Change Camera Radius */
cameraRadius.addEventListener('input', () => {
    if (state.projection === "perspective") {
        state.viewMatrix.camera[2] = 1 + cameraRadius.value / 100;
    }
    else {
        state.radius = 1 + cameraRadius.value / 100;
    }
    renderModel();
})

/* Reset Camera */
resetCamera.addEventListener('click', () => {
    if (state.projection === "perspective") {
        state.viewMatrix.camera[2] = 1;
    }
    else {
        state.radius = 1;
    }

    state.transform.rotate[1] = 0;
    state.transform.rotate[0] = 0;
    cameraRadius.value = 0;
    state.projection = "orthographic";
    cameraProjection.value = "orthographic";
    
    renderModel();
})

/* Rotate Camera with Mouse */
canvas.onmousedown = function(event) {
    mouseDown = true;
    currentX = event.clientX;
    currentY = event.clientY;
};

canvas.onmouseup = function(event) {
    mouseDown = false;
};

canvas.onmousemove = function(event) {
    if (!mouseDown) {
        return;
    }
    let previousX = currentX;
    let previousY = currentY;

    currentX = event.clientX;
    currentY = event.clientY;

    let deltaX = currentX - previousX;
    let deltaY = currentY - previousY;
    state.transform.rotate[1] += (deltaX * Math.PI) / 500;
    state.transform.rotate[0] += (deltaY * Math.PI) / 500;

    previousX = currentX;
    previousY = currentY;

    renderModel();
};


window.onload = () => {
    if (!gl) {
        alert("WebGL not available!");
    } else {
        state.chosenColor = [1, 0, 0];
        renderModel();
    }
};
  