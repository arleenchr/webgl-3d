const goat = new Object();
goat.name = 'head';
goat.model = generateCuboid(1, 0.5, 0.6, [-0.5, 0.85, 0]);

goat.animation = [
    still,
    still,
    still,
    still,
]
addFramesToObject(goat);

const goatHead = new Object();
goatHead.name = 'head';
goatHead.setParent(goat);

goatHead.animation = [
    still,
]
addFramesToObject(goatHead);

const goatJaw = new Object();
goatJaw.name = 'jaw';
goatJaw.model = generateCuboid(0.35, 0.115, 0.4, [-0.8, 0.7, 0]);
goatJaw.setParent(goatHead);

goatJaw.animation = [
    still,
]
addFramesToObject(goatJaw);

const goatLeftHorn = new Object();
goatLeftHorn.name = 'leftHorn';
goatLeftHorn.model = generateCuboid(0.2, 0.075, 0.1, [-0.45, 1.45, -0.15]);
goatLeftHorn.setParent(goatHead);

goatLeftHorn.animation = [
    still,
]
addFramesToObject(goatLeftHorn);

const goatLeftHornMid = new Object();
goatLeftHornMid.name = 'leftHornMid';
goatLeftHornMid.model = generateCuboid(0.2, 0.075, 0.1, [-0.42, 1.65, -0.15]);
goatLeftHornMid.setParent(goatLeftHorn);

goatLeftHornMid.animation = [
    still,
]
addFramesToObject(goatLeftHornMid);

const goatLeftHornEnd = new Object();
goatLeftHornEnd.name = 'leftHornEnd';
goatLeftHornEnd.model = generateCuboid(0.2, 0.075, 0.1, [-0.35, 1.65, -0.15]);
goatLeftHornEnd.setParent(goatLeftHorn);

goatLeftHornEnd.animation = [
    still,
]
addFramesToObject(goatLeftHornEnd);

const goatRightHorn = new Object();
goatRightHorn.name = 'rightHorn';
goatRightHorn.model = generateCuboid(0.2, 0.075, 0.1, [-0.45, 1.45, 0.15]);
goatRightHorn.setParent(goatHead);

goatRightHorn.animation = [
    still,
]
addFramesToObject(goatRightHorn);

const goatRightHornMid = new Object();
goatRightHornMid.name = 'rightHornMid';
goatRightHornMid.model = generateCuboid(0.2, 0.075, 0.1, [-0.42, 1.65, 0.15]);
goatRightHornMid.setParent(goatRightHorn);

goatRightHornMid.animation = [
    still,
]
addFramesToObject(goatRightHornMid);

const goatRightHornEnd = new Object();
goatRightHornEnd.name = 'rightHornEnd';
goatRightHornEnd.model = generateCuboid(0.2, 0.075, 0.1, [-0.35, 1.65, 0.15]);
goatRightHornEnd.setParent(goatRightHorn);

goatRightHornEnd.animation = [
    still,
]
addFramesToObject(goatRightHornEnd);

const goatNeck = new Object();
goatNeck.name = 'goatNeck';
goatNeck.model = generateCuboid(1, 0.3, 0.4, [-0.5, 0.35, 0]);
goatNeck.setParent(goatHead);

goatNeck.animation = [
    still,
]
addFramesToObject(goatNeck);

const goatBody = new Object();
goatBody.name = 'goatBody';
goatBody.model = generateCuboid(1.3, 1, 0.5, [-0.05, -0.55, 0]);
goatBody.setParent(goatHead);

goatBody.animation = [
    still,
]
addFramesToObject(goatBody);

const goatLegFrontLeft = new Object();
goatLegFrontLeft.name = 'goatLegFrontLeft'
goatLegFrontLeft.model = generateCuboid(0.7, 0.15, 0.15, [-0.3, -1.5, -0.15]);
goatLegFrontLeft.setParent(goatBody);

goatLegFrontLeft.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0.15707963267948966],
        scale: [1, 1, 1],
    },
]
addFramesToObject(goatLegFrontLeft);

const goatLegFrontRight = new Object();
goatLegFrontRight.name = 'goatLegFrontRight'
goatLegFrontRight.model = generateCuboid(0.7, 0.15, 0.15, [-0.3, -1.5, 0.15]);
goatLegFrontRight.setParent(goatBody);

goatLegFrontRight.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -0.15707963267948966],
        scale: [1, 1, 1],
    },
]
addFramesToObject(goatLegFrontRight);

const goatLegBackLeft = new Object();
goatLegBackLeft.name = 'goatLegBackLeft'
goatLegBackLeft.model = generateCuboid(0.7, 0.15, 0.15, [0.2, -1.5, -0.15]);
goatLegBackLeft.setParent(goatBody);

goatLegBackLeft.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -0.15707963267948966],
        scale: [1, 1, 1],
    },
]
addFramesToObject(goatLegBackLeft);

const goatLegBackRight = new Object();
goatLegBackRight.name = 'goatLegBackRight'
goatLegBackRight.model = generateCuboid(0.7, 0.15, 0.15, [0.2, -1.5, 0.15]);
goatLegBackRight.setParent(goatBody);

goatLegBackRight.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -0.15707963267948966],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0.15707963267948966],
        scale: [1, 1, 1],
    },
]
addFramesToObject(goatLegBackRight);

var goatObject = [
    goat,
];