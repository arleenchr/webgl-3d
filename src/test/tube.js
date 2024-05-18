const tubeFunction = (sides) => {
    let vertices = [];
    let angle = 360 / sides;
    let radius = 0.5;
    let height = 1;
    let z = height / 2;

    for (let i = 0; i < sides; i++) {
        let x1a = radius * Math.cos(angle * i * Math.PI / 180);
        let y1a = radius * Math.sin(angle * i * Math.PI / 180);
        let x1b = radius * Math.cos(angle * (i + 1) * Math.PI / 180);
        let y1b = radius * Math.sin(angle * (i + 1) * Math.PI / 180);

        let x2a = 0.8 * radius * Math.cos(angle * i * Math.PI / 180);
        let y2a = 0.8 * radius * Math.sin(angle * i * Math.PI / 180);
        let x2b = 0.8 * radius * Math.cos(angle * (i + 1) * Math.PI / 180);
        let y2b = 0.8 * radius * Math.sin(angle * (i + 1) * Math.PI / 180);

        // bawah
        vertices.push([x1a, -z, y1a]);
        vertices.push([x1b, -z, y1b]);
        vertices.push([x2b, -z, y2b]);
        vertices.push([x2a, -z, y2a]);

        // atas
        vertices.push([x1a, z, y1a]);
        vertices.push([x1b, z, y1b]);
        vertices.push([x2b, z, y2b]);
        vertices.push([x2a, z, y2a]);

        // samping kiri
        vertices.push([x1a, -z, y1a]);
        vertices.push([x1b, -z, y1b]);
        vertices.push([x1b, z, y1b]);
        vertices.push([x1a, z, y1a]);

        // samping kanan
        vertices.push([x2a, -z, y2a]);
        vertices.push([x2b, -z, y2b]);
        vertices.push([x2b, z, y2b]);
        vertices.push([x2a, z, y2a]);

        // depan
        vertices.push([x1a, -z, y1a]);
        vertices.push([x1a, z, y1a]);
        vertices.push([x2a, z, y2a]);
        vertices.push([x2a, -z, y2a]);

        // belakang
        vertices.push([x1b, -z, y1b]);
        vertices.push([x1b, z, y1b]);
        vertices.push([x2b, z, y2b]);
        vertices.push([x2b, -z, y2b]);
    }

    return vertices;
}

var tubeVertices = tubeFunction(360);

let tubeContent = {
    vertices: [],
    faces: [],
    colors: [],
    normals: []
}

// Create 3D model for tube
create3dModel(tubeContent, tubeVertices);

const tube = new Object();
tube.name = 'tube';
tube.model = tubeContent;

var tubeObject = [
    tube,
];