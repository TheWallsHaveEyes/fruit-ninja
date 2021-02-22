//Game States
var PLAY=1;
var END=0;
var gameState=1;

var backGround ,backGroundImage;

var knife;
var knifeImage ;

var swooshSound , gameOverSound;

var fruit ,fruit1 ,fruit2 ,fruit3 ,fruit4;

var bomb ,bombImage;

var velcity=-7;

var gameOverImage;

function preload(){
  
  knifeImage=loadImage("knife-1.png");
  swooshSound=loadSound("knifeSwoosh.mp3")
  
  fruit1=loadImage("fruitninja Apple.png");
  fruit2=loadImage("wtrmln2.png");
  fruit3=loadImage("fruitninja Pomegranate.png");
  fruit4=loadImage("Pineapple2.png");
  
  backGroundImage=loadImage("fruit ninja backround.jpg")
  
  bombImage=loadImage("Bomb_FNPIB2.png");
  
  gameOverImage=loadImage("gameover.png")
  gameOverSound=loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
 
  
  backGround=createSprite(300,300,400,400)
  backGround.addImage(backGroundImage);
  backGround.scale=3.4;
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  
  
  score=0;
  //create fruit and monster Group variable here
  fruitGroup=createGroup();
  bombGroup=createGroup();
}

function Fruit(){
  if(World.frameCount%80==0){
    fruit=createSprite(200,600,20,20);
    fruit.scale=0.2;
    //fruit.debugtrue
    r=Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1);
      fruit.scale=0.1;
    } else if(r===2){
      fruit.addImage(fruit2);
    } else if(r===3){
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    /*if(fruit.y===400){
      fruit.velocityX=2;
    }*/
    
    r=Math.round(random(1,2));
    
    fruit.x=Math.round(random(50,340));
    
    if(r===1){
      fruit.velocityY=-7;
      fruit.setLifetime=100;
      
      if(score>0 && score%5 === 0){
        fruit.velocityY=fruit.velocityY-5;
      }
    } else {
      fruit.y=0;
      fruit.velocityY=7
      
      if((score>0) && (score%5 === 0)){
        fruit.velocityY=fruit.velocityY+5;
      }
    }
    
    
    
    fruitGroup.add(fruit);
  }
}

function Bomb(){
  if(World.frameCount%200==0){
    bomb=createSprite(200,600,20,20);
    bomb.scale=0.2;
    //bomb.debugtrue
    bomb.addImage(bombImage);
    
    r=Math.round(random(1,2));
    
    bomb.x=Math.round(random(50,340));
  
    if(r===1){
      bomb.velocityY=-7;
      bomb.setLifetime=100;
    } else {
      bomb.y=0;
      bomb.velocityY=7
    }
    
    
    bombGroup.add(bomb);
  }  
}


function draw() {
  background("brown");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    Fruit();
    Bomb();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
     if(knife.isTouching(fruitGroup)){
       fruitGroup.destroyEach();
       swooshSound.play();
       score=score+1
     }
    // Go to end state if knife touching enemy
     if(knife.isTouching(bombGroup)){
       gameState=END
       bombGroup.destroyEach();
       gameOverSound.play();
     }
  }
  
  if(gameState===END){
    knife.y=300;
    knife.x=300
    
    knife.addImage(gameOverImage);
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
