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

var devMode = false;
// wallsColor='#c67267'
wallsColor = 'rgb(255 255 255 / 0%)'
var relacion = (3 / 2)
width = screen.width;
height = width * .834;
if (width > 425) {
    width = 660;
    height = 400;
}
console.log("W " + width + " px")
console.log("H " + height + " px")
var scale = width / 660

var resetCount = 0;

var wallsWidth = width * .03
var ballNumber = []
var constraintYoyo = []


//variables pendulo
var radioPendulo = width * 0.055;
xPenduloPosition = width * 0.55;
masaPendulo = 10
yPenduloPosition = height * 0.6;
xPenduloCuerdaPosition = xPenduloPosition
yPenduloCuerdaPosition = 12.5;


//Variable que controla el rebote
rest = 0.2,
    //Diametros de los objetos 
    ballBound = width * 0.05;
ballSpriteBound = width * 0.0025;
ballXPos = width * 0.22;
ballYPos = height - height * .13
platformsWith = width * .03


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
    Bodies.rectangle(width - width * .2, height, wallsWidth, height - height * .2, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //right bottom
    Bodies.rectangle(width - width * .2, 0, wallsWidth, height - height * .48, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //right top
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
var indicativo = Bodies.rectangle(width*.23, 0+height*.75, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/instrauctivo_1.png',
            yScale: height * .0025,
            xScale: height * .0021,
        }
    }

})
World.add(world, indicativo);



//pendulos



function CrearPendulo(){

    var pendulo = Bodies.circle(xPenduloPosition, yPenduloPosition, radioPendulo, {
        density: 0.04, mass: masaPendulo, frictionAir: 0.005,
        render: {
            sprite: {
                texture: './src/images/Yoyo.png',
                xScale: width * 0.0024,
                yScale: width * 0.0024
            }
        },
    });
    World.add(world, pendulo);
    ballNumber.push(pendulo.id)
    
    var billarConstraint = Constraint.create({
        pointA: { x: xPenduloCuerdaPosition, y: yPenduloCuerdaPosition },
        bodyB: pendulo,
    })
    World.add(world, billarConstraint);

    constraintYoyo.push(billarConstraint.id)
}
CrearPendulo()





var smallRamp = Bodies.rectangle(width * 0.25, height - height * 0.05, width * 0.4, platformsWith, {
    isStatic: true,
    angle: Math.PI * 0.84,
    render: { fillStyle: "rgb(255 255 255 / 0%)" },
})

World.add(world, [smallRamp]);



//añade la pelota
var ball = Bodies.circle(ballXPos, ballYPos, ballBound, {
    friction: 0.002,
    mass: 25,
    restitution: rest,
    render: {
        sprite: {
            texture: './src/images/tennis.png',
            xScale: ballSpriteBound,
            yScale: ballSpriteBound
        }
    }
})

// add bodies
var anchor = { x: ballXPos, y: ballYPos },
    elastic = Constraint.create({
        pointA: anchor,
        bodyB: ball,
        stiffness: 0.1
    });

World.add(engine.world, [ball, elastic]);

let ballBillar = Bodies.circle(width * 0.8, height * 0.5, ballBound * 0.9, {
    render: {
        sprite: {
            texture: './src/images/Bola_billar.png',
            xScale: width * 0.0025,
            yScale: width * 0.0025
        }
    }
})
ballNumber.push(ballBillar.id)

World.add(world, ballBillar)


var resetButton = Bodies.rectangle(width * .07, width * .07, width * 0.06, width * 0.06, {
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/Reset.png',
            xScale: width * 0.0012,
            yScale: width * 0.0012
        }
    }

})

World.add(world, resetButton)

Events.on(engine, 'afterUpdate', function () {

    if (mouseConstraint.mouse.button === -1 && (ball.position.x > ballXPos + width * .02 || ball.position.y < ballYPos - width * .02)) {

        ballNumber.push(ball.id)

        ball = Bodies.circle(ballXPos, ballYPos, ballBound, {
            friction: 0.002,
            restitution: rest,

        })
        elastic.bodyB = ball;
        resetCount = 1;
    }

});


//

var mapa = Bodies.rectangle(width / 2, height / 2, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/MAPA_1.png',
            xScale: width * .0015,
            yScale: height * .0025,
        }
    }

})

World.add(world, mapa);
ballNumber.push(mapa.id)
var canasta1 = Bodies.rectangle(width * .84, height - height * .1, width * .2, platformsWith, {
    isStatic: true,
    angle: Math.PI * 0.46,
    render: { fillStyle: wallsColor },
})
var canasta2 = Bodies.rectangle(width * .96, height - height * .1, width * .2, platformsWith, {
    isStatic: true,
    angle: Math.PI * 0.53,
    render: { fillStyle: wallsColor },
})


World.add(world, [canasta1, canasta2]);



Events.on(mouseConstraint, "mousedown", function () {


    //Verificar si doy click en el recuadro de reset

    if (resetCount >= 1) {
        if (mouseConstraint.mouse.button == 0 && (world.constraints[0].pointA.x >= resetButton.bounds.min.x && world.constraints[0].pointA.x <= resetButton.bounds.max.x) && (world.constraints[0].pointA.y >= resetButton.bounds.min.y && world.constraints[0].pointA.y <= resetButton.bounds.max.y)) {
            // console.log(this.world.constraints[1].pointA) //Aqui tengo la posición exacta del puntero 
            let objetos = world.bodies
            let constraintOb = world.constraints

            if (ballNumber.length > 0) {
                for (i = 0; i < ballNumber.length; i++) {
                    var removeIndex = objetos.map(function (item) { return item.id; }).indexOf(ballNumber[i]);
                    objetos.splice(removeIndex, 1);
                }
                ballNumber = []

                for (i = 0; i < constraintYoyo.length; i++) {
                    var removeIndex = constraintOb.map(function (item) { return item.id; }).indexOf(constraintYoyo[i]);
                    constraintOb.splice(removeIndex, 1);
                }
                constraintYoyo = []
            }

            CrearPendulo()
            
            ball = Bodies.circle(ballXPos, ballYPos, ballBound, {
                friction: 0.0002,
                mass: 25,
                restitution: rest,
                render: {
                    sprite: {
                        texture: './src/images/tennis.png',
                        xScale: ballSpriteBound,
                        yScale: ballSpriteBound
                    }
                }

            })



            World.add(world, ball)
            elastic.bodyB = ball;

            ballBillar = Bodies.circle(width * 0.8, height * 0.5, ballBound * 0.9, {
                render: {
                    sprite: {
                        texture: './src/images/Bola_billar.png',
                        xScale: width * 0.0025,
                        yScale: width * 0.0025
                    }
                }
            })


            World.add(world, ballBillar)
            ballNumber.push(ballBillar.id)

            var mapa = Bodies.rectangle(width / 2, height / 2, 1, 1, {
                collisionFilter: {
                    mask: null
                },
                isStatic: true,
                render: {
                    sprite: {
                        texture: './src/images/MAPA_1.png',
                        xScale: width * .0015,
                        yScale: height * .0025,
                    }
                }

            })

            World.add(world, mapa);

            resetCount = 0;
        }

    }



})



