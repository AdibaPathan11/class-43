var mario;
var platformGroup;
var marioAnimation,obstacleAnimation,groundAnimation,wallAnimaton;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
var obstacleGroup;

function preload()
{
 marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
 obstacleAnimation=loadAnimation("images/obstacle1.png");
 wallAnimation=loadAnimation("images/wall.png");
 groundAnimation=loadAnimation("images/ground.png");
 flagAnimation=loadAnimation("images/Flag.png");
}

function setup() {
  createCanvas(displayWidth, 668);

  var countDistanceX = 0;
  var platform;
  var gap;
  console.log(countDistanceX);
  mario=new Player();
  platformGorup=createGroup();
  obstacleGroup=createGroup();

  for (var i=0;i<26;i++)
	 {
     
     frameRate(30)
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);
      gap=random([0,0,0,0,200]);
      countDistanceX = countDistanceX + platform.spt.width + gap; 
      console.log(countDistanceX);

      // adding wall to the game.
      if(i%3===0){
        wall=new Wall(countDistanceX);
        platformGroup.add(wall.spt);
      }

      // adding obstacle to the game.
      if(i%4==0){
        obstacle=new Obstacle(countDistanceX);
        obstacleGroup.add(obstacle.spt)
      }
     }
 
     flag=createSprite(countDistanceX-150,height-320);
     flag.addAnimation("flagimg",flagAnimation);
     flag.scale=0.09;
     flag.setCollider("rectangle",0,0,1100,6520);
}

function draw() {
  background('skyblue'); 
  // code to move the camera.
  translate(-mario.spt.x+width/2,0);
  if(gameState==PLAY){
    if(obstacleGroup.isTouching(mario.spt)||mario.spt.y>height){
      gameState=LOSE;
    }
    if(flag.isTouching(mario.spt)){
      gameState=WIN;
    }
  
  // apply gravity to mario and set coliding with platforms.
  mario.applyGravity();
  mario.spt.collide(platformGroup);

  // calling various function to control mario.
  if(keyDown("left")){
    mario.moveLeft();
  }
  if(keyDown("right")){
    mario.moveRight();
  }
  if(keyDown("up")&& mario.spt.velocityY===0){
    mario.jump();
  }
}
  if(gameState==LOSE){stroke("red");
fill("red");
textSize(40);
text("GAME OVER",mario.spt.x,300);
obstacleGroup.destroyEach();
mario.spt.setVelocity(0,0);
mario.spt.pause();
}
if(gameState=WIN){
  stroke("green");
  fill("green");
  textSize(40);
  text("WINNER",mario.spt.x,300);
  obstacleGroup.destroyEach();
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
}
  drawSprites();
}



