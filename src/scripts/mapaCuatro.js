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

    var devMode =false;
        //  wallsColor='#c67267'
       wallsColor='rgb(255 255 255 / 0%)'
    var relacion=(3/2)
    width=screen.width;
    height=width*.834;
    var isMovil=true;
    if(width>425){
    width=660;
    height=400;
    isMovil=false
    }
    console.log("W "+width+" px")
    console.log("H "+height+" px")
var scale = width/660

var resetCount=0;

var wallsWidth= width*.03
var ObjectsNumber = []
var BallNumber = []



        //variables pendulo
        var radioPendulo=width*0.055;
        xPenduloPosition=width*0.55;
        masaPendulo=10
        yPenduloPosition=height*0.6;
        xPenduloCuerdaPosition=xPenduloPosition
        yPenduloCuerdaPosition=12.5;


    //Variable que controla el rebote
    rest = 0.2, 
    //Diametros de los objetos 
        ballBound=width*0.05;
        ballSpriteBound=width*0.0025;
        ballXPos=width*0.22;
        ballYPos=height-height*.13
        platformsWith=width*.03


// create an engine
var engine = Engine.create();
// Variable que contiene al canvas
var world = engine.world

// create a renderer
var render = Render.create({
    element: document.querySelector('#space'),
    engine: engine,
    options: {
        width: width,
        height: height,
        wireframes: devMode,
        showAxes: devMode,
        showCollisions: devMode,
        showConvexHulls: devMode,
    }
});

// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.5,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// walls
World.add(world, [
    Bodies.rectangle(width / 2, 0, width, wallsWidth, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //top
    Bodies.rectangle(width / 2, height, width, wallsWidth, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //bottom
    Bodies.rectangle(0, height / 2, wallsWidth, height, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //left
    Bodies.rectangle(width, height / 2, wallsWidth, height, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }),
]);

function CrearIndicativo(){
    
    //instructivo
    var indicativo = Bodies.rectangle(width*.35, 0+height*.4, 1, 1, {
        collisionFilter: {
            mask: null
        },
        isStatic: true,
        render: {
            sprite: {
                texture: './src/images/instrauctivo_4.png',
                yScale: height * .0025,
                xScale: height * .0021,
            }
        }
    
    })
    World.add(world, indicativo);
    ObjectsNumber.push(indicativo.id)
    }
    CrearIndicativo()

//Reset Button
      var resetButton= Bodies.rectangle(width*.07, width * .07, width*0.06 , width*0.06, {
        isStatic: true,
        collisionFilter:{
            mask:null
        },
        render: {
            sprite: {
                texture: './src/images/Reset.png',
                xScale:width*0.0012,
                yScale:width*0.0012
            }
        }
    
    })
    
    World.add(world,resetButton )

    //mapa
    
var mapa = Bodies.rectangle(width / 2, height / 2, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/MAPA_4.png',
            xScale: width * .0015,
            yScale: height * .0025,
        }
    }

})

World.add(world, mapa);

//plataformas
var altura=[0+height*.31,0+height*.49 ,0+height*.81]
var Radio = (width*.035)  * scale;
var SeparacionRuedas= (width*.14) * scale
if(isMovil){
    altura=[0+height*.334,0+height*.47 ,0+height*.82999]
    Radio=(width*.07)  * scale
    SeparacionRuedas= (width*.25) * scale
}

World.add(world, [
    Bodies.rectangle(width*.5, 0+height*.4, width*.6, wallsWidth, { isStatic: true, angle: Math.PI * 0.06,render: { fillStyle: wallsColor }, }),
    Bodies.rectangle(width*.5, 0+height*.9, width*.6, wallsWidth, { isStatic: true, angle: -Math.PI * 0.06,render: { fillStyle: wallsColor }, }),
    Bodies.rectangle(width*.07, altura[0] , width*.3, wallsWidth, { isStatic: true,render: { fillStyle: wallsColor },}),
    Bodies.rectangle(width*.84, altura[1] , width*.1, wallsWidth, { isStatic: true,render: { fillStyle: wallsColor },}),
    Bodies.rectangle(width*.94, altura[2] , width*.3, wallsWidth, { isStatic: true,render: { fillStyle: wallsColor },}),
]);



