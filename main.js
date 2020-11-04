song = ""
left_wrist_y = 0;
right_wrist_y = 0;
rightWrist_score = 0;
leftWrist_score = 0;

function preload() {
    song = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center()
    video = createCapture(VIDEO);
  
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function modelLoaded() {
    console.log("poseNet is initialized")
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;
        left_wrist_y = results[0].pose.leftWrist.y
        right_wrist_y = results[0].pose.rightWrist.y
        left_wrist_x = results[0].pose.leftWrist.x
        right_wrist_x = results[0].pose.rightWrist.x
        console.log("left wrist y=" + results[0].pose.leftWrist.y);
        console.log("right wrist y =" + results[0].pose.rightWrist.y);
        console.log("left wrist x=" + results[0].pose.leftWrist.x);
        console.log("right wrist x =" + results[0].pose.rightWrist.x);
        console.log("left wrist score=" + results[0].pose.keypoints[9].score);
        console.log("right wrist score =" + results[0].pose.keypoints[10].score);

    }

}
function draw() {
    image(video, 0, 0, 400, 400);
if(rightWrist_score > 0.2)
{
    circle(right_wrist_x, right_wrist_y, 30);
    fill('red');

    if (right_wrist_y > 0 && right_wrist_y <= 100) {
        document.getElementById("speed").innerHTML = "0.5x"
        song.rate(0.5)
    }
    else if (right_wrist_y > 100 && right_wrist_y <= 200) {
        document.getElementById("speed").innerHTML = "1x"
        song.rate(1)
    }
    else if (right_wrist_y > 200 && right_wrist_y <= 300) {
        document.getElementById("speed").innerHTML = "1.5x"
        song.rate(1.5)
    }
    else if (right_wrist_y > 300 && right_wrist_y <= 400) {
        document.getElementById("speed").innerHTML = "2x"
        song.rate(2)
    }
    else if (right_wrist_y > 400 && right_wrist_y <= 500) {
        document.getElementById("speed").innerHTML = "2.5x"
        song.rate(2.5)
    }

}
    
    if (leftWrist_score > 0.2) {
        circle(left_wrist_x, left_wrist_y, 30)
        fill('red')
        InNumberleft_wrist_y = Number(left_wrist_y);
        remove_decimals = floor(InNumberleft_wrist_y)
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = volume;
        song.setVolume(volume);
    }
    if (rightWrist_score > 0.2) {
        circle(right_wrist_x, right_wrist_y, 30)
        fill('red')
    }
}
function play() {
    song.play()
}
function stop() {
    song.stop()
    song.setVolume(1);
    song.rate(1);
}