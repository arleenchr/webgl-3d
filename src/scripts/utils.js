// Set Precision For Centroid
const setPrecision = (num) => {
    res = parseFloat(num.toPrecision(6));
    return res;
}

// Find Centroid
const locateCentroid = (mat) => {
    let x = 0;
    let y = 0;
    let z = 0;
    let count = mat.length;

    for (let i = 0; i < count; i++) {
        x = setPrecision(mat[i][0] + x);
        y = setPrecision(mat[i][1] + y);
        z = setPrecision(mat[i][2] + z);
    }
  
    // Find center using average
    x = x / count;
    y = y / count;
    z = z / count;

    return [x, y, z];
}

// Degrees Conversion (Rad -> Deg and Deg -> Rad)
const radianToDegrees = (radian) => {
    deg = (radian * 180) / Math.PI;
    return deg;
}
  
const degreesToRadian = (deg) => {
    radian = (Math.PI * deg) / 180;
    return radian;
}

// Generate Random Colors
const generateRandomColors = (verts, color = null) => {
    let resColors = [];

    for (let i = 0; i < verts.length; i += 3) {
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

// Set Color (solid)
const setSolidColor = (model, color) => {
    for (let i = 0; i < model.vertices.length; i++){
        model.colors[i] = color;
    }
}

// Generate Cuboid
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

const getOrigin = (object) => {
    let x_minus = object.model.vertices[0][0];
    let x_plus = object.model.vertices[1][0];
    let y_minus = object.model.vertices[0][1];
    let y_plus = object.model.vertices[2][1];
    let z_minus = object.model.vertices[0][2];
    let z_plus = object.model.vertices[4][2];

    let origin = [
        (x_plus + x_minus) / 2,
        (y_plus + y_minus) / 2,
        (z_plus + z_minus) / 2,
    ];

    return origin;
}

const generateCubeFaces = () => {
    let blockFaces = [
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

    let cubeFaces = [];

    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < blockFaces.length; j++) {
            let temp = [];
            for (let k = 0; k < 3; k++) {
                temp.push(blockFaces[j][k] + i * 8);
            }
            cubeFaces.push(temp);
        }
    }
    return cubeFaces;
}

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