var state;

// Set initial state for webgl canvas
const setInitialState = () => {
    state = {
        objects: endObject, // Notes: Can be modified to make testing model faster
        selectedObject: null,
        savedColor: {},
        chosenColor: [1, 0, 0],
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
        material: "Basic",
        radius: 1.0,
        lightAmbient: [0.03, 0.03, 0.03, 1],
        materialAmbient: [1, 1, 1, 1],
        materialSpecular: [1, 1, 1, 1],
        shine: 30.0,
        lightDirection: [-1, 1, -1],
    }
}

setInitialState();

var canvas = document.querySelector("#gl-canvas")
const modelInput = document.getElementById("modelFile");
const colorToggle = document.getElementById("color-toggle");

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
const lightAmbient = document.getElementById("light-ambient");
const materialAmbient = document.getElementById("material-ambient");
const materialSpecular = document.getElementById("material-specular");
const materialShininess = document.getElementById("material-shininess");

// TODO: Implement Logic
const diffuseIntensity = document.getElementById("diffuse-intensity");
const normalIntensity = document.getElementById("normal-intensity");
const specularIntensity = document.getElementById("specular-intensity");
const displacementIntensity = document.getElementById("displacement-intensity");

let mouseDown = false;
let lastMouseX = null;
let lastMouseY = null;


var program = createProgram(gl, vertex_shader, fragment_shader_basic);

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
        if(state.material == "Basic"){
            setColor(gl, obj.model);
            const vertColor = gl.getAttribLocation(program, "aColor");
            gl.enableVertexAttribArray(vertColor);
            gl.vertexAttribPointer(vertColor, 3, gl.FLOAT, false, 0, 0);

            var lightAmbient = gl.getUniformLocation(program, "uLightAmbient");
            gl.uniform4fv(lightAmbient, state.lightAmbient);

            var materialAmbient = gl.getUniformLocation(program, "uMaterialAmbient");
            gl.uniform4fv(materialAmbient, state.materialAmbient);
        }
        else if(state.material == "Phong"){
            setColor(gl, obj.model);
            const vertColor = gl.getAttribLocation(program, "aColor");
            gl.enableVertexAttribArray(vertColor);
            gl.vertexAttribPointer(vertColor, 3, gl.FLOAT, false, 0, 0);

            var lightDirection = gl.getUniformLocation(program, "uLightDirection");
            gl.uniform3fv(lightDirection, state.lightDirection);
            
            var lightDiffuse = gl.getUniformLocation(program, "uLightDiffuse");
            gl.uniform4fv(lightDiffuse, [1,1,1,1]);
            
            var lightAmbient = gl.getUniformLocation(program, "uLightAmbient");
            gl.uniform4fv(lightAmbient, state.lightAmbient);

            var lightSpecular = gl.getUniformLocation(program, "uLightSpecular");
            gl.uniform4fv(lightSpecular, [1,1,1,1]);
            
            var materialAmbient = gl.getUniformLocation(program, "uMaterialAmbient");
            gl.uniform4fv(materialAmbient, state.materialAmbient);

            var materialSpecular = gl.getUniformLocation(program, "uMaterialSpecular");
            gl.uniform4fv(materialSpecular, state.materialSpecular);

            var shininess = gl.getUniformLocation(program, "shininess");
            gl.uniform1f(shininess, state.shine);
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

    if (state.objects.length != 0 && state.objects[0].translate && state.objects[0].rotate && state.objects[0].scale) {
        state.objects[0].computeWorldMatrix();
    }
    renderObject(state.objects);
}

