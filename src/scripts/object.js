var Object = function () {
    this.translate = [0, 0, 0];
    this.rotate = [0, 0, 0];
    this.scale = [1, 1, 1];
    this.localMatrix = matrices.identity();
    this.worldMatrix = matrices.identity();
    this.parent = null;
    this.children = [];
}

Object.prototype.setParent = function (parent) {
    if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
          this.parent.children.splice(ndx, 1);
        }
    }
    if (parent) {
        parent.children.push(this);
    }
    this.parent = parent.name;
}

Object.prototype.computeLocalMatrix = function () {
    var translateMatrix = matrices.translate(this.translate[0], this.translate[1], this.translate[2]);

    var xRotateMatrix = matrices.xRotate(this.rotate[0]);
    var yRotateMatrix = matrices.yRotate(this.rotate[1]);
    var zRotateMatrix = matrices.zRotate(this.rotate[2]);
    var rotateMatrix = matrices.multiply(xRotateMatrix, yRotateMatrix);
    rotateMatrix = matrices.multiply(rotateMatrix, zRotateMatrix);

    var scaleMatrix = matrices.scale(this.scale[0], this.scale[1], this.scale[2]);

    var tempLocalMatrix = matrices.multiply(translateMatrix, rotateMatrix);
    tempLocalMatrix = matrices.multiply(tempLocalMatrix, scaleMatrix);

    this.localMatrix = tempLocalMatrix;
}

Object.prototype.computeWorldMatrix = function (parentWorldMatrix) {
    this.computeLocalMatrix();
    if (parentWorldMatrix) {
        this.worldMatrix = matrices.multiply(parentWorldMatrix, this.localMatrix);
    } else {
        this.worldMatrix = this.localMatrix;
    }

    var parentWorldMatrix = this.worldMatrix;
    this.children.forEach(child => {
        child.computeWorldMatrix(parentWorldMatrix);
    });
}

