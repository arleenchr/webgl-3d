const duck = new Object();
duck.name = 'duck';

let still = {
    translate: [0, 0, 0],
    rotate: [0, 0, 0],
    scale: [1, 1, 1],
};

// Height, Width, Depth
duck.model = generateCuboid(0.5, 0.5, 0.55, [0, 0, 0]);

duck.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/2, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/2, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/2, 0],
        scale: [1, 1, 1],
    },
    still,
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/2, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/2, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/2, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI, 0],
        scale: [1, 1, 1],
    },
];
addFramesToObject(duck);

const duckNeck = new Object();
duckNeck.name = 'neck';
duckNeck.model = generateCuboid(0.3, 0.15, 0.15, [0, 0.3, -0.2]);
duckNeck.setParent(duck);

duckNeck.animation = [
    still,
    {
        translate: [0, 0, 0.1],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0.075],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0.075],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0.075],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    still,
];
addFramesToObject(duckNeck);

const duckHead = new Object();
duckHead.name = 'head';
duckHead.model = generateCuboid(0.35, 0.3, 0.3, [0, 0.6, -0.25]);
duckHead.setParent(duckNeck);

duckHead.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckHead);

const duckEye1 = new Object();
duckEye1.name = 'eye-1';
duckEye1.model = generateCuboid(0.1, 0.05, 0.01, [0.065, 0.67, -0.4]);
duckEye1.setParent(duckHead);

duckEye1.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckEye1);

const duckEye2 = new Object();
duckEye2.name = 'eye-2';
duckEye2.model = generateCuboid(0.1, 0.05, 0.01, [-0.065, 0.67, -0.4]);
duckEye2.setParent(duckHead);

duckEye2.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckEye2);

const duckBeak = new Object();
duckBeak.name = 'beak';
duckBeak.model = generateCuboid(0.1, 0.2, 0.2, [0, 0.525, -0.4]);
duckBeak.setParent(duckHead);

duckBeak.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckBeak);

const duckLowerBody = new Object();
duckLowerBody.name = 'lower-body';
duckLowerBody.model = generateCuboid(0.3, 0.35, 0.5, [0, -0.3, 0]);
duckLowerBody.setParent(duck);

duckLowerBody.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckLowerBody);

const duckTail = new Object();
duckTail.name = 'tail';
duckTail.model = generateCuboid(0.15, 0.1, 0.05, [0, 0, 0.3]);
duckTail.setParent(duckLowerBody);

duckTail.animation = [
    still,
    {
        translate: [0, -0.1, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0.1, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.1, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, -0.1, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    still,
];
addFramesToObject(duckTail);

const duckLeg1 = new Object();
duckLeg1.name = 'leg-1';
duckLeg1.model = generateCuboid(0.5, 0.1, 0.1, [0.1, -0.5, 0]);
duckLeg1.setParent(duck);

duckLeg1.animation = [
    still,
    {
        translate: [0, 0, 0],
        rotate: [-Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0],
        rotate: [-Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    still,
];
addFramesToObject(duckLeg1);

const duckLeg2 = new Object();
duckLeg2.name = 'leg-2';
duckLeg2.model = generateCuboid(0.5, 0.1, 0.1, [-0.1, -0.5, 0]);
duckLeg2.setParent(duck);

duckLeg2.animation = [
    still,
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0],
        rotate: [-Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    {
        translate: [0, 0, 0],
        rotate: [-Math.PI/6, 0, 0],
        scale: [1, 1, 1],
    },
    still,
    still,
];
addFramesToObject(duckLeg2);

const duckFeet1 = new Object();
duckFeet1.name = 'feet-1';
duckFeet1.model = generateCuboid(0.1, 0.15, 0.2, [0.1, -0.75, -0.02]);
duckFeet1.setParent(duckLeg1);

duckFeet1.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckFeet1);

const duckFeet2 = new Object();
duckFeet2.name = 'feet-2';
duckFeet2.model = generateCuboid(0.1, 0.15, 0.2, [-0.1, -0.75, -0.02]);
duckFeet2.setParent(duckLeg2);

duckFeet2.animation = [
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
    still,
];
addFramesToObject(duckFeet2);

var duckObject = [
    duck,
]