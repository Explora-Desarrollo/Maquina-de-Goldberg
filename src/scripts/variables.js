// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    MouseConstraint = Matter.MouseConstraint;
    Mouse = Matter.Mouse;
    Body = Matter.Body;
    Composites = Matter.Composites;
    Common = Matter.Common;
    Constraint = Matter.Constraint;
    Events = Matter.Events;
    Vertices = Matter.Vertices;
    Svg = Matter.Svg;
//********Variables globales********
    var relacion=(3/2)
        width=screen.width;
        height=width*relacion;
        if(width>425){
        width=550;
        height=width*relacion;
        console.log("W "+width+" px")
        console.log("H "+height+" px")
        }
    var scale = width/550
    //variables pendulo
    var radioPendulo=width*0.055;
        xPenduloPosition=width*0.55;
        masaPendulo=10
        yPenduloPosition=height*0.17;
        xPenduloCuerdaPosition=width*0.55;
        yPenduloCuerdaPosition=0;
    //Variables plataforma que pivota
    var anchoPlataforma=width*0.4;
    xPlataformaPosition=width*0.22;
    yPlataformaPosition=height*0.85;
    //Modo desarrollador
        devMode=false,
    //Variables del juego
        intentos=true 
        endGameTime=25000  //1s == 1000ms 
    //Variable que controla el rebote
        rest = 0.2, 
    //Diametros de los objetos 
        ballBound=width*0.05;
        ballSpriteBound=width*0.00026;
        ballXPos=width*0.26;
        ballYPos=height*0.26
        wallsWidth=10
        platformsWith=15
    //***Colores globales***
        //paredes
        wallsColor='gray'
    // define our categories (as bit fields, there are up to 32 available)
    collition = 0x0001;
    noCollition = 0x0002;

    var elem = document.getElementById("content-full");
        fullScreen=true

    var vertexSets = []

//********Variables globales********
