var vectors = {
    substractVecs: (x, y) => {
        res = [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
        return res;
    },

    addVecs: (x, y) => {
        res = [x[0] + y[0], x[1] + y[1], x[2] + y[2]];
        return res;
    },

    scaleVecs: (x, scale) => {
        res = [x[0] * scale, x[1] * scale, x[2] * scale];
        return res;
    },

    crossVecs: (x, y) => {
        res = [
            x[1] * y[2] - x[2] * y[1],
            x[2] * y[0] - x[0] * y[2],
            x[0] * y[1] - x[1] * y[0],
        ];
        return res
    },

    calculateDistance: function(x) {
        res = Math.sqrt(Math.pow(x[0], 2) + Math.pow(x[1], 2) + Math.pow(x[2], 2));
        return res;
    },

    normalizeVec: function(x) {
        let length = this.calculateDistance(x);
        vec = [x[0] / length, x[1] / length, x[2] / length];
        return vec;
    },

    calculateNormal: (x) => {
        let length = x.length;
        let normal = [];
        
        for (let i = 0; i < length - 2; i++) {
            let v1 = {
                x: x[i + 1][0] - x[i][0],
                y: x[i + 1][1] - x[i][1],
                z: x[i + 1][2] - x[i][2],
            };
        
            let v2 = {
                x: x[i + 2][0] - x[i + 1][0],
                y: x[i + 2][1] - x[i + 1][1],
                z: x[i + 2][2] - x[i + 1][2],
            };
        
            let crossVec = [];
            crossVec.push(v1.y * v2.z - v1.z * v2.y);
            crossVec.push(v1.z * v2.x - v1.x * v2.z);
            crossVec.push(v1.x * v2.y - v1.y * v2.x);
        
            // Normalize
            let vectorLen = vectors.calculateDistance(crossVec);
            crossLength = crossVec.length
            for (let i = 0; i < crossLength; i++) {
                if (!crossVec[i]) {
                    crossVec[i] = 0;
                }
                // Division to normalize
                crossVec[i] = crossVec[i] / vectorLen;
          }
          normal = crossVec;
        }

        return normal;
    }
}

// module.exports = vectors;