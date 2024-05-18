function addFramesToObject(object) {
    object.frames = [];
    let count_animation = object.animation.length;
    let temp_frames;

    if (count_animation > 1) {
        for (let i = 0; i < count_animation - 1; i++) {
            temp_frames = generateFrame(object.animation[i], object.animation[i+1], 10);
            object.frames = object.frames.concat(temp_frames);
        }
    }
    return ;
}

function generateFrame(firstFrame, lastFrame, frameRate) {
    let frames = [];
    let delta_translate = vectors.substractVecs(lastFrame.translate, firstFrame.translate);
    let delta_rotate = vectors.substractVecs(lastFrame.rotate, firstFrame.rotate);
    let delta_scale = vectors.substractVecs(lastFrame.scale, firstFrame.scale);
    
    let temp_frame = {
        translate: null,
        rotate: null,
        scale: null,
    };

    for (let i = 0; i < frameRate - 1; i++) {
        let t = i / (frameRate - 1);
        temp_frame.translate = vectors.addVecs(firstFrame.translate, vectors.scaleVecs(delta_translate, t));
        temp_frame.rotate = vectors.addVecs(firstFrame.rotate, vectors.scaleVecs(delta_rotate, t));
        temp_frame.scale = vectors.addVecs(firstFrame.scale, vectors.scaleVecs(delta_scale, t));
        frames.push(
            {
                translate: vectors.addVecs(firstFrame.translate, vectors.scaleVecs(delta_translate, t)),
                rotate: vectors.addVecs(firstFrame.rotate, vectors.scaleVecs(delta_rotate, t)),
                scale: vectors.addVecs(firstFrame.scale, vectors.scaleVecs(delta_scale, t)),
            }
        );
        console.log(frames);    
    }

    frames.push(lastFrame);

    return frames;
}