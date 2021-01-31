var tower, towerImage; 
var door, doorImage, dGroup;
var climber, climberImage, cGroup;
var ghost, ghostImage;
var iBlock, iGroup;
var gameState= "play";


function preload(){
  towerImage= loadImage("tower.png");
  doorImage= loadImage("door.png");
  climberImage= loadImage("climber.png");
  ghostImage= loadImage("ghost-standing.png");
  dGroup= new Group();
  cGroup= new Group();
  iGroup= new Group();
}

function setup(){
   createCanvas(600,600);
  tower = createSprite (300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost = createSprite(200,20,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale= 0.5;
}
function draw(){
  background("black");
  if(gameState==="play"){
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();
  if(keyDown("left")){
    ghost.x-=3;
  }
  
  if(keyDown("right")){
    ghost.x+=3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY+=0.8; 
  if (cGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(iGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  drawSprites(); 
}
  if(gameState==="end"){
  stroke("yellow"); 
    fill("yellow");
    textSize(30);
    text("gameOver",230,250);
  }
}
function spawnDoors(){
  if(frameCount%180===0){
  door= createSprite(Math.round(random(120,400)),-50);
  door.addImage("door",doorImage);
    door.velocityY=1;
    door.lifetime=800;    
    dGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth++;
    
    climber =  createSprite(door.x,10);
    climber.addImage("climber",climberImage);
    climber.velocityY=1; 
    climber.lifetime=800;
    cGroup.add(climber);
    
    iBlock= createSprite(door.x,15,climber.width,2);
    iBlock.velocityY=1; 
    iGroup.add(iBlock);
  
  }
}
