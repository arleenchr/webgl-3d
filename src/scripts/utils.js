// Set Precision For Centroid
const setPrecision = (num) => {
    res = parseFloat(num.toPrecision(6));
    return res;
}

// Find Centroid
const locateCentroid = (mat) => {
    let x = 0;
    let y = 0;
    let z = 0;
    let count = mat.length;

    for (let i = 0; i < count; i++) {
        x = setPrecision(mat[i][0] + x);
        y = setPrecision(mat[i][1] + y);
        z = setPrecision(mat[i][2] + z);
    }
  
    // Find center using average
    x = x / count;
    y = y / count;
    z = z / count;

    return [x, y, z];
}

// Degrees Conversion (Rad -> Deg and Deg -> Rad)
const radianToDegrees = (radian) => {
    deg = (radian * 180) / Math.PI;
    return deg;
}
  
const degreesToRadian = (deg) => {
    radian = (Math.PI * deg) / 180;
    return radian;
}