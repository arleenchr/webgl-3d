var matrices = {

    // Multiply 4x4 matrices
    multiply: (x, y) => {
        var x00 = x[0 * 4 + 0];
        var x01 = x[0 * 4 + 1];
        var x02 = x[0 * 4 + 2];
        var x03 = x[0 * 4 + 3];
        var x10 = x[1 * 4 + 0];
        var x11 = x[1 * 4 + 1];
        var x12 = x[1 * 4 + 2];
        var x13 = x[1 * 4 + 3];
        var x20 = x[2 * 4 + 0];
        var x21 = x[2 * 4 + 1];
        var x22 = x[2 * 4 + 2];
        var x23 = x[2 * 4 + 3];
        var x30 = x[3 * 4 + 0];
        var x31 = x[3 * 4 + 1];
        var x32 = x[3 * 4 + 2];
        var x33 = x[3 * 4 + 3];
        var y00 = y[0 * 4 + 0];
        var y01 = y[0 * 4 + 1];
        var y02 = y[0 * 4 + 2];
        var y03 = y[0 * 4 + 3];
        var y10 = y[1 * 4 + 0];
        var y11 = y[1 * 4 + 1];
        var y12 = y[1 * 4 + 2];
        var y13 = y[1 * 4 + 3];
        var y20 = y[2 * 4 + 0];
        var y21 = y[2 * 4 + 1];
        var y22 = y[2 * 4 + 2];
        var y23 = y[2 * 4 + 3];
        var y30 = y[3 * 4 + 0];
        var y31 = y[3 * 4 + 1];
        var y32 = y[3 * 4 + 2];
        var y33 = y[3 * 4 + 3];
    
        res = [
            y00 * x00 + y01 * x10 + y02 * x20 + y03 * x30,
            y00 * x01 + y01 * x11 + y02 * x21 + y03 * x31,
            y00 * x02 + y01 * x12 + y02 * x22 + y03 * x32,
            y00 * x03 + y01 * x13 + y02 * x23 + y03 * x33,
            y10 * x00 + y11 * x10 + y12 * x20 + y13 * x30,
            y10 * x01 + y11 * x11 + y12 * x21 + y13 * x31,
            y10 * x02 + y11 * x12 + y12 * x22 + y13 * x32,
            y10 * x03 + y11 * x13 + y12 * x23 + y13 * x33,
            y20 * x00 + y21 * x10 + y22 * x20 + y23 * x30,
            y20 * x01 + y21 * x11 + y22 * x21 + y23 * x31,
            y20 * x02 + y21 * x12 + y22 * x22 + y23 * x32,
            y20 * x03 + y21 * x13 + y22 * x23 + y23 * x33,
            y30 * x00 + y31 * x10 + y32 * x20 + y33 * x30,
            y30 * x01 + y31 * x11 + y32 * x21 + y33 * x31,
            y30 * x02 + y31 * x12 + y32 * x22 + y33 * x32,
            y30 * x03 + y31 * x13 + y32 * x23 + y33 * x33
        ];

        return res;
    },
  
    // Matrix 1 x 3 (1 dimension)
    normalize: (arr) => {
        let res = [0, 0, 0];
        let distance = vectors.calculateDistance(arr);

        for (let i = 0; i < res.length; i++) {
            res[i] = arr[i] / distance;
        }
    
        return res;
    },
  
    // Get matrix inverse
    inverse: (x) => {
        var x00 = x[0 * 4 + 0];
        var x01 = x[0 * 4 + 1];
        var x02 = x[0 * 4 + 2];
        var x03 = x[0 * 4 + 3];
        var x10 = x[1 * 4 + 0];
        var x11 = x[1 * 4 + 1];
        var x12 = x[1 * 4 + 2];
        var x13 = x[1 * 4 + 3];
        var x20 = x[2 * 4 + 0];
        var x21 = x[2 * 4 + 1];
        var x22 = x[2 * 4 + 2];
        var x23 = x[2 * 4 + 3];
        var x30 = x[3 * 4 + 0];
        var x31 = x[3 * 4 + 1];
        var x32 = x[3 * 4 + 2];
        var x33 = x[3 * 4 + 3];
    
        var y00 = x00 * x11 - x01 * x10;
        var y01 = x00 * x12 - x02 * x10;
        var y02 = x00 * x13 - x03 * x10;
        var y03 = x01 * x12 - x02 * x11;
        var y04 = x01 * x13 - x03 * x11;
        var y05 = x02 * x13 - x03 * x12;
        var y06 = x20 * x31 - x21 * x30;
        var y07 = x20 * x32 - x22 * x30;
        var y08 = x20 * x33 - x23 * x30;
        var y09 = x21 * x32 - x22 * x31;
        var y10 = x21 * x33 - x23 * x31;
        var y11 = x22 * x33 - x23 * x32;
    
        // Calculate determinant
        var det = y00 * y11 - y01 * y10 + y02 * y09 + y03 * y08 - y04 * y07 + y05 * y06;
    
        if (det == 0) {
            return null;
        }

        det = 1.0 / det;
        inv = [
            (x11 * y11 - x12 * y10 + x13 * y09) * det,
            (x02 * y10 - x01 * y11 - x03 * y09) * det,
            (x31 * y05 - x32 * y04 + x33 * y03) * det,
            (x22 * y04 - x21 * y05 - x23 * y03) * det,
            (x12 * y08 - x10 * y11 - x13 * y07) * det,
            (x00 * y11 - x02 * y08 + x03 * y07) * det,
            (x32 * y02 - x30 * y05 - x33 * y01) * det,
            (x20 * y05 - x22 * y02 + x23 * y01) * det,
            (x10 * y10 - x11 * y08 + x13 * y06) * det,
            (x01 * y08 - x00 * y10 - x03 * y06) * det,
            (x30 * y04 - x31 * y02 + x33 * y00) * det,
            (x21 * y02 - x20 * y04 - x23 * y00) * det,
            (x11 * y07 - x10 * y09 - x12 * y06) * det,
            (x00 * y09 - x01 * y07 + x02 * y06) * det,
            (x31 * y01 - x30 * y03 - x32 * y00) * det,
            (x20 * y03 - x21 * y01 + x22 * y00) * det,
        ];

        return inv;
    },
  
    // Get identity matrix
    identity: () => {
        identity = [
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, 1
        ];
        return identity;
    },
  
    // Transpose matrix
    transpose: (x) => {
        transposed = [
            x[0], x[4], x[8], x[12],
            x[1], x[5], x[9], x[13],
            x[2], x[6], x[10], x[14],
            x[3], x[7], x[11], x[15]
        ]
        return transposed;
    },
  
    lookAt: (cameraPos, target, up) => {
        let zAx = vectors.normalizeVec(vectors.substractVecs(cameraPos, target));
        let xAx = vectors.normalizeVec(vectors.crossVecs(up, zAx));
        let yAx = vectors.normalizeVec(vectors.crossVecs(zAx, xAx));
        
        return [
            xAx[0], xAx[1], xAx[2], 0,
            yAx[0], yAx[1], yAx[2], 0,
            zAx[0], zAx[1], zAx[2], 0,
            cameraPos[0], cameraPos[1], cameraPos[2], 1
        ];
    },

    // Rotation x, y, and z
    xRotate: (radian) => {
        var s = Math.sin(radian);
        var c = Math.cos(radian);
        mat = [
            1, 0, 0, 0, 
            0, c, s, 0, 
            0, -s, c, 0, 
            0, 0, 0, 1
        ];

        return mat;
    },
    
    yRotate: (radian) => {
        var s = Math.sin(radian);
        var c = Math.cos(radian);
        mat = [
            c, 0, -s, 0, 
            0, 1, 0, 0, 
            s, 0, c, 0, 
            0, 0, 0, 1
        ];

        return mat;
    },
    
    zRotate: (radian) => {
        var s = Math.sin(radian);
        var c = Math.cos(radian);
    
        mat = [
            c, s, 0, 0, 
            -s, c, 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, 1
        ];

        return mat;
    },

    // Scaling
    scale: (x, y, z) => {
        mat = [
            x, 0, 0, 0, 
            0, y, 0, 0, 
            0, 0, z, 0, 
            0, 0, 0, 1
        ];

        return mat;
    },

    // Translation
    translate: (x, y, z) => {
        mat = [
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            0, 0, 1, 0, 
            x, y, z, 1
        ];

        return mat;
    },

    // Projections
    perspective: (fieldViewRad, aspect, near, far) => {
        var f = Math.tan(Math.PI * 0.5 - fieldViewRad * 0.5);
        var top = near * Math.tan(fieldViewRad * 0.5);
        var right = top * aspect;

        mat = [
            near / right, 0, 0, 0,
            0, near / top, 0, 0,
            0, 0, (near + far) * (1.0 / (near - far)), -1,
            0, 0, near * far * (1.0 / (near - far)) * 2, 0,
        ];

        return mat;
    },

    orthographic: (left, right, bottom, top, near, far) => {
        let x1 = right - left;
        let y1 = top - bottom;
        let z1 = far - near;

        let x2 = right + left;
        let y2 = top + bottom;
        let z2 = far + near;

        mat = [
            2 / x1, 0, 0, 0,
            0, 2 / y1, 0, 0,
            0, 0, -2 / z1, 0,
            -x2 / x1, -y2 / y1, -z2 / z1, 1,
        ];

        return mat;
    },

    oblique: (degTheta, phi, prevOrthoMatrices) => {
        let cotanP = -1 / Math.tan(degreesToRadian(phi));
        let cotanT = -1 / Math.tan(degreesToRadian(degTheta));

        shearMatrices = [
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            cotanT, cotanP, 1, 0, 
            0, 0, 0, 1
        ];

        orthoMatrices = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        ];

        firstMulResult = matrices.multiply(
            shearMatrices, prevOrthoMatrices);

        mat = matrices.multiply(
            firstMulResult, orthoMatrices);

        return firstMulResult;
    },
};
  