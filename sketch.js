//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload(){
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(225, 225, 50, 50);
  dog.addImage(dogImage);
  dog.scale = 0.1;
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

}


function draw() {  
  background(46, 139, 87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage)
  }
  if(keyWentDown(DOWN_ARROW)){
    foodS = 15;
  };

  drawSprites();
  //add styles here
  stroke("white");
  text("Food left: " + foodS, 250,200);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x--;
  }

  database.ref('/').update({
    food: x
  })
}



