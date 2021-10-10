var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score = 0;
var count = 0;
var gameState = "play";
var particle;


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=800; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 75; j <=width; j=j+50)
  {
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 50; j <=width-10; j=j+50)
  {
    plinkos.push(new Plinko(j, 375));
  }
    
}
 


function draw() {
  background("black");
  textSize(20)
 
  Engine.update(engine);
  ground.display();
  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  //create the particles using frameCount
  if(frameCount % 60 == 0){
    particles.push(new Particles(random(0,800), 0));
  }

  //display the particles
  for (var k = 0; k < particles.length; k++) {
    particles[k].display();
  }

  if(gameState == "play"){
    noStroke();
    textSize(35)
    fill("white")
    text("Score  " + score, 300, 760)
  }

  if(particle != null){
    particle.display();

    if(particle.body.position.y > 760){
      if(particle.body.position.x < 300){
        score = score + 500;
        particle = null;
      }
    
      if(particle.body.position.x > 301){
        score = score + 100;
        particle = null;
      }
      
      if(particle.body.position.x < 600){
        score = score + 100;
        particle = null;
      }
    
      if(particle.body.position.x > 600){
        score = score + 200;
        particle = null;
      }
    
      if(particle.body.position.x < 900){
        score = score + 200;
        particle = null;
      }
    }
  }
}

function mousePressed(){
  if(gameState !== "end"){
    particle = new Particles(mouseX, 10, 10, 10);
  }

  count = count + 1;

  if(count >= 5){
    gameState = "end";
  }
}