document.addEventListener("DOMContentLoaded", () => {
    const selectModelContainer = document.querySelector(".select-model-container");
    const selectTextureContainer = document.querySelector(".select-texture-container");
    const selectButton = document.querySelector(".select-button");
    const selectTextureButton = document.querySelector(".select-texture-button");
    const modelOptions = document.querySelectorAll(".model-option");
    const textureOptions = document.querySelectorAll(".texture-option");
    const selectButtonText = document.querySelector(".select-button-text");
    const selectTextureText =  document.querySelector(".select-texture-text");

    // For Model Loading
    selectButton.addEventListener("click", () => {
        selectModelContainer.classList.toggle("active");
    });

    // For Map Feature
    selectTextureButton.addEventListener("click", () => {
        selectTextureContainer.classList.toggle("active");
    })

    // Models
    modelOptions.forEach(option => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".model-option-text").innerText;
            selectButtonText.innerText = selectedOption;
            selectModelContainer.classList.remove("active");
            
            if (selectedOption === "Cube") {
                state.objects = endObject;
            }
            else if (selectedOption === "Pyramid") {
                state.objects = pyramidObject;
            }
            else if (selectedOption === "Octahedron") {
                state.objects = octahedronObject;
            }
            else if (selectedOption === "Tube") {
                state.objects = tubeObject;
            }
            else if (selectedOption === "Wolf") {
                state.objects = wolfObject;
            }
            else if (selectedOption === "Duck") {
                state.objects = duckObject;
            }
            else if (selectedOption === "Goat"){
                state.objects = goatObject;
            }
            else if (selectedOption === "Perry") {
                state.objects = perryObject;
            }

            state.selectedObject = state.objects[0];
            resetSceneGraph();
            generateSceneGraph(state.objects);
            renderModel();

            modelOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
        });
    });

    // Textures
    textureOptions.forEach(option => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".texture-option-text").innerText;
            selectTextureText.innerText = selectedOption;
            selectTextureContainer.classList.remove("active");

            // TODO: Implement Logic for Maps
            if (selectedOption === "Texture 1") {
                // console.log(selectedOption);
            } else if (selectedOption === "Texture 2") {
                // console.log(selectedOption);
            } else if (selectedOption === "Texture 3") {
                // console.log(selectedOption);
            }
        })
    })
});

// Save colors and turn off the color (turn into greyish)
const saveAndTurnOffColor = (object, path) => {
    // Save the object's colors
    state.savedColor[path] = object.model.colors.map(color => color.slice());

    // Turn the object's colors to greyish color
    for (let i = 0; i < object.model.colors.length; i++) {
        let avgColor = (object.model.colors[i][0] + object.model.colors[i][1] + object.model.colors[i][2]) / 3;
        object.model.colors[i] = [avgColor, avgColor, avgColor];
    }

    // Recursively process children
    for (let j = 0; j < object.children.length; j++) {
        saveAndTurnOffColor(object.children[j], `${path}.child${j}`);
    }
}

// Restore object's original color
function restoreColors(object, path) {
    // Restore the object's colors
    for (let i = 0; i < object.model.colors.length; i++) {
        object.model.colors[i] = state.savedColor[path][i].slice();
    }

    // Recursively process the object's children
    for (let j = 0; j < object.children.length; j++) {
        restoreColors(object.children[j], `${path}.child${j}`);
    }
}

colorToggle.addEventListener("change", () => {
    if (colorToggle.checked) {
        if (state.savedColor != null) {
            restoreColors(state.objects[0], 'parent');
        }
        renderModel();
    } else {
        saveAndTurnOffColor(state.objects[0], 'parent');
        renderModel();
    }
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
  
    let res = matrices.inverse(matrices.lookAt(cameraPos, [0, 0, 0], viewMat.up));

    return res;
}

const setObjGeometry = (gl, model) => {
    // Flatten to be used
    const vertices = new Float32Array(model?.vertices.flat(1));

    // -1 to convert to 0-based index since the faces are 1-based index
    const normals = new Float32Array(model?.normals.flat(1));
    const faces = new Uint16Array(model?.faces.flat(1).map((x) => x - 1));
    
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
        });
        graphContainer.appendChild(graphComponent);
        if (model.children && model.children.length > 0) {
          generateSceneGraph(model.children, level + 1);
        }
      });
}

function resetSceneGraph() {
    graphContainer.innerHTML = "";
}

generateSceneGraph(state.objects);

const setColor = (gl, model) => {
    const colorBuffer = gl.createBuffer();
    const colors = new Float32Array(model?.colors.flat(1));
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
}

/* Translate X */
transX.addEventListener('input', () => {
    state.selectedObject.translate[0] = transX.value / 100;
    // const translationX = document.getElementById('translation-x');
    // translationX.innerText = transX.value;
    renderModel();
})

/* Translate Y */
transY.addEventListener('input', () => {
    state.selectedObject.translate[1] = transY.value / 100;
    // const translationY = document.getElementById('translation-y');
    // translationY.innerText = transY.value;
    renderModel();
})

