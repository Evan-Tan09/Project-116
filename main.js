moustacheX = 0;
moustacheY = 0;
function preload() {
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    moustache = loadImage('https://i.postimg.cc/3x3QzSGq/m.png');
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function gotPoses(results) {
    if ((results.length) > 0) {
        console.log(results);
        console.log("x position of nose: " + results[0].pose.nose.x);
        console.log("y position of nose: " + results[0].pose.nose.y);
        if (results[0].pose.nose.y < 255) {
            moustacheX = results[0].pose.nose.x - 30;
            moustacheY = results[0].pose.nose.y;
        }
    }
}
function draw() {
    image(video, 0, 0, 400, 300);
    image(moustache, moustacheX, moustacheY, 60, 60);
}
function modelLoaded() {
    console.log("Model is loaded");
}