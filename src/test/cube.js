// const cube = new Object();
// cube.name = 'cube';
// cube.model = generateCuboid(0.2, 1.2, 0.1, [0, 0, 0]);
// cube.animation = [
//     {
//         translate: [-1, 0, 0],
//         rotate: [0 , 0, 0],
//         scale: [1, 1, 1],
//     },
//     {
//         translate: [1, 0, 0],
//         rotate: [0, 0, 0],
//         scale: [1, 1, 1],
//     }
// ];
// addFramesToObject(cube);

// const cubeLeg = new Object();
// cubeLeg.name = 'cubeLeg';
// cubeLeg.model = generateCuboid(1.2, 0.2, 0.1, [0, -0.5, 0]);
// cubeLeg.animation = [
//     {
//         translate: [0, 0, 0],
//         rotate: [0 , 0, 0],
//         scale: [1, 1, 1],
//     },
//     {
//         translate: [0, 0, 0],
//         rotate: [0, 0, Math.PI * 2],
//         scale: [1, 1, 1],
//     }
// ];
// addFramesToObject(cubeLeg);

// cubeLeg.setParent(cube);

// const cube = new Object();
// cube.name = 'cube';
// cube.model = generateCuboid(0.2, 0.75, 0.1, [0, 0.7, -0.375]);

// const cubeLeg = new Object();
// cubeLeg.name = 'cubeLeg';
// cubeLeg.model = generateCuboid(0.2, 0.75, 0.1, [0, -0.7, -0.375]);

// const cube1 = new Object();
// cube1.name = 'cubeLeg';
// cube1.model = generateCuboid(1.6, 0.075, 0.1, [-0.3375, 0, -0.375]);

// const cube2 = new Object();
// cube2.name = 'cubeLeg';
// cube2.model = generateCuboid(1.6, 0.075, 0.1, [0.3375, 0, -0.375]);

// const cube3 = new Object();
// cube3.name = 'cubeLeg';
// cube3.model = generateCuboid(1.6, 0.075, 0.1, [-0.3375, 0, 0.375]);

// const cube4 = new Object();
// cube4.name = 'cube4';
// cube4.model = generateCuboid(0.2, 0.75, 0.1, [0, 0.7, 0.375]);

// const cube5 = new Object();
// cube5.name = 'cube5';
// cube5.model = generateCuboid(0.2, 0.75, 0.1, [0, -0.7, 0.375]);

// const cube6 = new Object();
// cube6.name = 'cubeLeg';
// cube6.model = generateCuboid(1.6, 0.075, 0.1, [0.3375, 0, 0.375]);

// const cube7 = new Object();
// cube7.name = 'cubeLeg';
// cube7.model = generateCuboid(0.2, 0.075, 0.85, [0.3375, -0.7, 0]);

// const cube8 = new Object();
// cube8.name = 'cubeLeg';
// cube8.model = generateCuboid(0.2, 0.075, 0.85, [0.3375, 0.7, 0]);

// const cube9 = new Object();
// cube9.name = 'cubeLeg';
// cube9.model = generateCuboid(0.2, 0.075, 0.85, [-0.3375, -0.7, 0]);

// const cube10 = new Object();
// cube10.name = 'cubeLeg';
// cube10.model = generateCuboid(0.2, 0.075, 0.85, [-0.3375, 0.7, 0]);


// cubeLeg.setParent(cube);
// cube1.setParent(cube);
// cube2.setParent(cube);
// cube3.setParent(cube);
// cube4.setParent(cube);
// cube5.setParent(cube);
// cube6.setParent(cube);
// cube7.setParent(cube);
// cube8.setParent(cube);
// cube9.setParent(cube);
// cube10.setParent(cube);