/* Translate Z */
transZ.addEventListener('input', () => {
    state.selectedObject.translate[2] = -transZ.value / 100;
    // const translationZ = document.getElementById('translation-z');
    // translationZ.innerText = -transZ.value;
    renderModel();
})

/* Rotate X */
rotateX.addEventListener('input', () => {
    state.selectedObject.rotate[0] = (rotateX.value * Math.PI) / 100;
    renderModel();
})

/* Rotate Y */
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

let gravityFeature = false;
let shiftVal = 5;
let jumpHeight = 30;
let gravity = 9.8;

// Model Controller using Keyboard + Simple Physics Engine
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (transX.value > -100) {
                transX.value = Math.max(parseInt(transX.value) - shiftVal, -100);
                state.objects[0].translate[0] = transX.value / 100;
                renderModel();
            }
            break;
        case "ArrowRight":
            if (transX.value < 100) {
                transX.value = Math.min(parseInt(transX.value) + shiftVal, 100);
                state.objects[0].translate[0] = transX.value / 100;
                renderModel();
            }
            break;
        case "ArrowUp":
            if (!gravityFeature) {
                if (transY.value < 100) {
                    transY.value = Math.min(parseInt(transY.value) + shiftVal, 100);
                    state.objects[0].translate[1] = transY.value / 100;
                    renderModel();
                }
            } else {
                // Jumping
                let time = 0;
                let velocity = Math.sqrt(2 * gravity * jumpHeight);
                let jumpInterval = setInterval(function() {
                    time += 1/60; // Increment time
                    velocity -= gravity * time; // Update velocity based on gravity
                    transY.value += velocity; // Update position based on velocity

                    if (transY.value <= 0) { // When the object has landed
                        transY.value = 0;
                        time = 0; // Reset time
                    }

                    if (velocity <= 0 && transY.value <= 0.01) { // Clear interval and reset velocity when object has landed
                        clearInterval(jumpInterval);
                        velocity = Math.sqrt(2 * gravity * jumpHeight); 
                    }

                    state.objects[0].translate[1] = transY.value / 100;
                    renderModel();
                }, 1000/60); // Render 60 times per second
            }
            break;
        case "ArrowDown": 
            if (!gravityFeature) {
                if (transY.value > -100) {
                    transY.value = Math.max(parseInt(transY.value) - shiftVal, -100);
                    state.objects[0].translate[1] = transY.value / 100;
                    renderModel();
                }
            }

            break;
        case "G": // Activate or Deactivate Gravity Feature
            gravityFeature = !gravityFeature;
            break;
    }
}, true);

/* Material */
materialRadio.forEach((radio) => {
    radio.addEventListener('change', () => {
        state.material = radio.value;
        if(state.material == "Basic"){

            lightAmbient.disabled=false;
            materialAmbient.disabled=true;
            materialSpecular.disabled=true;
            materialShininess.disabled=true;
            diffuseIntensity.disabled=true;
            normalIntensity.disabled=true;
            specularIntensity.disabled=true;
            displacementIntensity.disabled=true;

            program = createProgram(gl,vertex_shader, fragment_shader_basic);
        }
        else if(state.material == "Phong"){

            lightAmbient.disabled=false;
            materialAmbient.disabled=false;
            materialSpecular.disabled=false;
            materialShininess.disabled=false;
            diffuseIntensity.disabled=false;
            normalIntensity.disabled=false;
            specularIntensity.disabled=false;
            displacementIntensity.disabled=false;

            program = createProgram(gl,vertex_shader, fragment_shader_phong);
        }
        renderModel();
    })
})

/* Change Light Ambient */
lightAmbient.addEventListener('input', () => {
    state.lightAmbient = [parseFloat(lightAmbient.value), parseFloat(lightAmbient.value), parseFloat(lightAmbient.value), 1.0];
    renderModel();
})


/* Change Material Ambient */
materialAmbient.addEventListener('input', () => {
    state.materialAmbient = [parseFloat(materialAmbient.value), parseFloat(materialAmbient.value), parseFloat(materialAmbient.value), 1.0];
    renderModel();
})

/* Change Material Specualr */
materialSpecular.addEventListener('input', () => {
    state.materialSpecular = [parseFloat(materialSpecular.value), parseFloat(materialSpecular.value), parseFloat(materialSpecular.value), 1.0];
    renderModel();
})

/* Change Material Shininess */
materialShininess.addEventListener('input', () => {
    state.shine = parseFloat(materialShininess.value);
    renderModel();
})

