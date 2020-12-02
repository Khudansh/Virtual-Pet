var dogImg, happyDogImg, database, foodS, foodStock,dogSprite;
var END=0;
var PLAY=1;
var gameState=PLAY;

function preload(){
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);

  database=firebase.database();

  dogSprite=createSprite(250,250,20,20);
  dogSprite.addImage(dogImg);
  dogSprite.scale=0.5;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() { 
  background(46,139,87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDogImg);
    gameState=END;
  }

  if(keyCode==32){
    normal();
    gameState=PLAY;
  }

  

  drawSprites();
  textSize(20);
  fill("white");
  text("Food:"+foodS,20,20);
  if(gameState==PLAY){
    text("Press Up Arrow To Feed Dog",110,470); 
  }

  if(gameState==END){
    text("Press Space To Make Dog Hungry",110,470); 
  }
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
if(x<=0){
  x=0
}else{
  x=x-1
}
  database.ref('/').update({
    Food:x
  })
}

function normal(){
  dogSprite.addImage(dogImg);
}


