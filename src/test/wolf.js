const furColor = [208 / 255, 206 / 255, 205 / 255];
const jawColor = [208 / 255, 178 / 255, 164 / 255];
const earColor = [0, 0, 0];

const wolf = new Object();
wolf.name = 'wolf';

const head = new Object();
head.name = 'head';
head.model = generateCuboid(1, 0.2, 0.5, [-0.525, 0, 0]);
setSolidColor(head.model, furColor);
head.setParent(wolf);

const jaw = new Object();
jaw.name = 'jaw';
jaw.model = generateCuboid(0.5, 0.115, 0.4, [-0.65, -0.2, 0]);
setSolidColor(jaw.model, jawColor);
jaw.setParent(head);

const earLeft = new Object();
earLeft.name = 'earLeft';
earLeft.model = generateCuboid(0.3, 0.075, 0.1, [-0.46, 0.65, -0.15]);
setSolidColor(earLeft.model, earColor);
earLeft.setParent(head);

const earRight = new Object();
earRight.name = 'earRight';
earRight.model = generateCuboid(0.3, 0.075, 0.1, [-0.46, 0.65, 0.15]);
setSolidColor(earRight.model, earColor);
earRight.setParent(head);

const chest = new Object();
chest.name = 'chest';
chest.model = generateCuboid(1.4, 0.45, 0.5, [-0.2, 0.05, 0]);
setSolidColor(chest.model, furColor);
chest.setParent(head);

const body = new Object();
body.name = 'body';
body.model = generateCuboid(1.1, 0.5, 0.5, [0.25, 0, 0]);
setSolidColor(body.model, furColor);
body.setParent(chest);

const tail = new Object();
tail.name = 'tail';
tail.model = generateCuboid(0.4, 0.4, 0.2, [0.6, 0.2, 0]);
setSolidColor(tail.model, furColor);
tail.setParent(body);

const frontLeftLeg = new Object();
frontLeftLeg.name = 'frontLeftLeg'
frontLeftLeg.model = generateCuboid(0.7, 0.15, 0.15, [-0.25, -0.9, -0.15]);
setSolidColor(frontLeftLeg.model, furColor);
frontLeftLeg.setParent(chest);

const frontRighttLeg = new Object();
frontRighttLeg.name = 'frontRighttLeg'
frontRighttLeg.model = generateCuboid(0.7, 0.15, 0.15, [-0.25, -0.9, 0.15]);
setSolidColor(frontRighttLeg.model, furColor);
frontRighttLeg.setParent(chest);

const backLeftLeg = new Object();
backLeftLeg.name = 'backLeftLeg'
backLeftLeg.model = generateCuboid(0.7, 0.15, 0.15, [0.25, -0.9, -0.15]);
setSolidColor(backLeftLeg.model, furColor);
backLeftLeg.setParent(body);

const backRightLeg = new Object();
backRightLeg.name = 'backRightLeg'
backRightLeg.model = generateCuboid(0.7, 0.15, 0.15, [0.25, -0.9, 0.15]);
setSolidColor(backRightLeg.model, furColor);
backRightLeg.setParent(body);

var wolfObject = [
    wolf,
];