const duck = new Object();
duck.name = 'duck';

// Height, Width, Depth
duck.model = generateCuboid(0.5, 0.5, 0.55, [0, 0, 0]);

const duckHead = new Object();
duckHead.name = 'head'; // 0.35
duckHead.model = generateCuboid(0.35, 0.3, 0.3, [0, 0.6, -0.25]);
duckHead.setParent(duck);

const duckBeak = new Object();
duckBeak.name = 'beak';
duckBeak.model = generateCuboid(0.1, 0.2, 0.2, [0, 0.525, -0.4]);
duckBeak.setParent(duckHead);

const duckLowerBody = new Object();
duckLowerBody.name = 'lower-body';
duckLowerBody.model = generateCuboid(0.3, 0.35, 0.5, [0, -0.3, 0]);
duckLowerBody.setParent(duck);

const duckNeck = new Object();
duckNeck.name = 'neck';
duckNeck.model = generateCuboid(0.3, 0.15, 0.15, [0, 0.3, -0.2]);
duckNeck.setParent(duckLowerBody);

const duckTail = new Object();
duckTail.name = 'tail';
duckTail.model = generateCuboid(0.15, 0.1, 0.05, [0, 0, 0.3]);
duckTail.setParent(duckLowerBody);

const duckLeg1 = new Object();
duckLeg1.name = 'leg-1';
duckLeg1.model = generateCuboid(0.5, 0.1, 0.1, [0.1, -0.5, 0]);
duckLeg1.setParent(duck);

const duckLeg2 = new Object();
duckLeg2.name = 'leg-2';
duckLeg2.model = generateCuboid(0.5, 0.1, 0.1, [-0.1, -0.5, 0]);
duckLeg2.setParent(duck);

const duckFeet1 = new Object();
duckFeet1.name = 'feet-1';
duckFeet1.model = generateCuboid(0.1, 0.15, 0.2, [0.1, -0.75, -0.02]);
duckFeet1.setParent(duckLeg1);

const duckFeet2 = new Object();
duckFeet2.name = 'feet-2';
duckFeet2.model = generateCuboid(0.1, 0.15, 0.2, [-0.1, -0.75, -0.02]);
duckFeet2.setParent(duckLeg2);

var duckObject = [
    duck,
]