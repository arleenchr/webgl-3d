const furColor = [208 / 255, 206 / 255, 205 / 255];
const snoutColor = [208 / 255, 178 / 255, 164 / 255];
const jawColor = [62 / 255, 61 / 255, 65 / 255];
const darkerFurColor = [194 / 255, 191 / 255, 190 / 255];
const earColor = [128 / 255, 126 / 255, 125 / 255];
const eyesColor = [0, 0, 0];

const wolf = new Object();
wolf.name = 'wolf';
wolf.model = generateCuboid(0, 0, 0, [0, 0, 0]);

wolf.animation = [
    still,
    {
        translate: [0, 0.1, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0.1, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0.1, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0.1, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/16, Math.PI/3, 0],
        scale: [1, 1, 1],
    },
    still,
];
addFramesToObject(wolf);

const head = new Object();
head.name = 'head';
head.model = generateCuboid(1, 0.2, 0.5, [-0.525, 0, 0]);
setSolidColor(head.model, furColor);
head.setParent(wolf);

head.animation = [
    still,
    still,
    {
        translate: [-0.03, 0, 0],
        rotate: [0, 0, -Math.PI/24],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.03, 0, 0],
        rotate: [0, 0, -Math.PI/24],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.03, 0, 0],
        rotate: [0, 0, -Math.PI/24],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.03, 0, 0],
        rotate: [0, 0, -Math.PI/24],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.03, 0, 0],
        rotate: [0, 0, -Math.PI/24],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.03, 0, 0],
        rotate: [0, 0, -Math.PI/24],
        scale: [1, 1, 1],
    },
    still,
    still,
];
addFramesToObject(head);

const leftEye = new Object();
leftEye.name = 'leftEye';
leftEye.model = generateCuboid(0.18, 0.01, 0.09, [-0.63, 0.15, -0.12]);
setSolidColor(leftEye.model, eyesColor);
leftEye.setParent(head);

leftEye.animation = [
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
addFramesToObject(leftEye);

const rightEye = new Object();
rightEye.name = 'leftEye';
rightEye.model = generateCuboid(0.18, 0.01, 0.09, [-0.63, 0.15, 0.12]);
setSolidColor(rightEye.model, eyesColor);
rightEye.setParent(head);

rightEye.animation = [
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
addFramesToObject(rightEye);

const snout = new Object();
snout.name = 'snout';
snout.model = generateCuboid(0.39, 0.2, 0.27, [-0.7, -0.14, 0]);
setSolidColor(snout.model, snoutColor);
snout.setParent(head);

snout.animation = [
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
addFramesToObject(snout);

const nose = new Object();
nose.name = 'nose';
nose.model = generateCuboid(0.18, 0.09, 0.09, [-0.76, -0.02, 0]);
setSolidColor(nose.model, jawColor);
nose.setParent(snout);

nose.animation = [
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
addFramesToObject(nose);

const jaw = new Object();
jaw.name = 'jaw';
jaw.model = generateCuboid(0.12, 0.2, 0.27, [-0.7, -0.39, 0]);
setSolidColor(jaw.model, jawColor);
jaw.setParent(head);

jaw.animation = [
    still,
    still,
    still,
    {
        translate: [0, 0.1, 0],
        rotate: [0, 0, Math.PI/35],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0.1, 0],
        rotate: [0, 0, Math.PI/35],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0.1, 0],
        rotate: [0, 0, Math.PI/35],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0.1, 0],
        rotate: [0, 0, Math.PI/35],
        scale: [1, 1, 1],
    },
    still,
    still,
    still,
];
addFramesToObject(jaw);

const earLeft = new Object();
earLeft.name = 'earLeft';
earLeft.model = generateCuboid(0.4, 0.075, 0.15, [-0.46, 0.7, -0.15]);
setSolidColor(earLeft.model, earColor);
earLeft.setParent(head);

earLeft.animation = [
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
addFramesToObject(earLeft);

const earRight = new Object();
earRight.name = 'earRight';
earRight.model = generateCuboid(0.4, 0.075, 0.15, [-0.46, 0.7, 0.15]);
setSolidColor(earRight.model, earColor);
earRight.setParent(head);

earRight.animation = [
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
addFramesToObject(earRight);

const chest = new Object();
chest.name = 'chest';
chest.model = generateCuboid(1.4, 0.45, 0.6, [-0.2, 0.05, 0]);
setSolidColor(chest.model, darkerFurColor);
chest.setParent(wolf);

chest.animation = [
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
]
addFramesToObject(chest);

const body = new Object();
body.name = 'body';
body.model = generateCuboid(1.1, 0.5, 0.5, [0.25, 0, 0]);
setSolidColor(body.model, furColor);
body.setParent(wolf);

body.animation = [
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
]
addFramesToObject(body);

const tail = new Object();
tail.name = 'tail';
tail.model = generateCuboid(0.4, 0.6, 0.2, [0.6, 0.2, 0]);
setSolidColor(tail.model, darkerFurColor);
tail.setParent(body);

tail.animation = [
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, -Math.PI/36, -Math.PI/36],
        scale: [1, 1, 1],
    },
    still,
]
addFramesToObject(tail);

const frontLeftLeg = new Object();
frontLeftLeg.name = 'frontLeftLeg'
frontLeftLeg.model = generateCuboid(1.4, 0.18, 0.18, [-0.25, -0.7, -0.15]);
setSolidColor(frontLeftLeg.model, furColor);
frontLeftLeg.setParent(chest);

frontLeftLeg.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(frontLeftLeg);

const frontRighttLeg = new Object();
frontRighttLeg.name = 'frontRighttLeg'
frontRighttLeg.model = generateCuboid(1.4, 0.18, 0.18, [-0.25, -0.7, 0.15]);
setSolidColor(frontRighttLeg.model, furColor);
frontRighttLeg.setParent(chest);

frontRighttLeg.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(frontRighttLeg);

const backLeftLeg = new Object();
backLeftLeg.name = 'backLeftLeg'
backLeftLeg.model = generateCuboid(1.4, 0.18, 0.18, [0.25, -0.7, -0.15]);
setSolidColor(backLeftLeg.model, furColor);
backLeftLeg.setParent(body);

backLeftLeg.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(backLeftLeg);

const backRightLeg = new Object();
backRightLeg.name = 'backRightLeg'
backRightLeg.model = generateCuboid(1.4, 0.18, 0.18, [0.25, -0.7, 0.15]);
setSolidColor(backRightLeg.model, furColor);
backRightLeg.setParent(body);

backRightLeg.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/16],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(backRightLeg);

var wolfObject = [
    wolf,
];