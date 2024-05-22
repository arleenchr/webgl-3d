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

Object.prototype.remove = function (object) {
    if (this === object) {
        return;
    }

    this.children.forEach(child => {
        if (child === object) {
            var ndx = this.children.indexOf(child);
            if (ndx >= 0) {
                this.children.splice(ndx, 1);
            }
        } else {
            child.remove(object);
        }
    });
}

Object.prototype.addDefaultObject = function (name) {
    var object = new Object();
    object.name = name;
    object.model = generateCuboid(0.5, 0.5, 0.5, [0, 0, 0]);
    object.animation = [];
    object.frames = [];
    object.setParent(this);
}

Object.prototype.saveObject = function () {
    const jsonString = JSON.stringify(this);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

Object.prototype.loadObject = function (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = JSON.parse(e.target.result);
        var newObj = loadObject(data);
        newObj.forEach(object => {
            object.setParent(this);
        });
    }
    reader.readAsText(file);

}

function loadObject(data) {
    objects = [];
    data.forEach(object => {
        var temp = new Object();
        temp.name = object.name;
        temp.model = object.model;
        temp.animation = object.animation;
        temp.frames = object.frames;
        temp.translate = object.translate;
        temp.rotate = object.rotate;
        temp.scale = object.scale;
        temp.localMatrix = object.localMatrix;
        temp.worldMatrix = object.worldMatrix;
        temp.parent = object.parent;

        if (object.children.length > 0) {
            temp.children = loadObject(object.children);
        }

        objects.push(temp);
    });
    
    return objects;
}
