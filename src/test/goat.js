const goat = new Object();
goat.name = 'head';
goat.model = generateCuboid(1, 0.5, 1, [-0.5, 0.85, 0]);

const goatHead = new Object();
goatHead.name = 'head';
goatHead.setParent(goat);

const goatJaw = new Object();
goatJaw.name = 'jaw';
goatJaw.model = generateCuboid(0.35, 0.115, 0.4, [-0.8, 0.7, 0]);
goatJaw.setParent(goatHead);

const goatLeftHorn = new Object();
goatLeftHorn.name = 'leftHorn';
goatLeftHorn.model = generateCuboid(0.2, 0.075, 0.1, [-0.45, 1.5, -0.15]);
goatLeftHorn.setParent(goatHead);

const goatLeftHornMid = new Object();
goatLeftHornMid.name = 'leftHornMid';
goatLeftHornMid.model = generateCuboid(0.2, 0.075, 0.1, [-0.42, 1.8, -0.15]);
goatLeftHornMid.setParent(goatLeftHorn);

const goatLeftHornEnd = new Object();
goatLeftHornEnd.name = 'leftHornEnd';
goatLeftHornEnd.model = generateCuboid(0.2, 0.075, 0.1, [-0.35, 1.8, -0.15]);
goatLeftHornEnd.setParent(goatLeftHorn);

const goatRightHorn = new Object();
goatRightHorn.name = 'rightHorn';
goatRightHorn.model = generateCuboid(0.2, 0.075, 0.1, [-0.45, 1.5, 0.15]);
goatRightHorn.setParent(goatHead);

const goatRightHornMid = new Object();
goatRightHornMid.name = 'rightHornMid';
goatRightHornMid.model = generateCuboid(0.2, 0.075, 0.1, [-0.42, 1.8, 0.15]);
goatRightHornMid.setParent(goatRightHorn);

const goatRightHornEnd = new Object();
goatRightHornEnd.name = 'rightHornEnd';
goatRightHornEnd.model = generateCuboid(0.2, 0.075, 0.1, [-0.35, 1.8, 0.15]);
goatRightHornEnd.setParent(goatRightHorn);

const goatNeck = new Object();
goatNeck.name = 'goatNeck';
goatNeck.model = generateCuboid(1, 0.3, 0.5, [-0.5, 0.35, 0]);
goatNeck.setParent(goatHead);

const goatBody = new Object();
goatBody.name = 'goatBody';
goatBody.model = generateCuboid(1.3, 1, 0.5, [-0.05, -0.55, 0]);
goatBody.setParent(goatHead);

const goatLegFrontLeft = new Object();
goatLegFrontLeft.name = 'goatLegFrontLeft'
goatLegFrontLeft.model = generateCuboid(0.7, 0.15, 0.15, [-0.3, -1.5, -0.15]);
goatLegFrontLeft.setParent(goatBody);

const goatLegFrontRight = new Object();
goatLegFrontRight.name = 'goatLegFrontRight'
goatLegFrontRight.model = generateCuboid(0.7, 0.15, 0.15, [-0.3, -1.5, 0.15]);
goatLegFrontRight.setParent(goatBody);

const goatLegBackLeft = new Object();
goatLegBackLeft.name = 'goatLegBackLeft'
goatLegBackLeft.model = generateCuboid(0.7, 0.15, 0.15, [0.2, -1.5, -0.15]);
goatLegBackLeft.setParent(goatBody);

const goatLegBackRight = new Object();
goatLegBackRight.name = 'goatLegBackRight'
goatLegBackRight.model = generateCuboid(0.7, 0.15, 0.15, [0.2, -1.5, 0.15]);
goatLegBackRight.setParent(goatBody);

var goatObject = [
    goat,
];