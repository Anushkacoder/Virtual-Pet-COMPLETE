var foodref,foodz,food;
var time;
var database;
var reset;
var state;
var stater;
var happyDog, hungryDOG;
var happyCAT, hungryCAT;
var happyMACAW, hungryMACAW;
var happyHAMSTER, hungryHAMSTER;
var happyRABBIT, hungryRABBIT;
var background1 , background1IMG;
var background2 , background2IMG;
var background3 , background3IMG;
var dogfood, milk, carrot, berry, cheese;
var button1, button2, button3, button4, button5;
var foodOBJ1, foodOBJ2, foodOBJ3, foodOBJ4, foodOBJ5;
var vendor, v;
var bedroomIMG, washroomIMG, gardenIMG;

function preload(){
  background1IMG = loadImage("bbackground.jpg");
  background2IMG = loadImage("store.png");

  happyDogIMG = loadImage("dogImg1.png");
  hungryDogIMG = loadImage("dogImg.png");
  happyCatIMG = loadImage("cat(happy).png");
  hungryCatIMG = loadImage("cat(hungry).png");
  happyHamsterIMG = loadImage("hamster(happy).png");
  hungryHamsterIMG = loadImage("hamster(hungry).png");
  happyRabbitIMG = loadImage("rabbit(happy).png");
  hungryRabbitIMG = loadImage("rabbit(hungry).png");
  happyMacawIMG = loadImage("macaw(happy).png");
  hungryMacawIMG = loadImage("macaw(hungry).png");

  dogfoodIMG = loadImage("dogfood.png");
  milkIMG = loadImage("milk.png");
  carrotIMG = loadImage("carrot.png");
  berryIMG = loadImage("berry.png");
  cheeseIMG = loadImage("cheese.png");

  button1IMG = loadImage("button.jpg");

  v = loadImage("v.png");

  gardenIMG = loadImage("Garden.png");
  bedroomIMG = loadImage("Bed Room.png");
  washroomIMG = loadImage("Wash Room.png");
  livingIMG = loadImage("Living Room.png");
}
function setup(){
  createCanvas(1330,500);
  background1 = createSprite(width/2,height/2,1000,500);
  background1.addImage(background1IMG);
  background1.scale = 0.2;

  background2 = createSprite(width/2,height/2,1000,500);
  background2.addImage(background2IMG);
  background2.scale = 1.7;
  background2.visible = false;

  vendor = createSprite(1100,280,20,20);
  vendor.addImage(v);
  vendor.scale = 1.9;
  vendor.visible = false;

  button1 = createSprite(670,230,50,50);
  button1.addImage(button1IMG);
  button1.scale = 0.5;
  button1.visible = false;

  dogfood = createSprite(450,250,50,50);
  dogfood.addImage(dogfoodIMG);
  dogfood.scale = 0.3;
  dogfood.visible = false;

  dog = createSprite(230,250,50,50);
  dog.addImage(happyDogIMG);
  dog.scale = 0.4;
  dog.visible = false;

  reset = createButton("REFILL THE PROVISIONS");
  reset.position(width/2-30,530);
  reset.style('width','170px');
  reset.style('height','45px');
  reset.style('background','orange');
  reset.style('color','white');

  pet = createInput("                                  WHAT WOULD YOUR PET'S NAME BE ?  (Input the name here & press ENTER)");
  pet.position(350,5);
  pet.size(750,20);
  pet.style('background','black');
  pet.style('color','white');

  foodOBJ2 = new DogFood();

  database = firebase.database();
  foodOBJ2.getFoodStock();
  state = database.ref('gameState');
  state.on('value',reading);
}
function reader(data){
  time = data.val();
}
 
function updater(t){
  database.ref('/').update({
     LastFed : t
  })
  }
  function reading(data){
    stater = data.val();
  } 
  function updating(s){
    database.ref('/').update({
      gameState : s
    })
  }
function draw(){
  background("black");
 
  h = hour();

  if(keyDown("space")){
    background1.visible = false;
    background2.visible = true;
  }
  
  lastFedTime = database.ref('LastFed');
  lastFedTime.on('value',reader);

  drawSprites();

  if(mousePressedOver(button1)){
    background2.destroy();
    button1.destroy();
    dog.visible = true;
    dogfood.visible = true;
  }


  if(background2.visible == true){
    button1.visible = true;
  }  
  if(dog.visible == true){
    foodOBJ2.display();
    vendor.visible = true;
    feed = createButton("FEED YOUR PET FOOD");
    feed.position(190,50);
    feed.style('width','170px');
    feed.style('height','30px');
    feed.style('background','red');
    feed.style('color','white');
    feed.mousePressed(hope1);
    reset.mousePressed(()=>{
      refill2();
    })
    if(h == time+1){
      createCanvas(500,700);
      // reset.hide();
      background("black");
      foodOBJ2.garden();
       updating(1);
    }
    if(h == time+2){
      createCanvas(500,700);
      background("black");
      updating(2);
      //feed.hide();
      // reset.hide();
      foodOBJ2.washroom();
        }
    if(h == time+3){
      createCanvas(500,700);
      background("black");
      updating(3);
      //feed.hide();
      // reset.hide();
      foodOBJ2.bedroom();
  
    }
    if(h == time+4){
      createCanvas(500,700);
      background("black");
      updating(4);
      //feed.hide();
      // reset.hide();
      foodOBJ2.livingroom();
    }
    else{
      updating(0);
    }
    if(time >= 12){
      textSize(27);
      fill("yellow");
      textFont("Algerian");
      text("LAST FEED TIME AT: " + time%12 + " PM",110,110);
    }
   else if(time <= 12){
     textSize(27);
     fill("yellow");
     textFont("Algerian");
     text("LAST FEED TIME AT: " + time%12 + " AM",110,110);
    }
    textSize(30);
    fill("red");
    text("DOG FOOD : "+foodz,170,680);
  }

  if(keyDown("enter")){
    let u = pet.value();
    pet.hide();
    y = createElement('h2', u);
    y.position(200,150);
    y.style('color','black');
    y.style('font-size','50px');
  }
 }
 function hope1(){
   createCanvas(1330,500);
  foodOBJ2.updateFoodStock(foodz-1);
  updater(h);
  textSize(30);
    textFont("Algerian");
    fill("brown");
    text("THANK YOU !! :)",420,120);
    dog.addImage(hungryDogIMG);
 }

function refill2(){
  foodOBJ2.display();
  foodOBJ2.updateFoodStock(foodz+1);
}