//Carros
var carOne;
var carTwo;


function CrearAutoUno(){
    carOne = Composites.car(width*.1, 0+height*.2,SeparacionRuedas, wallsWidth,Radio )
    carOne.bodies[0].render.sprite.texture ='./src/images/Carrito.png';
    carOne.bodies[0].render.sprite.xScale =width*.0015;
    carOne.bodies[0].render.sprite.yScale =height*.0025;
    carOne.bodies[1].render.opacity=0
    carOne.bodies[2].render.opacity=0
    carOne.bodies[1].friction=0
    carOne.bodies[2].friction=0
    carOne.bodies[1].mass=20
    carOne.bodies[2].mass=20
    carOne.constraints[0].render.visible=false
    carOne.constraints[1].render.visible=false
        World.add(world, carOne);
        ObjectsNumber.push(carOne.id)
}
CrearAutoUno()

function CrearAutoDos(){
    carTwo = Composites.car(width*.86, 0+height*.8, SeparacionRuedas, wallsWidth, Radio)
    carTwo.bodies[0].render.sprite.texture ='./src/images/Carrito2.png';
    carTwo.bodies[0].render.sprite.xScale =width*.0015;
    carTwo.bodies[0].render.sprite.yScale =height*.0025;
    carTwo.bodies[1].render.opacity=0
    carTwo.bodies[2].render.opacity=0
    carTwo.bodies[1].friction=0
    carTwo.bodies[2].friction=0
    carTwo.bodies[1].mass=20
    carTwo.bodies[2].mass=20
    carTwo.constraints[0].render.visible=false
    carTwo.constraints[1].render.visible=false
        World.add(world, carTwo);
        ObjectsNumber.push(carTwo.id)
}
CrearAutoDos()

//Bola de billar
var ball;

function CrearBola(){
    ball = Bodies.circle(width*0.85, 0+height*0.35, ballBound*0.7, { 
        mass:5,
        friction:0,
        render:{
          sprite: {
            texture: './src/images/pelotica.png',
            xScale:width*0.002,
            yScale:width*0.002
        }
        }
    })
    
      World.add(world,ball )
      BallNumber.push(ball.id)
}
CrearBola();

Events.on(mouseConstraint, "mousedown", function () {

    
    //Verificar si doy click en el recuadro de reset
        if(mouseConstraint.mouse.button == 0 && (world.constraints[0].pointA.x>=resetButton.bounds.min.x && world.constraints[0].pointA.x<=resetButton.bounds.max.x) && (world.constraints[0].pointA.y>=resetButton.bounds.min.y && world.constraints[0].pointA.y<=resetButton.bounds.max.y) ){

            let objetos = world.bodies
            let cuerpos = world.composites
            for (i = 0; i < BallNumber.length; i++) {
                var removeIndex = objetos.map(function (item) { return item.id; }).indexOf(BallNumber[i]);
                objetos.splice(removeIndex, 1);
            }
            for (i = 0; i < ObjectsNumber.length; i++) {
                var removeIndex = cuerpos.map(function (item) { return item.id; }).indexOf(ObjectsNumber[i]);
                cuerpos.splice(removeIndex, 1);
            }
            BallNumber = []
            ObjectsNumber = []
            CrearBola();
            CrearAutoDos()
            CrearAutoUno()

        }


})




    // Events.on(engine, 'afterUpdate', function () {
    //     var angle=Math.round( car.bodies[0].angle ) 
    //     if(angle<=0){
    //         angle=angle*(-1)
    //     }
    //     if (angle==3) {
    //         car.bodies[1].inertia= 'Infinity'
    //         car.bodies[2].inertia= 'Infinity'
    //         car.bodies[1].friction= 1
    //         car.bodies[2].friction= 1
    //     }
    //     else{

    //         console.log
    //     }
    // });