var cubeVertices = [
    [-0.375,0.6,-0.425],
    [0.375,0.6,-0.425],
    [-0.375,0.8,-0.425],
    [0.375,0.8,-0.425],
    [-0.375,0.6,-0.325],
    [0.375,0.6,-0.325],
    [-0.375,0.8,-0.325],
    [0.375,0.8,-0.325],

    [-0.375,-0.8,-0.425],
    [0.375,-0.8,-0.425],
    [-0.375,-0.6,-0.425],
    [0.375,-0.6,-0.425],
    [-0.375,-0.8,-0.325],
    [0.375,-0.8,-0.325],
    [-0.375,-0.6,-0.325],
    [0.375,-0.6,-0.325],

    [-0.375,-0.8,-0.425],
    [-0.3,-0.8,-0.425],
    [-0.375,0.8,-0.425],
    [-0.3,0.8,-0.425],
    [-0.375,-0.8,-0.325],
    [-0.3,-0.8,-0.325],
    [-0.375,0.8,-0.325],
    [-0.3,0.8,-0.325],

    [0.3,-0.8,-0.425],
    [0.375,-0.8,-0.425],
    [0.3,0.8,-0.425],
    [0.375,0.8,-0.425],
    [0.3,-0.8,-0.325],
    [0.375,-0.8,-0.325],
    [0.3,0.8,-0.325],
    [0.375,0.8,-0.325],

    [-0.375,-0.8,0.325],
    [-0.3,-0.8,0.325],
    [-0.375,0.8,0.325],
    [-0.3,0.8,0.325],
    [-0.375,-0.8,0.425],
    [-0.3,-0.8,0.425],
    [-0.375,0.8,0.425],
    [-0.3,0.8,0.425],

    [-0.375,0.6,0.325],
    [0.375,0.6,0.325],
    [-0.375,0.8,0.325],
    [0.375,0.8,0.325],
    [-0.375,0.6,0.425],
    [0.375,0.6,0.425],
    [-0.375,0.8,0.425],
    [0.375,0.8,0.425],

    [-0.375,-0.8,0.325],
    [0.375,-0.8,0.325],
    [-0.375,-0.6,0.325],
    [0.375,-0.6,0.325],
    [-0.375,-0.8,0.425],
    [0.375,-0.8,0.425],
    [-0.375,-0.6,0.425],
    [0.375,-0.6,0.425],

    [0.3,-0.8,0.325],
    [0.375,-0.8,0.325],
    [0.3,0.8,0.325],
    [0.375,0.8,0.325],
    [0.3,-0.8,0.425],
    [0.375,-0.8,0.425],
    [0.3,0.8,0.425],
    [0.375,0.8,0.425],

    [0.3,-0.8,-0.425],
    [0.375,-0.8,-0.425],
    [0.3,-0.6,-0.425],
    [0.375,-0.6,-0.425],
    [0.3,-0.8,0.425],
    [0.375,-0.8,0.425],
    [0.3,-0.6,0.425],
    [0.375,-0.6,0.425],

    [0.3,0.6,-0.425],
    [0.375,0.6,-0.425],
    [0.3,0.8,-0.425],
    [0.375,0.8,-0.425],
    [0.3,0.6,0.425],
    [0.375,0.6,0.425],
    [0.3,0.8,0.425],
    [0.375,0.8,0.425],

    [-0.375,-0.8,-0.425],
    [-0.3,-0.8,-0.425],
    [-0.375,-0.6,-0.425],
    [-0.3,-0.6,-0.425],
    [-0.375,-0.8,0.425],
    [-0.3,-0.8,0.425],
    [-0.375,-0.6,0.425],
    [-0.3,-0.6,0.425],

    [-0.375,0.6,-0.425],
    [-0.3,0.6,-0.425],
    [-0.375,0.8,-0.425],
    [-0.3,0.8,-0.425],
    [-0.375,0.6,0.425],
    [-0.3,0.6,0.425],
    [-0.375,0.8,0.425],
    [-0.3,0.8,0.425]
];

let cubeContent = {
    vertices: cubeVertices,
    faces: generateCubeFaces(),
    colors: generateRandomColors(cubeVertices),
    normals: vectors.calculateNormal(cubeVertices),
};

const cube = new Object();
cube.name = 'cube';
cube.model = cubeContent;

var endObject = [
    cube,
];