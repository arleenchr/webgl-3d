const perry = new Object();
perry.name = 'perry';

const perryBody = new Object();
perryBody.name = 'perryBody';
perryBody.model = generateCuboid(0.8, 0.9, 0.35, [0, 0.15, 0]);
perryBody.setParent(perry);

const perryHead = new Object();
perryHead.name = 'perryHead';
perryHead.model = generateCuboid(0.8, 0.3, 0.5, [-0.6, 0, 0]);
perryHead.setParent(perry);

const perryTail = new Object();
perryTail.name = 'perryTail';
perryTail.model = generateCuboid(0.5, 0.4, 0.25, [0.65, 0.4, 0]);
perryTail.setParent(perry);

const perryFrontLeftLeg = new Object();
perryFrontLeftLeg.name = 'perryFrontLeftLeg';
perryFrontLeftLeg.model = generateCuboid(0.55, 0.1, 0.1, [-0.375, -0.5, 0.125]);
perryFrontLeftLeg.setParent(perryBody);

const perryFrontRightLeg = new Object();
perryFrontRightLeg.name = 'perryFrontRightLeg';
perryFrontRightLeg.model = generateCuboid(0.55, 0.1, 0.1, [-0.375, -0.5, -0.125]);
perryFrontRightLeg.setParent(perryBody);

const perryBackLeftLeg = new Object();
perryBackLeftLeg.name = 'perryBackLeftLeg';
perryBackLeftLeg.model = generateCuboid(0.55, 0.1, 0.1, [0.375, -0.5, 0.125]);
perryBackLeftLeg.setParent(perryBody);

const perryBackRightLeg = new Object();
perryBackRightLeg.name = 'perryBackRightLeg';
perryBackRightLeg.model = generateCuboid(0.55, 0.1, 0.1, [0.375, -0.5, -0.125]);
perryBackRightLeg.setParent(perryBody);

const perryBeak = new Object();
perryBeak.name = 'perryBeak';
perryBeak.model = generateCuboid(0.3, 0.15, 0.3, [-0.8, -0.1, 0]);
perryBeak.setParent(perryHead);


var endObject = [
    perry,
];