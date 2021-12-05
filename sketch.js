//global variables declaration
var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;

//function preload used to load all game assets
function preload(){
  
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
  brickImage = loadImage("images/brick.png");
  coinSound = loadSound("sounds/coinSound.mp3");
  coinImage = loadAnimation("images/con1.png",
  "images/con2.png","images/con3.png",
  "images/con4.png","images/con5.png","images/con6.png");

  mushObstacleImage = loadAnimation("images/mush1.png",
  "images/mush2.png","images/mush3.png","images/mush4.png",
  "images/mush5.png","images/mush6.png");
  turtleObstacleImage = loadAnimation("images/tur1.png",
  "images/tur2.png","images/tur3.png","images/tur4.png",
  "images/tur5.png");

  //dieSound = loadSound("sounds/dieSound.mp3");
  
}
//body of setup function
function setup() {
  //canvas size declared of 1000*600
  createCanvas(1000, 600);

  //bg sprite created
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
 
  bg.velocityX = -6;

  //mario sprite created
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale =0.3;

  //ground sprite created
  ground = createSprite(200,585,400,10);
  ground.visible = false;

  //declaration of groups-
  bricksGroup = new Group();
  coinsGroup = new Group();
  obstaclesGroup = new Group();
}

//body of function draw(this is continuous loop)
function draw() {
 //to move the background smoothly
  if (bg.x < 100){
    bg.x=bg.width/4;
  }

  //to let the mario move inside canvas area
  if(mario.x<200){
    mario.x=200;
  }


  //to prevent mario escaping outside y axis
  if(mario.y<50){
    mario.y=50;
  }


  //to jump the mario sprite
  if(keyDown("space") ) {
    mario.velocityY = -16;
  }
  mario.velocityY = mario.velocityY + 0.5;
  
  
  generateBricks();//calling of generateBricks function

  for(var i = 0 ; i< (bricksGroup).length ;i++){
    var temp = (bricksGroup).get(i) ;
    
    if (temp.isTouching(mario)) {
       mario.collide(temp);
      }
        
    }
  
  
    generateObstacles();//calling of generateObstacles function
    
    generateCoins();//calling of genearteCoins function
    
    for(var i = 0 ; i< (coinsGroup).length ;i++){
      var temp = (coinsGroup).get(i) ;
      
      if (temp.isTouching(mario)) {
        coinSound.play();
        coinScore++;//to increment the coinScore by 1
        temp.destroy();
        temp=null;
        }
          
      }
  
  mario.collide(ground);//prevent the mario from falling down

  drawSprites();
  textSize(20);//to increase the textSize of score
  fill("brown")
  text("Coins Collected: "+ coinScore, 500,50);//to display Score
  
}

//body of function generateBricks
function generateBricks() {
  if (frameCount % 70 === 0) {
    //brick sprite declared
    var brick = createSprite(1200,120,40,10);
    brick.y = random(50,450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    
    brick.lifetime =250;
    bricksGroup.add(brick);
  }
}

//body of function generateCoins
function generateCoins() {
  if (frameCount % 50 === 0) {
    //coin sprite declared
    var coin = createSprite(1200,120,40,10);
    coin.addAnimation("coin", coinImage);
    coin.y = random(80,350);
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

//body of function generateObstacles
function generateObstacles() {
  if(frameCount % 100 === 0) {
    //obstacle sprite declared
    var obstacle = createSprite(1200,545,10,40);
    obstacle.velocityX = -4;
    obstacle.scale=0.2;
    var r= Math.round(random(1,2));//MAth.round to round off the value of random function
    console.log(r);
    //switch to implement the case to chose between both the obstacles
    switch(r){
    case 1:
        obstacle.addAnimation("mush",mushObstacleImage);
        break;
    case 2:
      obstacle.addAnimation("turtle", turtleObstacleImage);
        break;
    default:
        break;    
    }
   
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  
  }
}
