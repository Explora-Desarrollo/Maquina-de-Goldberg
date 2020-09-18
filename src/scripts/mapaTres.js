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
    var isMovil = true
        wallsColor='#c67267'
        canastaColor ='rgb(255 255 255 / 0%)'
        // wallsColor='rgb(255 255 255 / 0%)'
    var relacion=(3/2)
    width=screen.width;
    height=width*.834;
    if(width>425){
    width=660;
    height=400;
    isMovil = false;
    }
    console.log("W "+width+" px")
    console.log("H "+height+" px")
var scale = width/660

var xPlataformaPosition=width*0.22;
yPlataformaPosition=height-height*.32;

var resetCount=0;

var wallsWidth= width*.03
var ObjectsNumber = []
var ConstraintNumber = []


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

//instructivo
var indicativo = Bodies.rectangle(width*.35, 0+height*.35, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/instrauctivo_3.png',
            yScale: height * .0025,
        }
    }

})
World.add(world, indicativo);

//Reset Button

      var resetButton= Bodies.rectangle(width*.07, width * .07, width*0.06 , width*0.06, {
        isStatic: true,
        render: {
            sprite: {
                texture: './src/images/Reset.png',
                xScale:width*0.0012,
                yScale:width*0.0012
            }
        }
    
    })

    World.add(world,resetButton )

    //plataforma para catapulta y catapulta
    var boxPlatform = Bodies.rectangle(width*0.11,(height*1.35)-height*0.5,width*0.19 ,height*0.25,{
        isStatic:true,
        render: {
            sprite: {
                texture: './src/images/MAPA_3_B.png',
                xScale: width * .0015,
                yScale: height * .0025,
            }
        },
    });

function Catapulta(){
    var boxPlatform2 = Bodies.rectangle(xPlataformaPosition,xPlataformaPosition,width*.4 ,height*0.05,{
        render: {
            sprite: {
                texture: './src/images/MAPA_3_B.png',
                xScale: width * .003,
                yScale: height * .0005,
            }
        },
    });
    
var constraint = Constraint.create({
    pointA: { x: xPlataformaPosition, y: yPlataformaPosition },
    bodyB: boxPlatform2,
    length: 0
});

    ConstraintNumber.push(constraint.id)
    ObjectsNumber.push(boxPlatform2.id)
    World.add(world, [boxPlatform2,constraint]);

}
Catapulta()

    

World.add(world, [boxPlatform]);

//Cubo de Rubik 
let boxAdd = Bodies.rectangle(width*0.15, height*0.4, width*0.08, width*0.08, {
    render: {
      mass:1,
        sprite: {
            texture: './src/images/Rubik.png',
            xScale:width*0.0015,
            yScale:width*0.0015
        }
    },
});
  World.add(world,boxAdd )
  ObjectsNumber.push(boxAdd.id)

//Bola de billar y Tenis 

let ball = Bodies.circle(width*0.9, height-height*0.8, ballBound*0.9, { 
    mass:30,
    friction:0.001,
    render:{
      sprite: {
        texture: './src/images/Bola_billar.png',
        xScale:width*0.0025,
        yScale:width*0.0025
    }
    }
})

  World.add(world,ball )
  ObjectsNumber.push(ball.id)

  //Canasta
var altura =0+height*0.84
if(isMovil){
    altura =0+height*0.89
}

var canasta=    Bodies.rectangle(width*0.62, altura,0.0000000001 , 0.00000001, {
    isStatic: true,
    collisionFilter: { mask: null },
    render: {
        sprite: {
            texture: './src/images/Basurera.png',
            xScale:width*0.0018,
            yScale:width*0.0016
        }
    }

})
ObjectsNumber.push(canasta.id)

World.add(world, [
    Bodies.rectangle(width*0.55, altura,width*0.175 , width*.01, {
        isStatic: true,
        angle: Math.PI * 0.46,
        render: { fillStyle: canastaColor },
    }),
    canasta,
    Bodies.rectangle(width*0.695, altura,width*0.175 , width*.01, {
        isStatic: true,
        angle: Math.PI * 0.53,
        render: { fillStyle: canastaColor },
    }),
]);

var mapa = Bodies.rectangle(width / 2, height / 2, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/MAPA_3_A.png',
            xScale: width * .0015,
            yScale: height * .0025,
        }
    }

})

World.add(world, mapa);



Events.on(mouseConstraint, "mousedown", function () {

    
    //Verificar si doy click en el recuadro de reset

 
        if(mouseConstraint.mouse.button == 0 && (world.constraints[0].pointA.x>=resetButton.bounds.min.x && world.constraints[0].pointA.x<=resetButton.bounds.max.x) && (world.constraints[0].pointA.y>=resetButton.bounds.min.y && world.constraints[0].pointA.y<=resetButton.bounds.max.y) ){
            // console.log(this.world.constraints[1].pointA) //Aqui tengo la posición exacta del puntero 
            let objetos = world.bodies
            let constraints= world.constraints
            for (i = 0; i < ObjectsNumber.length; i++) {
                var removeIndex = objetos.map(function (item) { return item.id; }).indexOf(ObjectsNumber[i]);
                objetos.splice(removeIndex, 1);
            }
            for (i = 0; i < ConstraintNumber.length; i++) {
                var removeIndex = constraints.map(function (item) { return item.id; }).indexOf(ConstraintNumber[i]);
                constraints.splice(removeIndex, 1);
            }
            ObjectsNumber = []
            ConstraintNumber = []

            Catapulta()

//Cubo de Rubik 
let boxAdd = Bodies.rectangle(width*0.15, height*0.4, width*0.08, width*0.08, {
    render: {
      mass:1,
        sprite: {
            texture: './src/images/Rubik.png',
            xScale:width*0.0015,
            yScale:width*0.0015
        }
    },
});
  World.add(world,boxAdd )
  ObjectsNumber.push(boxAdd.id)

//Bola de billar y Tenis 

let ball = Bodies.circle(width*0.9, height-height*0.8, ballBound*0.9, { 
    mass:30,
    friction:0.001,
    render:{
      sprite: {
        texture: './src/images/Bola_billar.png',
        xScale:width*0.0025,
        yScale:width*0.0025
    }
    }
})

  World.add(world,ball )
  ObjectsNumber.push(ball.id)




            var canasta=    Bodies.rectangle(width*0.62, altura,0.0000000001 , 0.00000001, {
                isStatic: true,
                collisionFilter: { mask: null },
                render: {
                    sprite: {
                        texture: './src/images/Basurera.png',
                        xScale:width*0.0018,
                        yScale:width*0.0016
                    }
                }
            
            })
            World.add(world,canasta )
            ObjectsNumber.push(canasta.id)

        }


})



