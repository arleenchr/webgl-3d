const perryHeadColor = [20 / 255, 180 / 255, 178 / 255];
const perryBeakColor = [252 / 255, 178 / 255, 58 / 255];
const perryBodyColor = [20 / 255, 180 / 255, 178 / 255];
const perryLegColor = [20 / 255, 180 / 255, 178 / 255];
const perryBackFeetColor = [252 / 255, 178 / 255, 57 / 255];
const perryTailColor = [249 / 255, 165 / 255, 99 / 255];
const perryEyeColor = [1, 1, 1];
const perryPupilColor = [110 / 255, 56 / 255, 37 / 255];
const perryHatColor = [86 / 255, 43 / 255, 53 / 255];

const perry = new Object();
perry.name = 'perry';
perry.model = generateCuboid(0, 0, 0, [0, 0, 0]);

perry.animation = [
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [Math.PI/10, Math.PI*3/10, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [-0.15707963267948966, 1.5707963267948966, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [-0.15707963267948966, Math.PI*5/2, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(perry);

const perryBody = new Object();
perryBody.name = 'perryBody';
perryBody.model = generateCuboid(0.8, 0.9, 0.35, [0, 0.15, 0]);
setSolidColor(perryBody.model, perryBodyColor);
perryBody.setParent(perry);

perryBody.animation = [
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, -Math.PI/2],
        scale: [1.4, 0.4, 1],
    },
]
addFramesToObject(perryBody);

const perryHead = new Object();
perryHead.name = 'perryHead';
perryHead.model = generateCuboid(0.8, 0.3, 0.5, [-0.6, 0, 0]);
setSolidColor(perryHead.model, perryHeadColor);
perryHead.setParent(perry);

perryHead.animation = [
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
    {
        translate: [0.95, 0.65, 0],
        rotate: [0, 0, 0],
        scale: [1, 0.8, 0.8],
    },
]
addFramesToObject(perryHead);

const perryLeftEye = new Object();
perryLeftEye.name = 'perryLeftEye';
perryLeftEye.model = generateCuboid(0.2, 0.1, 0.1, [-0.71, 0.15, 0.185]);
setSolidColor(perryLeftEye.model, perryEyeColor);
perryLeftEye.setParent(perryHead);

perryLeftEye.animation = [
    still,
]
addFramesToObject(perryLeftEye);

const perryLeftPupil = new Object();
perryLeftPupil.name = 'perryLeftPupil';
perryLeftPupil.model = generateCuboid(0.2, 0.1, 0.05, [-0.715, 0.15, 0.22]);
setSolidColor(perryLeftPupil.model, perryPupilColor);
perryLeftPupil.setParent(perryLeftEye);

perryLeftPupil.animation = [
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, -0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(perryLeftPupil);

const perryRightEye = new Object();
perryRightEye.name = 'perryRightEye';
perryRightEye.model = generateCuboid(0.2, 0.1, 0.1, [-0.71, 0.15, -0.185]);
setSolidColor(perryRightEye.model, perryEyeColor);
perryRightEye.setParent(perryHead);

perryRightEye.animation = [
    still,
]
addFramesToObject(perryRightEye);

const perryRightPupil = new Object();
perryRightPupil.name = 'perryRightPupil';
perryRightPupil.model = generateCuboid(0.2, 0.1, 0.05, [-0.715, 0.15, -0.22]);
setSolidColor(perryRightPupil.model, perryPupilColor);
perryRightPupil.setParent(perryRightEye);

perryRightPupil.animation = [
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0.06],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(perryRightPupil);

const perryTail = new Object();
perryTail.name = 'perryTail';
perryTail.model = generateCuboid(0.5, 0.4, 0.25, [0.65, 0.4, 0]);
setSolidColor(perryTail.model, perryTailColor);
perryTail.setParent(perry);

perryTail.animation = [
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
    {
        translate: [-0.45, -0.35, 0],
        rotate: [0, 0, -0.4712388980384689],
        scale: [1, 0.6, 1],
    },
]
addFramesToObject(perryTail);

const perryFrontLeftLeg = new Object();
perryFrontLeftLeg.name = 'perryFrontLeftLeg';
perryFrontLeftLeg.model = generateCuboid(0.55, 0.1, 0.1, [-0.375, -0.5, 0.125]);
setSolidColor(perryFrontLeftLeg.model, perryLegColor);
perryFrontLeftLeg.setParent(perryBody);

perryFrontLeftLeg.animation = [
    still,
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0.8, -0.45, 0.025],
        rotate: [0, -0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, 0.025],
        rotate: [0, -0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, 0.025],
        rotate: [0, -0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, 0.025],
        rotate: [0, -0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, 0.025],
        rotate: [0, -0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, 0.025],
        rotate: [0, -0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
]
addFramesToObject(perryFrontLeftLeg);

const perryFrontLeftFeet = new Object();
perryFrontLeftFeet.name = 'perryFrontLeftFeet';
perryFrontLeftFeet.model = generateCuboid(0.15, 0.175, 0.11, [-0.4, -0.7, 0.125]);
setSolidColor(perryFrontLeftFeet.model, perryLegColor);
perryFrontLeftFeet.setParent(perryFrontLeftLeg);

perryFrontLeftFeet.animation = [
    still,
]
addFramesToObject(perryFrontLeftFeet);

const perryFrontRightLeg = new Object();
perryFrontRightLeg.name = 'perryFrontRightLeg';
perryFrontRightLeg.model = generateCuboid(0.55, 0.1, 0.1, [-0.375, -0.5, -0.125]);
setSolidColor(perryFrontRightLeg.model, perryLegColor);
perryFrontRightLeg.setParent(perryBody);

perryFrontRightLeg.animation = [
    still,
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0.8, -0.45, -0.025],
        rotate: [0, 0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, -0.025],
        rotate: [0, 0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, -0.025],
        rotate: [0, 0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, -0.025],
        rotate: [0, 0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, -0.025],
        rotate: [0, 0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
    {
        translate: [0.8, -0.45, -0.025],
        rotate: [0, 0.15707963267948966, 1.2566370614359172],
        scale: [1.8, 1.2, 1.4],
    },
]
addFramesToObject(perryFrontRightLeg);

const perryFrontRightFeet = new Object();
perryFrontRightFeet.name = 'perryFrontRightFeet';
perryFrontRightFeet.model = generateCuboid(0.15, 0.175, 0.11, [-0.4, -0.7, -0.125]);
setSolidColor(perryFrontRightFeet.model, perryLegColor);
perryFrontRightFeet.setParent(perryFrontRightLeg);

perryFrontRightFeet.animation = [
    still,
]
addFramesToObject(perryFrontRightFeet);

const perryBackLeftLeg = new Object();
perryBackLeftLeg.name = 'perryBackLeftLeg';
perryBackLeftLeg.model = generateCuboid(0.55, 0.1, 0.1, [0.375, -0.5, 0.125]);
setSolidColor(perryBackLeftLeg.model, perryLegColor);
perryBackLeftLeg.setParent(perryBody);

perryBackLeftLeg.animation = [
    still,
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/4],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.5, 0.1, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [1, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
]
addFramesToObject(perryBackLeftLeg);

const perryBackLeftFeet = new Object();
perryBackLeftFeet.name = 'perryBackLeftFeet';
perryBackLeftFeet.model = generateCuboid(0.15, 0.175, 0.11, [0.35, -0.7, 0.125]);
setSolidColor(perryBackLeftFeet.model, perryBackFeetColor);
perryBackLeftFeet.setParent(perryBackLeftLeg);

perryBackLeftFeet.animation = [
    still,
]
addFramesToObject(perryBackLeftFeet);

const perryBackRightLeg = new Object();
perryBackRightLeg.name = 'perryBackRightLeg';
perryBackRightLeg.model = generateCuboid(0.55, 0.1, 0.1, [0.375, -0.5, -0.125]);
setSolidColor(perryBackRightLeg.model, perryLegColor);
perryBackRightLeg.setParent(perryBody);

perryBackRightLeg.animation = [
    still,
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [0, 0, 0],
        rotate: [0, 0, Math.PI/4],
        scale: [1, 1, 1],
    },
    {
        translate: [-0.5, 0.1, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [1, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
    {
        translate: [-1, 0.2, 0],
        rotate: [0, 0, Math.PI/2],
        scale: [3, 1, 1],
    },
]
addFramesToObject(perryBackRightLeg);

const perryBackRightFeet = new Object();
perryBackRightFeet.name = 'perryBackRightFeet';
perryBackRightFeet.model = generateCuboid(0.15, 0.175, 0.11, [0.35, -0.7, -0.125]);
setSolidColor(perryBackRightFeet.model, perryBackFeetColor);
perryBackRightFeet.setParent(perryBackRightLeg);

perryBackRightFeet.animation = [
    still,
]
addFramesToObject(perryBackRightFeet);

const perryBeak = new Object();
perryBeak.name = 'perryBeak';
perryBeak.model = generateCuboid(0.3, 0.15, 0.275, [-0.8, -0.1, 0]);
setSolidColor(perryBeak.model, perryBeakColor);
perryBeak.setParent(perryHead);

perryBeak.animation = [
    still,
]
addFramesToObject(perryBeak);

const perryHat = new Object();
perryHat.name = 'perryHat';
perryHat.model = generateCuboid(0.4, 0.325, 0.375, [0.05, 3, 0]);
setSolidColor(perryHat.model, perryHatColor);
perryHat.setParent(perry);

perryHat.animation = [
    still,
    still,
    still,
    still,
    still,
    {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [-1.6, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [-1.6, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [-1.6, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
    {
        translate: [-1.6, 0, 0],
        rotate: [0, 0, 0],
        scale: [1, 1, 1],
    },
]
addFramesToObject(perryHat);

const perryHatBottom = new Object();
perryHatBottom.name = 'perryHatBottom';
perryHatBottom.model = generateCuboid(0.1, 0.45, 0.55, [0.05, 2.85, 0]);
setSolidColor(perryHatBottom.model, perryHatColor);
perryHatBottom.setParent(perryHat);

perryHatBottom.animation = [
    still,
]
addFramesToObject(perryHatBottom);


var perryObject = [
    perry,
];