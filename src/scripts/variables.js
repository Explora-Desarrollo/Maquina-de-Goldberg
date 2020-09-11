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
        }
        


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
        ballXPos=width*0.2;
        ballYPos=height*0.25
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
