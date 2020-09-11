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

// keep the mouse in sync with rendering
render.mouse = mouse;

//  category objects should not be draggable with the mouse
mouseConstraint.collisionFilter.mask = noCollition;






Events.on(engine, 'afterUpdate', function () {
    if (mouseConstraint.mouse.button === -1 && (ball.position.x > ballXPos + 20 || ball.position.y < ballYPos - 20)) {
        ball = Bodies.circle(ballXPos, ballYPos, ballBound, {
            collisionFilter: {
                mask: collition
            },
            friction: 0.002,
            mass: 1,
            restitution: rest,
            render: {
                sprite: {
                    texture: './src/images/tennis.png',
                    xScale: ballSpriteBound,
                    yScale: ballSpriteBound
                }
            }
        })

        elastic.bodyB = ball;
        console.log(this)
        //Evitar que la pelota sea agarrada despues de lanzada
        this.world.bodies[9].collisionFilter.category = 1;
        this.world.bodies[9].collisionFilter.mask = 3;
        whileNotPlaying=true;
        Observador()
    }

});

Events.on(engine, "afterAdd", function () {
    console.log(this)
})

Events.on(mouseConstraint, "mousedown", function () {
    //Verificar si doy click en el recuadro de reset
    if(mouseConstraint.mouse.button == 0 && (world.constraints[1].pointA.x>=resetButton.bounds.min.x && world.constraints[1].pointA.x<=resetButton.bounds.max.x) && (world.constraints[1].pointA.y>=resetButton.bounds.min.y && world.constraints[1].pointA.y<=resetButton.bounds.max.y) ){
        // console.log(this.world.constraints[1].pointA) //Aqui tengo la posición exacta del puntero 
        reset()
    }
      //Verificar si doy click en el recuadro de añadir
      if(mouseConstraint.mouse.button == 0 && (world.constraints[1].pointA.x>=addNewObjButton.bounds.min.x && world.constraints[1].pointA.x<=addNewObjButton.bounds.max.x) && (world.constraints[1].pointA.y>=addNewObjButton.bounds.min.y && world.constraints[1].pointA.y<=addNewObjButton.bounds.max.y) ){
        // console.log(this.world.constraints[1].pointA) //Aqui tengo la posición exacta del puntero 
        document.getElementById('añadir').click()
    }
      //Verificar si doy click en el recuadro de full screen
      if(mouseConstraint.mouse.button == 0 && (world.constraints[1].pointA.x>=fullScreenButton.bounds.min.x && world.constraints[1].pointA.x<=fullScreenButton.bounds.max.x) && (world.constraints[1].pointA.y>=fullScreenButton.bounds.min.y && world.constraints[1].pointA.y<=fullScreenButton.bounds.max.y) ){
        // console.log(this.world.constraints[1].pointA) //Aqui tengo la posición exacta del puntero 

            if(fullScreen){
                openFullscreen();
                fullScreen=false;
            }
            else{
                closeFullscreen()
                fullScreen=true;
            }
    }

})