/* Change Projection */
cameraProjection.addEventListener('change', () => {
    state.projection = cameraProjection.value;
    renderModel();
})

// lightX.addEventListener('input', () => {
//     state.lightDirection[0] = lightX.value;
//     renderModel();
// })

// lightY.addEventListener('input', () => {
//     state.lightDirection[1] = lightY.value;
//     renderModel();
// })

// lightZ.addEventListener('input', () => {
//     state.lightDirection[2] = lightZ.value;
//     renderModel();
// })


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
    state.objects[0].rotate[1] += (deltaX * Math.PI) / 500;
    state.objects[0].rotate[0] += (deltaY * Math.PI) / 500;

    previousX = currentX;
    previousY = currentY;

    renderModel();
};

// ANIMATION
const playPauseButton = document.getElementById('play-pause-button');
const fpsInput = document.getElementById('fps-input');
const autoReplayButton = document.getElementById('auto-replay');
const animationSlider = document.getElementById('animation-slider');
const reverseToggle = document.getElementById('reverse-toggle');

let currentTime = 0;
let animationSpeed = 1;
let animationPaused = true;
let desiredFPS = 3; // default
let totalFrames = hollowAnim.frames.length; // Default
let totalAnimationTime = hollowAnim.frames.length / desiredFPS;
let lastFrameTime = performance.now();
let isReversed = false;
let isFPSChanged = false;

playPauseButton.addEventListener('click', toggleAnimation);
fpsInput.addEventListener('input', function() {
    desiredFPS = parseInt(this.value);
    totalAnimationTime = hollowAnim.frames.length / desiredFPS;
    isFPSChanged = true;
    playPauseButton.textContent = "Play Animation";
});

let hollowModel = ["pyramid", "octahedron", "tube", "cube"];
let articulatedModel = ["wolf", "duck", "goat", "perry"];

animationSlider.addEventListener('input', function() {
    currentTime = animationSlider.value;
    animationSlider.max = state.objects[0].frames.length;
    totalAnimationTime = animationSlider.max;

    // Pause Animation
    animationPaused = true;
    playPauseButton.textContent = "Play Animation";
    
    let interpolatedFrame;

    if (hollowModel.includes(state.objects[0].name)) {
        interpolatedFrame = interpolateKeyframes(hollowAnim.frames, currentTime);
        applyTransformations(interpolatedFrame);
    } else {
        interpolatedFrame = interpolateArticulatedFrames(state.objects[0].frames, currentTime);
        applyAnimationToArticulatedModel(state.objects[0]);
        applyTransformationsArticulated(interpolatedFrame);
        // renderModel();
    }

    if (!animationPaused) {
        lastFrameTime = performance.now();
    }
});

reverseToggle.addEventListener('change', function() {
    isReversed = reverseToggle.checked;

    let interpolatedFrame;

    // Hollow Model
    if (hollowModel.includes(state.objects[0].name)) {
        interpolatedFrame = interpolateKeyframes(hollowAnim.frames, currentTime);
        applyTransformations(interpolatedFrame);
    } 
    // Articulated Model
    else { 
        interpolatedFrame = interpolateArticulatedFrames(state.objects[0].frames, currentTime);
        applyAnimationToArticulatedModel(state.objects[0]);
        applyTransformationsArticulated(interpolatedFrame);
    }

    if (isReversed) {
        // Bring slider point to the right
        animationSlider.value = state.objects[0].frames.length;
        if (hollowModel.includes(state.objects[0].name)) {
            currentTime = (totalFrames - 1) / desiredFPS;
        } else {
            currentTime = (totalFrames - 1);
        }
        console.log("current time: ", currentTime);
    } else {
        animationSlider.value = 0;
        currentTime = 0;
    }

    renderModel();
});

function toggleAnimation() {
    if (isFPSChanged) {
        animationPaused = true;
        isFPSChanged = false;
    }

    animationPaused = !animationPaused;
    if (!animationPaused) {
        lastFrameTime = performance.now(); // reset frame time on start
        if (isReversed) {
            // Update total frames
            totalFrames = state.objects[0].frames.length;
            animationSlider.max = totalFrames;
            animationSlider.value = animationSlider.max;

            // Set current time to last
            if (hollowModel.includes(state.objects[0].name)) {
                currentTime = (totalFrames - 1) / desiredFPS;
            } else {
                currentTime = (totalFrames - 1);
            }
        }
        animate();
        playPauseButton.textContent = "Pause Animation";
    } else {
        playPauseButton.textContent = "Play Animation";
    }
}

