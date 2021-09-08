const {World, Engine, Bodies, Body, Constraint} = Matter;

var engine, world, canvas;
var backgroundImg1, backgroundImg2, backgroundImg3;
var thor ;
var stepsOn = [];

const BEGINNING = 0;
const PLAY_LEVEL1 = 1;
const PLAY_LEVEL2 = 2;
const GAME_END1 = 3 ;
const GAME_END2 = 4 ;

var gameState = 1;
var ground, stand, standImg, left_Wall, right_wall;
var steps = [];
var deaths = [];
var randX, randVelocity; 

const LEFT = -5;
const RIGHT = 5;
var right_change  = [RIGHT, RIGHT, RIGHT, RIGHT];
var left_change  = [LEFT, LEFT, LEFT];
var deathImg, death;
var death_V_change = [0, 0, 0, 0, 0, 0, 0];

var left_ellipses = [];
var right_ellipses = [];

var weaponImg = [];
var weapons = [];
var swordOfDeathImg;
var ellipse_swords = [];
var weapon_visible = [ 1, 0, 0, 0, 0, 0, 0];
var death_feedback = [0, 0, 0, 0, 0, 0, 0];
var deathFeedbacks = [];



function preload(){
  backgroundImg1 = loadImage("assets/backgroundImg1.jpg");
  backgroundImg2 = loadImage("assets/backgroundImg2.jpg");
  backgroundImg3 = loadImage("assets/backgroundImg3.jpg");
  deathImg = loadImage("assets/death1.png");
  death_feedback_Img = loadImage("assets/death_feedback.png");

  standImg = loadImage("assets/ground.png");
  stepFireImage = loadImage("assets/fireStep.png")

  weaponImg[0] = loadImage("assets/weapons/weapon1.png");
  weaponImg[1] = loadImage("assets/weapons/weapon2.png");
  weaponImg[2] = loadImage("assets/weapons/weapon3.png");
  weaponImg[3] = loadImage("assets/weapons/weapon4.png");
  weaponImg[4] = loadImage("assets/weapons/weapon5.png");
  weaponImg[5] = loadImage("assets/weapons/weapon6.png");
  weaponImg[6] = loadImage("assets/weapons/weapon7.png");

  swordOfDeathImg = loadImage("assets/weapons/swordOfDeath.png");

}

function setup() {
  engine = Engine.create();
  world = engine.world;
  canvas = createCanvas(windowWidth,windowHeight);

  // ground create 
  ground = createSprite(width/2, height+10 , width, 20);
  
if(gameState === 1){

// beginning stand point 
stand = createSprite(100, height -10, 200, 20);
stand.addImage(standImg);
stand.scale = 0.1;
stand.setCollider("rectangle", 0, -90, stand.width, 20);


// steps create 
  for (var j = 50; j < height-100; j = j +100){
    randX = random(200, width - 200);
    var step = createSprite(randX, j, 200, 15);
    //step.addImage(stepFireImage);
    //step.scale = 0.1
    steps.push(step);
    randVelocity = random(-3, 3);
  }
  


// create death 
  for (var i = 0; i < steps.length; i++){
    // create invisible steps to collide
    stepOn = createSprite(steps[i].x, steps[i].y, steps[i].width - 1, steps[i].height -1);
    stepsOn.push(stepOn);
    stepOn.visible = false;

    death = createSprite(steps[i].x, steps[i].y -33);
    deaths.push(death);
    death.addImage(deathImg);
    death.scale = 0.06;

      var deathFeedback_y = [ (height-100) - 0*100,
        (height-100) - 1*100,
        (height-100) - 2*100,
        (height-100) - 3*100,
        (height-100) - 4*100,
        (height-100) - 5*100,
        (height-100) - 6*100
      ]
      var x = 45;
      var y = deathFeedback_y[i];
      var deathFeedback = createSprite(x , y);
      deathFeedbacks.push (deathFeedback);
      deathFeedback.addImage(death_feedback_Img);
      deathFeedback.scale = 0.035
      deathFeedback.visible = false;
  }

// create feedback_ellipses
  for(var i =0; i<7; i++){
    var left_ellipse = new Feedback_ellipse(50, (height-100) - i*100, 30);
    left_ellipses.push(left_ellipse);

    var right_ellipse = new Feedback_ellipse(width - 60, (height-100) - i*100, 30);
    right_ellipses.push(right_ellipse);
  }

// create Thorgrin 
   thor = createSprite(stand.x, stand.y-50, 10, 40);
   thor.shapeColor = "red";
   //thor.addImage("weapon1", swordOfDeathImg);
   //thor.scale = 0.2;

// create weapons
for(var i = 0; i<7; i++){
  var weaponPosition = [
    [400, 300],
    [width-400, 600],
    [width-400, 200],
    [width/2 , 100],
    [width-width/2, 400],
    [width/2-500, 50],
    [200, 500]
  ]

  var x = weaponPosition[i][0];
  var y = weaponPosition[i][1];
  var weapon = createSprite(x, y);
  weapon.addImage(weaponImg[i]);
  weapon.scale = 0.2
  weapons.push(weapon);
  
}


}


}

