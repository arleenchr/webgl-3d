const cube = new Object();
cube.name = 'cube';
cube.model = generateCuboid(0.2, 1.2, 0.1, [0, 0, 0]);
cube.animation = [
    {
        translate: [-1, 0, 0],
        rotate: [0 , 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [1, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    }
];
addFramesToObject(cube);

const cubeLeg = new Object();
cubeLeg.name = 'cubeLeg';
cubeLeg.model = generateCuboid(1.2, 0.2, 0.1, [0, -0.5, 0]);
cubeLeg.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0 , 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI * 2],
        scale: [1, 1, 1],
    }
];
addFramesToObject(cubeLeg);

cubeLeg.setParent(cube);

var endObject = [
    cube,
];