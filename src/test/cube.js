const cube = new Object();
cube.name = 'cube';
cube.model = generateCuboid(0.2, 1.2, 0.1, [0, 0, 0]);

const cubeLeg = new Object();
cubeLeg.name = 'cubeLeg';
cubeLeg.model = generateCuboid(1.2, 0.2, 0.1, [0, -0.5, 0]);

cubeLeg.setParent(cube);

var endObject = [
    cube,
];