function updateAnimationTime(deltaTime) {
    const delta = deltaTime * animationSpeed;
    if (isReversed) {
        currentTime -= delta;
        if (currentTime < 0) {
            if (autoReplayButton.checked) {
                currentTime += totalAnimationTime;
            } else {
                currentTime = 0;
                animationPaused = true;
                playPauseButton.textContent = "Play Animation";
            }
        } else if (currentTime >= totalAnimationTime) {
            animationPaused = true;
        }
    } else {
        currentTime += delta;
        if (autoReplayButton.checked && totalAnimationTime !== 0) {
            currentTime %= totalAnimationTime;
        } else if (currentTime >= totalAnimationTime) {
            // Animation finished
            animationPaused = true;
            playPauseButton.textContent = "Play Animation";
            currentTime = 0; // reset time
        }
    }

    animationSlider.value = Math.floor((currentTime / totalAnimationTime) * totalFrames);
    // console.log("Current Time: ", currentTime);
    // console.log("Total Animation Time: ", totalAnimationTime);
    // console.log("Total Frames: ", totalFrames);
    // console.log("Slider Value: ", animationSlider.value);
}

function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

// function easeInSine(x) {
//     return 1 - Math.cos((x * Math.PI) / 2);
// }

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

function interpolateKeyframes(frames, currentTime) {
    let prevFrameIndex = Math.floor(currentTime);
    let nextFrameIndex = Math.ceil(currentTime);
    let prevFrame = frames[prevFrameIndex];
    let nextFrame = frames[nextFrameIndex];

    if (!prevFrame || !nextFrame) {
        return null;
    }

    let t = currentTime - prevFrameIndex;
    let easedT = easeOutSine(t);
    // let easedT = easeInSine(t);

    let interpolatedFrame = {
        translate: [
            lerp(prevFrame.keyframe.translation[0], nextFrame.keyframe.translation[0], easedT),
            lerp(prevFrame.keyframe.translation[1], nextFrame.keyframe.translation[1], easedT),
            lerp(prevFrame.keyframe.translation[2], nextFrame.keyframe.translation[2], easedT)
        ],
        rotate: [
            lerp(prevFrame.keyframe.rotation[0], nextFrame.keyframe.rotation[0], easedT),
            lerp(prevFrame.keyframe.rotation[1], nextFrame.keyframe.rotation[1], easedT),
            lerp(prevFrame.keyframe.rotation[2], nextFrame.keyframe.rotation[2], easedT)
        ],
        scale: [
            lerp(prevFrame.keyframe.scale[0], nextFrame.keyframe.scale[0], easedT),
            lerp(prevFrame.keyframe.scale[1], nextFrame.keyframe.scale[1], easedT),
            lerp(prevFrame.keyframe.scale[2], nextFrame.keyframe.scale[2], easedT)
        ]
    };

    return interpolatedFrame;
}

function applyTransformations(animationData) {
    if (!animationData) return;

    state.objects[0].translate = [
        animationData.translate[0] / 100,
        animationData.translate[1] / 100,
        animationData.translate[2] / 100
    ];
    state.objects[0].rotate = [
        animationData.rotate[0] * Math.PI / 100,
        animationData.rotate[1] * Math.PI / 100,
        animationData.rotate[2] * Math.PI / 100
    ]
    state.objects[0].scale = animationData.scale;
    renderModel();
}

function interpolateArticulatedFrames(frames, currentTime) {
    let prevFrameIndex = Math.floor(currentTime);
    let nextFrameIndex = Math.ceil(currentTime);
    let prevFrame = frames[prevFrameIndex];
    let nextFrame = frames[nextFrameIndex];

    if (!prevFrame || !nextFrame) {
        return null;
    }

    let t = currentTime - prevFrameIndex;
    let easedT = easeOutSine(t);

    let interpolatedFrame = {
        translate: [
            lerp(prevFrame.translate[1], nextFrame.translate[1], easedT),
            lerp(prevFrame.translate[0], nextFrame.translate[0], easedT),
            lerp(prevFrame.translate[2], nextFrame.translate[2], easedT)
        ],
        rotate: [
            lerp(prevFrame.rotate[0], nextFrame.rotate[0], easedT),
            lerp(prevFrame.rotate[1], nextFrame.rotate[1], easedT),
            lerp(prevFrame.rotate[2], nextFrame.rotate[2], easedT)
        ],
        scale: [
            lerp(prevFrame.scale[0], nextFrame.scale[0], easedT),
            lerp(prevFrame.scale[1], nextFrame.scale[1], easedT),
            lerp(prevFrame.scale[2], nextFrame.scale[2], easedT)
        ]
    };

    return interpolatedFrame;
}

