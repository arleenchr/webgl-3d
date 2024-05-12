const fs = require('fs');
const vectors = require('./vector.js');

const createModelSides = (model, arr) => {
    let faces = [];
    let colors = [];
    let vertices = [];

    let arrLen = arr.length;
    let verLen = model.vertices.length;

    // Create inward and outward faces
    for (let i = 0; i < arr.length - 2; i++) {
        faces.push(
            [verLen + 1, verLen + 2 + i, verLen + 3 + i],
            [verLen + 1, verLen + 3 + i, verLen + 2 + i]
        );
    }
  
    // Create random colors
    for (let i = 0; i < arrLen; i++) {
        colors.push([Math.random(), Math.random(), Math.random()]);
    }
  
    // Add arr to vertices
    vertices.push(...arr);

    return { vertices, faces, colors };
}

const create3dModel = (model, vert) => {
    let len = vert.length / 4;

    for (let i = 0; i < len; i++) {
        let x = vert.slice(i * 4, (i + 1) * 4);
        let y = createModelSides(model, x);
    
        model.vertices.push(...y.vertices);
        model.faces.push(...y.faces);
        model.colors.push(...y.colors);
    }
  
    let faceLen = model.faces.length;
    let normals = Array(faceLen).fill([]);

    for (let i = 0; i < faceLen; i++) {
        let selectedFaces = model.faces[i];
        selectedFaces = selectedFaces.map((x) => x - 1);
    
        let x = model.vertices[selectedFaces[0]];
        let y = model.vertices[selectedFaces[1]];
        let z = model.vertices[selectedFaces[2]];
    
        let selectedArr = [x, y, z];
        let normal = vectors.calculateNormal(selectedArr);

        for (let i = 0; i < 3; i++) {
            let selectedIdx = selectedFaces[i];
            normals[selectedIdx] = normal;
        }
    }
    model.normals = normals;
}

// TODO:
//  1) Make vertices for cubes
//  2) Make vertices for tetrahedron
//  3) Make vertices for octahedron
//  4) Make vertices for prism

// TODO: Cube Model

// Tetrahedron Model
let tetraVertices = []

// Create the model
let tetraContent = {
    vertices: [],
    faces: [],
    colors: [],
    normals: []
};

// Create the 3D model for tetrahedron
create3dModel(tetraContent, tetraVertices);

// Save the model to a JSON file
fs.writeFile('../models/tetrahedron-model.json', JSON.stringify(tetraContent), (err) => {
    if (err) throw err;
    console.log('The tetrahedron model file has been saved!');
});

// TODO: Octahedron Model

// TODO: Prism Model

