var gameState = "fight";
var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var heart1, heart1Img, heart2, heart2Img, heart3, heart3Img;
var life = 3;
var balas = 70; 

function preload(){
    shooterImg = loadImage("assets/shooter_2.png");
    shooter_shooting = loadImage("assets/shooter_3.png");
    bgImg = loadImage("assets/bg.jpg");
    zombieImg = loadImage("assets/zombie.png");
    heart1Img = loadImage("assets/heart_1.png");
    heart2Img = loadImage("assets/heart_2.png");
    heart3Img = loadImage("assets/heart_3.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight); //se acomode a la ventana
    bg = createSprite(displayWidth/2-10, displayHeight/2+200,20,20); //pantallas táctiles
    bg.addImage(bgImg);
    bg.scale = 1.6
    player = createSprite(displayWidth-1600, displayHeight-300,50,50);
    player.addImage(shooterImg);
    player.scale = 0.3
    player.debug = true
    player.setCollider("rectangle",0,0,300,300);
    heart1 = createSprite(displayWidth-192,40);
    heart1.addImage(heart1Img);
    heart1.scale = 0.3;
    heart1.visible = false;
    heart2 = createSprite(displayWidth-164,40);
    heart2.addImage(heart2Img);
    heart2.scale =0.3;
    heart2.visible = false;
    heart3 = createSprite(displayWidth-130,40);
    heart3.addImage(heart3Img);
    heart3.scale =0.3;

    zombieGroup = new Group();
    balasGroup = new Group();
}

function draw(){
    background(0);
    if(gameState === "fight"){
        if(life === 3){
            heart1.visible = false;
            heart2.visible = false;
            heart3.visible = true;
        }
        if(life === 2){
            heart1.visible = false;
            heart2.visible = true;
            heart3.visible = false;
        }
        if(life === 1){
            heart1.visible = true;
            heart2.visible = false;
            heart3.visible = false;
        }
        if(life === 0){
            heart1.visible = false;
            heart2.visible = false;
            heart3.visible = false;
            gameState = "Game Over";
        }
    }

    if(keyDown("UP_ARROW")||touches.length > 0){
        player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length > 0){
        player.y = player.y+30
    }
    if(keyWentDown("space")){ //hacer referencia a una tecla. El muñeco se agache
        balass = createSprite(displayWidth-1600, player.y-30,20,10);
        balass.velocityX = 5;
        balasGroup.add(balass);
        balas = balas-1;
        player.addImage(shooter_shooting);
    } 
    else if(keyWentUp("space")){ //El muñeco se ponga de pie
        player.addImage(shooterImg);
    }
    if(balas === 0){
        gameState = "bullet"; //el jugador se quedó sin balas
    }

    if(zombieGroup.isTouching(player)){
        for(var i = 0; i < zombieGroup.length; i ++){
            if(zombieGroup[i].isTouching(player)){
                zombieGroup.destroyEach(); //el zombie será eliminado
            }
        }
    if(zombieGroup.isTouching(balasGroup)){
        for(var i = 0; i < zombieGroup.length; i ++){
            if(zombieGroup[i].isTouching(balasGroup))
            zombieGroup.destroyEach();
        }
    }
    
    }
    zombiee();
    drawSprites();
    if(gameState === "Game Over"){ 
        text("Perdiste",400,400);
        zombieGroup.destroyEach();
        player.destroy();
    }
    else if(gameState === "won"){
        text("Ganaste",400,400);
        zombieGroup.destroyEach();
        player.destroy();
    }
    else if(gameState === "balass"){
        text("Te quedaste sin balas",400,400);
        zombieGroup.destroyEach();
        player.destroy();
    }
}
function zombiee(){
    if(frameCount % 60 === 0){
        zombie = createSprite(random(500,1100),random(500,1000),40,40);
        zombie.addImage(zombieImg);
        zombie.velocityX = -4;
        zombie.scale = 0.2;
        zombie.setCollider("rectangle", 0, 0, 500, 980); 
        zombie.debug = true;
        zombieGroup.add(zombie);
        zombie.lifetime = 130;
    }
}