function applyTransformationsArticulated(animationData) {
    if (!animationData) return;

    // Because the animation data itself is already processed (don't need to divide by anything)
    state.objects[0].translate = [
        animationData.translate[0],
        animationData.translate[1],
        animationData.translate[2]
    ];
    state.objects[0].rotate = [
        animationData.rotate[0],
        animationData.rotate[1],
        animationData.rotate[2]
    ]
    state.objects[0].scale = animationData.scale;
    renderModel();
}

function applyAnimationToArticulatedModel(object) {
    if (object.frames.length != 0) {
        const interpolatedFrame = interpolateArticulatedFrames(object.frames, currentTime);

        // Update animation slider
        totalFrames = object.frames.length;
        animationSlider.max = totalFrames - 1;

        object.translate = [
            interpolatedFrame?.translate[0],
            interpolatedFrame?.translate[1],
            interpolatedFrame?.translate[2]
        ];

        // Notes: Input MUST BE in radian
        object.rotate = [
            interpolatedFrame?.rotate[0],
            interpolatedFrame?.rotate[1],
            interpolatedFrame?.rotate[2]
        ]

        object.scale = interpolatedFrame?.scale;
    }

    if (object.children.length > 0) {
        object.children.forEach(child => {
            applyAnimationToArticulatedModel(child);
        });
    }
}

function animate() {
    if (animationPaused) return;

    const now = performance.now();
    const deltaTime = (now - lastFrameTime) / 1000; // ms to seconds
    lastFrameTime = now;

    updateAnimationTime(deltaTime * desiredFPS);

    if (hollowModel.includes(state.objects[0].name)) {
        const interpolatedFrame = interpolateKeyframes(hollowAnim.frames, currentTime);

        // Update animation slider
        animationSlider.max = totalFrames - 1;
        applyTransformations(interpolatedFrame);
    }
    else {
        totalFrames = state.objects[0].frames.length;
        totalAnimationTime = state.objects[0].frames.length;

        applyAnimationToArticulatedModel(state.objects[0]);
    }

    renderModel();
    requestAnimationFrame(animate);
}

// Model editor
const loadFile = document.getElementById("load-file");
const loadModel = document.getElementById("load-model-button");
const saveModel = document.getElementById("save-model-button");
const addModel = document.getElementById('add-model-button');
const deleteModel = document.getElementById("delete-model-button");

loadFile.addEventListener('change', () => {
    const file = loadFile.files[0];

    if (file) {
        state.objects[0].loadObject(state.selectedObject, file);
    }

    loadFile.value = null;
});

loadModel.addEventListener('click', () => {    
    loadFile.click();
});

saveModel.addEventListener('click', () => {
    state.selectedObject.saveObject();
});

addModel.addEventListener("click", () => {
    state.selectedObject.addDefaultObject();
    resetSceneGraph();
    generateSceneGraph(state.objects);
    renderModel();
});

deleteModel.addEventListener('click', () => {
    // state.objects.forEach(endObject => {
    //     if (endObject === state.selectedObject) {
    //         var ndx = state.objects.indexOf(endObject);
    //         if (ndx >= 0) {
    //             delete state.objects[ndx];
    //             state.objects.splice(ndx, 1);
    //         }
    //     }
    //     else {
    //         endObject.remove(state.selectedObject);
    //     }
    // });

    if (state.objects[0] === state.selectedObject) {
        delete state.objects[0];
        state.objects.splice(0, 1);
    }
    else {
        state.objects[0].remove(state.selectedObject);
    }
    state.selectedObject = null;
    resetSceneGraph();
    generateSceneGraph(state.objects);
    renderModel();
});


window.onload = () => {
    if (!gl) {
        alert("WebGL not available!");
    } else {
        state.chosenColor = [1, 0, 0];
        state.selectedObject = state.objects[0];
        renderModel();
    }
};
  