function draw() {
  Engine.update(engine);

  if(gameState === BEGINNING){
    beginning();
  }
  if(gameState === PLAY_LEVEL1){
    play_level_1();
  }
  if(gameState === PLAY_LEVEL2){
    play_level_2();
  }
  if(gameState === GAME_END1){
    game_end_1();
  }
  if(gameState === GAME_END2){
    game_end_2();
  }

  // draw sprites
   push ();
   fill(0,0,0, 100);
   drawSprites();
   pop ();

  /*fill (255);
  textFont("jokerman");
  textSize(60);
  stroke (255);
  text("hello", 200, 200);*/
}

function beginning(){
  background(backgroundImg1);  

  
}
function play_level_1(){
  // background set
  background(backgroundImg2);  
  // add gravity 
  thor.velocityY = thor.velocityY + 0.5;


  for(var step of steps){
    step.shapeColor = rgb(255, 255);
  }
  for(var ellipse of left_ellipses){
    ellipse.display(0,255,239, 70);
  }
  for(var ellipse of right_ellipses){
    ellipse.display(255,0, 0, 70);
  }
   /*for(var ellipse of ellipse_swords){
    ellipse.display(57,255, 20, 70);
   }*/


if(steps !== undefined){
  // steps[0] velocity set
  if(right_change[0] === RIGHT){
      steps[0].velocityX = 5;
  }
  if(steps[0].x > width-150){
      right_change[0] = LEFT;
      steps[0].velocityX = -5;
  }
  if(steps[0].x < 150){
      steps[0].velocityX = 5;
  }

  // steps[2] velocity set
  if(right_change[1] === RIGHT){
    steps[2].velocityX = 4;
  }
  if(steps[2].x > width-150){
      right_change[1] = LEFT;
      steps[2].velocityX = -4;
  }
  if(steps[2].x < 150){
      steps[2].velocityX = 4;
  }
  
  // steps[4] velocity set
  if(right_change[2] === RIGHT){
    steps[4].velocityX = 6;
  }
  if(steps[4].x > width-150){
    right_change[2] = LEFT;
    steps[4].velocityX = -6;
  }
  if(steps[4].x < 150){
    steps[4].velocityX = 6;
  }
  
  // steps[6] velocity set
  if(right_change[3] === RIGHT){
    steps[6].velocityX = 3;
  }
  if(steps[6].x > width-150){
    right_change[3] = LEFT;
    steps[6].velocityX = -3;
  }
  if(steps[6].x < 150){
    steps[6].velocityX = 3;
  }
  
  // steps[1] velociy set 
  if(left_change[0]=== LEFT){
    steps[1].velocityX = -3;
  }
  if(steps[1].x < 150){
    left_change[0] = RIGHT;
    steps[1].velocityX = 3;
  }
  if(steps[1].x > width-150){
    steps[1].velocityX = -3;
  }

  // steps[3] velociy set 
  if(left_change[1]=== LEFT){
    steps[3].velocityX = -4;
  }
  if(steps[3].x < 150){
    left_change[1] = RIGHT;
    steps[3].velocityX = 4;
  }
  if(steps[3].x > width-150){
    steps[3].velocityX = -4;
  }

  // steps[5] velociy set 
  if(left_change[2]=== LEFT){
    steps[5].velocityX = -6;
  }
  if(steps[5].x < 150){
    left_change[2] = RIGHT;
    steps[5].velocityX = 6;
  }
  if(steps[5].x > width-150){
    steps[5].velocityX = -6;
  }
}
if(deaths !== undefined){

    for(var i = 0; i < steps.length; i++){

      let right = steps[i].velocityX;
      let left = -steps[i].velocityX

      if(steps[i].velocityX === right){
        if(death_V_change[i]===0){
          deaths[i].velocityX = -7
        }
        if(deaths[i].x <= steps[i].x -80){
          death_V_change[i]= 1 ;

          deaths[i].velocityX = 7;
        }
        if(deaths[i].x >= steps[i].x +80){
          deaths[i].velocityX = -7;
        }
        
    
      }
      if(steps[i].velocityX === left){
        if(death_V_change[i+1]===0){
          deaths[i].velocityX = -7;
        }
        if(deaths[i].x <= steps[i].x -80){
          death_V_change[i+1] = 1;
          deaths[i].velocityX = 1;
        }
        if(deaths[i].x >= steps[i].x +80){
          deaths[i].velocityX = -7;
        }
    } 
    
    }
}
    for(var i = 0; i< 7; i++){

      if(weapon_visible[i] === 0){
        weapons[i].visible = false;
    
      }
      if(weapon_visible[i] === 1){
        weapons[i].visible = true;
      }
    if(weapon_visible[i] === 2){

      var weapons_feedback_y =
      [ (height-100) - 0*100,
        (height-100) - 1*100,
        (height-100) - 2*100,
        (height-100) - 3*100,
        (height-100) - 4*100,
        (height-100) - 5*100,
        (height-100) - 6*100
      ];
      weapons[i].position.x = width - 60;
      weapons[i].position.y = weapons_feedback_y[i];
      weapons[i].scale = 0.15;
  
      }
    }
if(weapons !== undefined){
// [0]
    if(weapon_visible[0]=== 1 && thor.isTouching(weapons[0])){
        weapon_visible[0] = 2
    }
    if(weapon_visible[0] === 2 && thor.isTouching(steps[0])){
      deaths[0].visible = false;
      if(death_feedback[0] === 0){
        death_feedback[0] = 1;
      }
    }if(death_feedback[0]===1){
      deathFeedbacks[0].visible = true;
      weapon_visible[1] = 1;
    }
// [1]  
  if(weapon_visible[1]=== 1 && thor.isTouching(weapons[1])){
      weapon_visible[1] = 2
  }
if(weapons[1].x === width - 60){
  if(thor.isTouching(steps[1])){
    deaths[1].visible = false;
    if(death_feedback[1] === 0){
      death_feedback[1] = 1;
    } }
  }if(death_feedback[1]===1){
    deathFeedbacks[1].visible = true;
    weapon_visible[2] = 1;
  }

// [2]  
if(weapon_visible[2]=== 1 && thor.isTouching(weapons[2])){
  weapon_visible[2] = 2
}
if(weapons[2].x === width - 60){
if(thor.isTouching(steps[2])){
  deaths[2].visible = false;
    if(death_feedback[2] === 0){
      death_feedback[2] = 1;
    } }
}if(death_feedback[2]===1){
    deathFeedbacks[2].visible = true;
    weapon_visible[2+1] = 1;
}

// [3]  
if(weapon_visible[3]=== 1 && thor.isTouching(weapons[3])){
  weapon_visible[3] = 2
}
if(weapons[3].x === width - 60){
if(thor.isTouching(steps[3])){
  deaths[3].visible = false;
    if(death_feedback[3] === 0){
      death_feedback[3] = 1;
    } }
}if(death_feedback[3]===1){
    deathFeedbacks[3].visible = true;
    weapon_visible[3+1] = 1;
}

// [4]  
if(weapon_visible[4]=== 1 && thor.isTouching(weapons[4])){
  weapon_visible[4] = 2
}
if(weapons[4].x === width - 60){
if(thor.isTouching(steps[4])){
  deaths[4].visible = false;
    if(death_feedback[4] === 0){
      death_feedback[4] = 1;
    } }
}if(death_feedback[4]===1){
    deathFeedbacks[4].visible = true;
    weapon_visible[4+1] = 1;
}

// [5]  
if(weapon_visible[5]=== 1 && thor.isTouching(weapons[5])){
  weapon_visible[5] = 2
}
if(weapons[5].x === width - 60){
if(thor.isTouching(steps[5])){
  deaths[5].visible = false;
    if(death_feedback[5] === 0){
      death_feedback[5] = 1;
    } }
}if(death_feedback[5]===1){
    deathFeedbacks[5].visible = true;
    weapon_visible[5+1] = 1;
}

// [6]  
if(weapon_visible[6]=== 1 && thor.isTouching(weapons[6])){
  weapon_visible[6] = 2
}
if(weapons[6].x === width - 60){
  if(thor.isTouching(steps[6])){
    deaths[6].visible = false;
    if(death_feedback[6] === 0){
      death_feedback[6] = 1;
    } }
}if(death_feedback[6]===1){
    deathFeedbacks[6].visible = true;
    weapon_visible[6+1] = 1;
}

}



  // move thor 
  if(keyDown(LEFT_ARROW)){
    thor.y -=10;
    thor.x -=3;
  }
  if(keyDown(RIGHT_ARROW)){
    thor.y -=10;
    thor.x +=3;
  }
  /*if(keyDown(DOWN_ARROW)){
    thor.y +=10;
  }
  if(keyDown(UP_ARROW)){
    thor.y -=10;
  }*/

  // collide
  thor.collide(stand);
  thor.collide(ground);
  thor.collide(stepOn)
  for (var i = 0; i< steps.length; i++){
    stepsOn[i].x = steps[i].x;
    thor.collide(stepsOn[i]); 

    for(var step of steps){

      if(thor.isTouching(steps[i])){
        thor.velocityX = steps[i].velocityX
      }
      if(!thor.isTouching(steps)){
        thor.velocityX = 0;    }
    }

    
  }
  
  
  
  
  
               
}
function play_level_2(){
  background(backgroundImg3);  

}
function game_end_1(){
  background(backgroundImg2);  

}
function game_end_2(){
  background(backgroundImg3);  

}
class Feedback_ellipse{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.image = loadImage("assets/R5.png")
  }display(r, g, b, a){
    noStroke();

    fill(r, g, b, a);
    //fill('#ddbac0');

    // imageMode(CENTER)
    // image (this.image ,this.x, this.y, 100, 100);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r);
  }
}
