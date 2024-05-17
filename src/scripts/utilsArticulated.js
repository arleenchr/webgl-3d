function generateColors(vertices, color = null) {
  let colors = [];
  for (let i = 0; i < vertices.length; i += 3) {
    var temp = color;
    if (color == null) {
      temp = [Math.random(), Math.random(), Math.random()];
    } else {
      temp = color;
    }
    colors.push(temp);
    colors.push(temp);
    colors.push(temp);
    colors.push(temp);
    colors.push(temp);
    colors.push(temp);
  }
  return colors;
}

function generateCuboid(height, width, depth, origin) {
  let x_minus = origin[0] - width / 2;
  let x_plus = origin[0] + width / 2;
  let y_minus = origin[1] - height / 2;
  let y_plus = origin[1] + height / 2;
  let z_minus = origin[2] - depth / 2;
  let z_plus = origin[2] + depth / 2;

  let vertices = [
    [x_minus, y_minus, z_minus],
    [x_plus, y_minus, z_minus],
    [x_minus, y_plus, z_minus],
    [x_plus, y_plus, z_minus],
    [x_minus, y_minus, z_plus],
    [x_plus, y_minus, z_plus],
    [x_minus, y_plus, z_plus],
    [x_plus, y_plus, z_plus],
  ];

  let faces = [
    [1, 3, 2],
    [4, 2, 3],
    [1, 2, 5],
    [6, 5, 2],
    [1, 5, 3],
    [5, 7, 3],
    [2, 4, 6],
    [8, 6, 4],
    [4, 3, 8],
    [7, 8, 3],
    [5, 6, 7],
    [8, 7, 6],
  ];

  let normals = vectors.calculateNormal(vertices);

  let colors = generateColors(vertices);

  return {
    vertices: vertices,
    faces: faces,
    normals: normals,
    colors: colors,
  }
}