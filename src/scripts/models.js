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

const generateRandomColors = (verts, color = null) => {
    let resColors = [];

    for (let i = 0; i < vertices.length; i += 3) {
        let temp = color;
        
        if (color != null) { 
            temp = color;
        } else { // If color is currently null, make random color
            temp = [Math.random(), Math.random(), Math.random()];
        }

        resColors.push(temp);
        resColors.push(temp);
        resColors.push(temp);
        resColors.push(temp);
        resColors.push(temp);
        resColors.push(temp);
    }

    return resColors;
}

const generateCuboid = (height, width, depth, origin) => {
    let x_minus = origin[0] - width / 2;
    let x_plus = origin[0] + width / 2;
    let y_minus = origin[1] - height / 2;
    let y_plus = origin[1] + height / 2;
    let z_minus = origin[2] - depth / 2;
    let z_plus = origin[2] + depth / 2;
  
    let vertices = [
        [x_minus, y_minus, z_minus],
        [x_plus, y_minus, z_minus],
        [x_minus, y_plus, z_minus],
        [x_plus, y_plus, z_minus],
        [x_minus, y_minus, z_plus],
        [x_plus, y_minus, z_plus],
        [x_minus, y_plus, z_plus],
        [x_plus, y_plus, z_plus],
    ];
  
    let faces = [
        [1, 3, 2],
        [4, 2, 3],
        [1, 2, 5],
        [6, 5, 2],
        [1, 5, 3],
        [5, 7, 3],
        [2, 4, 6],
        [8, 6, 4],
        [4, 3, 8],
        [7, 8, 3],
        [5, 6, 7],
        [8, 7, 6],
    ];
  
    let normals = vectors.calculateNormal(vertices);
    let colors = generateRandomColors(vertices);
  
    return {
        vertices: vertices,
        faces: faces,
        normals: normals,
        colors: colors,
    }
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
//  2) Make vertices for octahedron
//  3) Make vertices for prism

// TODO: Cube Model

// Pyramid Model
var pyramidVertices = [
    // Base Front
    // Front
    [-0.5, 0.1, 1],
    [-0.5, -0.1, 1],
    [0.5, -0.1, 1],
    [0.5, 0.1, 1],
  
    // Back
    [-0.5, 0.1, 0.8],
    [-0.5, -0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, 0.1, 0.8],

    // Left
    [-0.5, 0.1, 0.8],
    [-0.5, -0.1, 0.8],
    [-0.5, -0.1, 1],
    [-0.5, 0.1, 1],
  
    // Right
    [0.5, -0.1, 0.8],
    [0.5, 0.1, 0.8],
    [0.5, 0.1, 1],
    [0.5, -0.1, 1],
  
    // Top
    [-0.5, 0.1, 0.8],
    [-0.5, 0.1, 1],
    [0.5, 0.1, 1],
    [0.5, 0.1, 0.8],
  
    // Down
    [-0.5, -0.1, 0.8],
    [-0.5, -0.1, 1],
    [0.5, -0.1, 1],
    [0.5, -0.1, 0.8],
  
    // Base Back
    // Front
    [0.5, 0.1, 0.2],
    [-0.5, 0.1, 0.2],
    [-0.5, -0.1, 0.2],
    [0.5, -0.1, 0.2],
  
    // Back
    [0.5, 0.1, 0],
    [-0.5, 0.1, 0],
    [-0.5, -0.1, 0],
    [0.5, -0.1, 0],

    // Left
    [-0.5, -0.1, 0],
    [-0.5, -0.1, 0.2],
    [-0.5, 0.1, 0.2],
    [-0.5, 0.1, 0],
  
    // Right
    [0.5, 0.1, 0],
    [0.5, 0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, -0.1, 0],
  
    // Top
    [-0.5, 0.1, 0],
    [-0.5, 0.1, 0.2],
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0],
  
    // Down
    [-0.5, -0.1, 0],
    [-0.5, -0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, -0.1, 0],

    // Base Left
    // Front
    [-0.5, -0.1, 0.8],
    [-0.3, -0.1, 0.8],
    [-0.3, 0.1, 0.8],
    [-0.5, 0.1, 0.8],
  
    // Back
    [-0.5, -0.1, 0.2],
    [-0.3, -0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [-0.5, 0.1, 0.2],

    // Left
    [-0.5, -0.1, 0.2],
    [-0.5, 0.1, 0.2],
    [-0.5, 0.1, 0.8],
    [-0.5, -0.1, 0.8],
  
    // Right
    [-0.3, -0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [-0.3, 0.1, 0.8],
    [-0.3, -0.1, 0.8],
  
    // Top
    [-0.5, 0.1, 0.8],
    [-0.3, 0.1, 0.8],
    [-0.3, 0.1, 0.2],
    [-0.5, 0.1, 0.2],
  
    // Down
    [-0.5, -0.1, 0.8],
    [-0.3, -0.1, 0.8],
    [-0.3, -0.1, 0.2],
    [-0.5, -0.1, 0.2],
  
    // Base Right
    // Front
    [0.3, 0.1, 0.8],
    [0.3, -0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, 0.1, 0.8],
  
    // Back
    [0.3, 0.1, 0.2],
    [0.3, -0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, 0.1, 0.2],

    // Left
    [0.3, 0.1, 0.2],
    [0.3, 0.1, 0.8],
    [0.3, -0.1, 0.8],
    [0.3, -0.1, 0.2],
  
    // Right
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, -0.1, 0.2],
  
    // Top
    [0.3, 0.1, 0.2],
    [0.3, 0.1, 0.8],
    [0.5, 0.1, 0.8],
    [0.5, 0.1, 0.2],
    
    // Down
    [0.3, -0.1, 0.2],
    [0.3, -0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, -0.1, 0.2],
  
    // Upper Left Front
    // Front
    [0, 0.7, 0.5],
    [-0.5, 0.1, 1],
    [-0.3, 0.1, 1],
    [0, 0.6, 0.6],
  
    // Back
    [-0.1, 0.6, 0.5],
    [-0.5, 0.1, 0.8],
    [-0.3, 0.1, 0.8],
    [0, 0.6, 0.5],

    // Left
    [0, 0.7, 0.5],
    [-0.5, 0.1, 1],
    [-0.5, 0.1, 0.8],
    [-0.1, 0.6, 0.5],  
  
    // Right
    [0, 0.6, 0.6],
    [-0.3, 0.1, 1],
    [-0.3, 0.1, 0.8],
    [0, 0.6, 0.5],
  
    // Down
    [-0.3, 0.1, 1],
    [-0.3, 0.1, 0.8],
    [-0.5, 0.1, 0.8],
    [-0.5, 0.1, 1],

    // Upper Left Back
    // Front
    [-0.1, 0.6, 0.5],
    [-0.5, 0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [0, 0.6, 0.5],
    
    // Back
    [0, 0.7, 0.5],
    [-0.5, 0.1, 0],
    [-0.3, 0.1, 0],
    [0, 0.6, 0.4],

    // Left
    [0, 0.7, 0.5],
    [-0.1, 0.6, 0.5],
    [-0.5, 0.1, 0.2],
    [-0.5, 0.1, 0],
    
    // Right
    [0, 0.6, 0.4],
    [0, 0.6, 0.5],
    [-0.3, 0.1, 0.2],
    [-0.3, 0.1, 0],
  
    // Down
    [-0.5, 0.1, 0],
    [-0.5, 0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [-0.3, 0.1, 0],
  
    // Upper Right Front
    // Front
    [0, 0.7, 0.5],
    [0, 0.6, 0.6],
    [0.3, 0.1, 1],
    [0.5, 0.1, 1],
  
    // Back
    [0.1, 0.6, 0.5],
    [0, 0.6, 0.5],
    [0.3, 0.1, 0.8],
    [0.5, 0.1, 0.8],

    // Left
    [0, 0.6, 0.6],
    [0.3, 0.1, 1],
    [0.3, 0.1, 0.8],
    [0, 0.6, 0.5],
  
    // Right
    [0, 0.7, 0.5],
    [0.5, 0.1, 1],
    [0.5, 0.1, 0.8],
    [0.1, 0.6, 0.5],
  
    // Down
    [0.3, 0.1, 0.8],
    [0.3, 0.1, 1],
    [0.5, 0.1, 1],
    [0.5, 0.1, 0.8],
  
    // Upper Right Back
    // Front
    [0, 0.6, 0.5],
    [0.3, 0.1, 0.2],
    [0.5, 0.1, 0.2],
    [0.1, 0.6, 0.5],
  
    // Back
    [0, 0.6, 0.4],
    [0.3, 0.1, 0],
    [0.5, 0.1, 0],
    [0, 0.7, 0.5],

    // Left
    [0, 0.6, 0.4],
    [0, 0.6, 0.5],
    [0.3, 0.1, 0.2],
    [0.3, 0.1, 0],
  
    // Right
    [0, 0.7, 0.5],
    [0.1, 0.6, 0.5],
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0],
  
    // Down
    [0.3, 0.1, 0],
    [0.3, 0.1, 0.2],
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0]
];

var octahedronVertices = [
    // Base Front
    // Front
    [-0.5, 0.1, 1],
    [-0.5, -0.1, 1],
    [0.5, -0.1, 1],
    [0.5, 0.1, 1],

    // Back
    [-0.5, 0.1, 0.8],
    [-0.5, -0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, 0.1, 0.8],

    // Left
    [-0.5, 0.1, 0.8],
    [-0.5, -0.1, 0.8],
    [-0.5, -0.1, 1],
    [-0.5, 0.1, 1],
  
    // Right
    [0.5, -0.1, 0.8],
    [0.5, 0.1, 0.8],
    [0.5, 0.1, 1],
    [0.5, -0.1, 1],
  
    // Top
    [-0.5, 0.1, 0.8],
    [-0.5, 0.1, 1],
    [0.5, 0.1, 1],
    [0.5, 0.1, 0.8],
  
    // Down
    [-0.5, -0.1, 0.8],
    [-0.5, -0.1, 1],
    [0.5, -0.1, 1],
    [0.5, -0.1, 0.8],
    
    // Base Back
    // Front
    [0.5, 0.1, 0.2],
    [-0.5, 0.1, 0.2],
    [-0.5, -0.1, 0.2],
    [0.5, -0.1, 0.2],
  
    // Back
    [0.5, 0.1, 0],
    [-0.5, 0.1, 0],
    [-0.5, -0.1, 0],
    [0.5, -0.1, 0],

    // Left
    [-0.5, -0.1, 0],
    [-0.5, -0.1, 0.2],
    [-0.5, 0.1, 0.2],
    [-0.5, 0.1, 0],
  
    // Right
    [0.5, 0.1, 0],
    [0.5, 0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, -0.1, 0],
  
    // Top
    [-0.5, 0.1, 0],
    [-0.5, 0.1, 0.2],
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0],
  
    // Down
    [-0.5, -0.1, 0],
    [-0.5, -0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, -0.1, 0],

    // Base Left
    // Front
    [-0.5, -0.1, 0.8],
    [-0.3, -0.1, 0.8],
    [-0.3, 0.1, 0.8],
    [-0.5, 0.1, 0.8],
  
    // Back
    [-0.5, -0.1, 0.2],
    [-0.3, -0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [-0.5, 0.1, 0.2],

    // Left
    [-0.5, -0.1, 0.2],
    [-0.5, 0.1, 0.2],
    [-0.5, 0.1, 0.8],
    [-0.5, -0.1, 0.8],
  
    // Right
    [-0.3, -0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [-0.3, 0.1, 0.8],
    [-0.3, -0.1, 0.8],
  
    // Top
    [-0.5, 0.1, 0.8],
    [-0.3, 0.1, 0.8],
    [-0.3, 0.1, 0.2],
    [-0.5, 0.1, 0.2],
  
    // Down
    [-0.5, -0.1, 0.8],
    [-0.3, -0.1, 0.8],
    [-0.3, -0.1, 0.2],
    [-0.5, -0.1, 0.2],
  
    // Base Right
    // Front
    [0.3, 0.1, 0.8],
    [0.3, -0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, 0.1, 0.8],
  
    // Back
    [0.3, 0.1, 0.2],
    [0.3, -0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, 0.1, 0.2],

    // Left
    [0.3, 0.1, 0.2],
    [0.3, 0.1, 0.8],
    [0.3, -0.1, 0.8],
    [0.3, -0.1, 0.2],
  
    // Right
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, -0.1, 0.2],
  
    // Top
    [0.3, 0.1, 0.2],
    [0.3, 0.1, 0.8],
    [0.5, 0.1, 0.8],
    [0.5, 0.1, 0.2],
    
    // Down
    [0.3, -0.1, 0.2],
    [0.3, -0.1, 0.8],
    [0.5, -0.1, 0.8],
    [0.5, -0.1, 0.2],

    // Upper Left Front
    // Front
    [0, 1, 0.5],
    [-0.5, 0.1, 1],
    [-0.3, 0.1, 1],
    [0, 0.8, 0.6],
  
    // Back
    [-0.1, 0.8, 0.5],
    [-0.5, 0.1, 0.8],
    [-0.3, 0.1, 0.8],
    [0, 0.8, 0.5],

    // Left
    [0, 1, 0.5],
    [-0.5, 0.1, 1],
    [-0.5, 0.1, 0.8],
    [-0.1, 0.8, 0.5],  
  
    // Right
    [0, 0.8, 0.6],
    [-0.3, 0.1, 1],
    [-0.3, 0.1, 0.8],
    [0, 0.8, 0.5],
  
    // Down
    [-0.3, 0.1, 1],
    [-0.3, 0.1, 0.8],
    [-0.5, 0.1, 0.8],
    [-0.5, 0.1, 1],

    // Upper Left Back
    // Front
    [-0.1, 0.8, 0.5],
    [-0.5, 0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [0, 0.8, 0.5],
    
    // Back
    [0, 1, 0.5],
    [-0.5, 0.1, 0],
    [-0.3, 0.1, 0],
    [0, 0.8, 0.4],

    // Left
    [0, 1, 0.5],
    [-0.1, 0.8, 0.5],
    [-0.5, 0.1, 0.2],
    [-0.5, 0.1, 0],
    
    // Right
    [0, 0.8, 0.4],
    [0, 0.8, 0.5],
    [-0.3, 0.1, 0.2],
    [-0.3, 0.1, 0],
  
    // Down
    [-0.5, 0.1, 0],
    [-0.5, 0.1, 0.2],
    [-0.3, 0.1, 0.2],
    [-0.3, 0.1, 0],

    // Upper Right Front
    // Front
    [0, 1, 0.5],
    [0, 0.8, 0.6],
    [0.3, 0.1, 1],
    [0.5, 0.1, 1],
  
    // Back
    [0.1, 0.8, 0.5],
    [0, 0.8, 0.5],
    [0.3, 0.1, 0.8],
    [0.5, 0.1, 0.8],

    // Left
    [0, 0.8, 0.6],
    [0.3, 0.1, 1],
    [0.3, 0.1, 0.8],
    [0, 0.8, 0.5],
  
    // Right
    [0, 1, 0.5],
    [0.5, 0.1, 1],
    [0.5, 0.1, 0.8],
    [0.1, 0.8, 0.5],
  
    // Down
    [0.3, 0.1, 0.8],
    [0.3, 0.1, 1],
    [0.5, 0.1, 1],
    [0.5, 0.1, 0.8],

    // Upper Right Back
    // Front
    [0, 0.8, 0.5],
    [0.3, 0.1, 0.2],
    [0.5, 0.1, 0.2],
    [0.1, 0.8, 0.5],
  
    // Back
    [0, 0.8, 0.4],
    [0.3, 0.1, 0],
    [0.5, 0.1, 0],
    [0, 1, 0.5],

    // Left
    [0, 0.8, 0.4],
    [0, 0.8, 0.5],
    [0.3, 0.1, 0.2],
    [0.3, 0.1, 0],
  
    // Right
    [0, 1, 0.5],
    [0.1, 0.8, 0.5],
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0],
  
    // Down
    [0.3, 0.1, 0],
    [0.3, 0.1, 0.2],
    [0.5, 0.1, 0.2],
    [0.5, 0.1, 0],

    // Upper Left Front
    // Front
    [0, -1, 0.5],
    [-0.5, -0.1, 1],
    [-0.3, -0.1, 1],
    [0, -0.8, 0.6],
  
    // Back
    [-0.1, -0.8, 0.5],
    [-0.5, -0.1, 0.8],
    [-0.3, -0.1, 0.8],
    [0, -0.8, 0.5],

    // Left
    [0, -1, 0.5],
    [-0.5, -0.1, 1],
    [-0.5, -0.1, 0.8],
    [-0.1, -0.8, 0.5],  
  
    // Right
    [0, -0.8, 0.6],
    [-0.3, -0.1, 1],
    [-0.3, -0.1, 0.8],
    [0, -0.8, 0.5],
  
    // Down
    [-0.3, -0.1, 1],
    [-0.3, -0.1, 0.8],
    [-0.5, -0.1, 0.8],
    [-0.5, -0.1, 1],
    
    // Lower Left Back
    // Front
    [-0.1, -0.8, 0.5],
    [-0.5, -0.1, 0.2],
    [-0.3, -0.1, 0.2],
    [0, -0.8, 0.5],
    
    // Back
    [0, -1, 0.5],
    [-0.5, -0.1, 0],
    [-0.3, -0.1, 0],
    [0, -0.8, 0.4],

    // Left
    [0, -1, 0.5],
    [-0.1, -0.8, 0.5],
    [-0.5, -0.1, 0.2],
    [-0.5, -0.1, 0],
    
    // Right
    [0, -0.8, 0.4],
    [0, -0.8, 0.5],
    [-0.3, -0.1, 0.2],
    [-0.3, -0.1, 0],
  
    // Down
    [-0.5, -0.1, 0],
    [-0.5, -0.1, 0.2],
    [-0.3, -0.1, 0.2],
    [-0.3, -0.1, 0],
  
    // Lower Right Front
    // Front
    [0, -1, 0.5],
    [0, -0.8, 0.6],
    [0.3, -0.1, 1],
    [0.5, -0.1, 1],
  
    // Back
    [0.1, -0.8, 0.5],
    [0, -0.8, 0.5],
    [0.3, -0.1, 0.8],
    [0.5, -0.1, 0.8],

    // Left
    [0, -0.8, 0.6],
    [0.3, -0.1, 1],
    [0.3, -0.1, 0.8],
    [0, -0.8, 0.5],
  
    // Right
    [0, -1, 0.5],
    [0.5, -0.1, 1],
    [0.5, -0.1, 0.8],
    [0.1, -0.8, 0.5],
  
    // Down
    [0.3, -0.1, 0.8],
    [0.3, -0.1, 1],
    [0.5, -0.1, 1],
    [0.5, -0.1, 0.8],
  
    // Lower Right Back
    // Front
    [0, -0.8, 0.5],
    [0.3, -0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.1, -0.8, 0.5],
  
    // Back
    [0, -0.8, 0.4],
    [0.3, -0.1, 0],
    [0.5, -0.1, 0],
    [0, -1, 0.5],

    // Left
    [0, -0.8, 0.4],
    [0, -0.8, 0.5],
    [0.3, -0.1, 0.2],
    [0.3, -0.1, 0],
  
    // Right
    [0, -1, 0.5],
    [0.1, -0.8, 0.5],
    [0.5, -0.1, 0.2],
    [0.5, -0.1, 0],
  
    // Down
    [0.3, -0.1, 0],
    [0.3, -0.1, 0.2],
    [0.5, -0.1, 0.2],
    [0.5, -0.1, 0]
];

// Create the model
let pyramidContent = {
    vertices: [],
    faces: [],
    colors: [],
    normals: []
};

let octahedronContent = {
    vertices: [],
    faces: [],
    colors: [],
    normals: []
}

// Create the 3D model for pyramid
// create3dModel(pyramidContent, pyramidVertices);
create3dModel(octahedronContent, octahedronVertices);

// Save the model to a JSON file
// fs.writeFile('../models/pyramid-model.json', JSON.stringify(pyramidContent), (err) => {
//     if (err) throw err;
//     console.log('The pyramid model file has been saved!');
// });
fs.writeFile('../models/octahedron-model.json', JSON.stringify(octahedronContent), (err) => {
    if (err) throw err;
    console.log('The octahedron model file has been saved!');
});

// TODO: Octahedron Model

// TODO: Prism Model

