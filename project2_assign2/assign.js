// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 

let video;
let poseNet;
let pose;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let noseX = 0;
let noseY = 0;
let sound;
let sound2;
let rightWristX
let rightWristY
let leftWristX
let leftWristY


function setup(){
    
sound = createAudio('bubble.mp3'); 
sound2 = createAudio('bass.mp3');
createCanvas(640, 480);
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses)
    
}

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses){
    console.log(poses);
    if( poses.length >0 ){
        
    let nX =  poses[0].pose.keypoints[0].position.x;
    let nY =  poses[0].pose.keypoints[0].position.y;
    let elX = poses[0].pose.keypoints[1].position.x;
    let elY = poses[0].pose.keypoints[1].position.y;
    let erX = poses[0].pose.keypoints[2].position.x;
    let erY = poses[0].pose.keypoints[2].position.y;


    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, elX, 0.5);
    eyelY = lerp(eyelY, elY, 0.5);
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);

        
rightWristX = poses[0].pose.rightWrist.x
rightWristY = poses[0].pose.rightWrist.y
          
leftWristX = poses[0].pose.leftWrist.x
leftWristY = poses[0].pose.leftWrist.y
          
   
} 
    
} 

function draw(){
    

    
let d = dist(noseX, noseY, eyelX, eyelY);  
    
image(video, 0, 0);
    
    noStroke();
    fill(255,0,0);
    ellipse(noseX, noseY, d);  
    
    stroke(255, 204, 0); 
    noFill();
    ellipse(eyelX, eyelY, d); 
        
    stroke(255, 204, 0);
    strokeWeight(4);   
    noFill();
    ellipse(eyerX, eyerY, d);
    
    fill(0,200,100,70);
    stroke(0,200,100);
    rect(0,0,120,windowHeight);
    
    fill(0,200,100,70);
    stroke(0,200,100);
    rect(520,0,120,windowHeight);
    
    //top left
    fill(100,0,100,70);
    stroke(0,200,100);
    rect(0,0,120,140);
    
    //top right
    fill(100,0,100,70);
    stroke(0,200,100);
    rect(520,0,120,140);
    
    //wrist point
    fill(255,0,0);
    noStroke();
    ellipse(rightWristX,rightWristY, d);
    ellipse(leftWristX,leftWristY, d);
    
    
    if(noseX < 120){
    sound.play()
    fill(170,20,170,70);
    stroke(170,20,170);
    rect(0,0,120,windowHeight);
    
  }
    
    if(noseX > 520){
    sound.play()
    fill(170,20,170,70);
    stroke(170,20,170);
    rect(520,0,120,windowHeight);
     
  }
    if(rightWristY < 140 && rightWristX < 120){
    sound2.play()
    fill(160,230,240,70);
    stroke(160,230,240);
    rect(0,0,120,140);
     
  }
    
    if(leftWristY < 140 && leftWristX > 520){
    sound2.play()
    fill(160,230,240,70);
    stroke(160,230,240);
    rect(520,0,120,140);
     
  }

}



