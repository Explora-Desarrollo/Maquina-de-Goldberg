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

//********Variables globales********
    //Variables de dimensión predefinidas
    var height=0,
        width=0;

    if(screen.width>=425){
        width=425;
        height=800 ;
    }
    else{
        width=screen.width;
        height=800
    }

    //Modo desarrollador
var devMode=false,
    //Variables del juego
    intentos=true
    //Variable que controla el rebote
    rest = 0.2, 
    //Diametros de los objetos respecto a la pantalla
    ballBound=width*0.05;
    ballSpriteBound=width*0.00026;

    ballXPos=width*0.3;
    ballYPos=height*0.25

    //***Colores globales***
    //paredes
    wallsColor='gray'



        // define our categories (as bit fields, there are up to 32 available)
    var collition = 0x0001;
        noCollition = 0x0002;


    //agrandar un 40% si es un computador 
    if(screen.width<425){
        width=screen.width
        height=screen.height
    }



//********Variables globales********

// create an engine
var engine = Engine.create();
// Variable que contiene al canvas
var world = engine.world

// create a renderer
var render = Render.create({
    element: document.querySelector('#space'),
    engine: engine,
    options: {
        width:width,
        height:height,
        wireframes: devMode,
        showAxes: devMode,
        showCollisions: devMode,
        showConvexHulls: devMode,
    }
});

    // walls
    World.add(world, [
        Bodies.rectangle(width/2, 0, width, 50, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,}}), //top
        Bodies.rectangle(width/2, height, width, 50, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,} }), //bottom
        Bodies.rectangle(width, height/2, 50, height, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,} }), //right
        Bodies.rectangle(0, height/2, 50, height, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,} }) //left
    ]);


        
    //Platforms  
    //Agregar angulos --- angle: Math.PI * 0.06 ---
    World.add(world, [
        Bodies.rectangle(0, height*0.3, (width*2)*0.75, 20, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,} }),
        Bodies.rectangle(width, height*0.5, (width*2)*0.5, 20, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,} }),
        Bodies.rectangle(width*0.7, height*0.08, width*0.06, height*0.15, {collisionFilter: {mask: collition | noCollition}, isStatic: true,render:{fillStyle: wallsColor,}}), //top vertical
    ]);


    // create two boxes and a ground
    var boxA = Bodies.rectangle(300, 200, 85, 60,{
        collisionFilter: {
            mask: collition 
        },
        mass:10,
        render: {
        sprite: {
            texture: './src/images/tv.png',
            fillStyle: 'red',
            xScale:0.03,
            yScale:0.03
        }
    }});

  var ball = Bodies.circle(ballXPos, ballYPos, ballBound, { 
    collisionFilter: {
        category: noCollition | collition
    }, 
    friction: 0.002,
    mass:5,
    restitution: rest,
    render: {
        sprite: {
            texture: './src/images/tennis.png',
            xScale:ballSpriteBound,
            yScale:ballSpriteBound
        }
    }
})

    // add bodies
    var anchor = { x: ballXPos, y: ballYPos },
    elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: ball, 
        stiffness: 0.05
    });

    World.add(engine.world, [ ball, elastic]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.08,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);


    var arrow = Vertices.fromPath('1021,290/1011,291/1000,291/990,292/942,292/932,293/920,294/899,294/887,295/876,296/864,296/866,276/866,266/867,254/868,244/879,244/889,243/903,241/915,236/926,232/944,222/954,215/962,208/971,198/979,188/985,179/992,167/1000,151/1007,136/1011,125/1015,112/1018,99/1022,90/1024,80');
    var ramp2 = Vertices.fromPath('776,183/789,181/801,179/816,175/830,170/839,166/848,161/857,155/866,148/874,141/879,150/879,161/879,171/880,181');
    var objet = Bodies.fromVertices(width*0.85, height*0.41, arrow, {
        isStatic: true,
        render: {
            fillStyle: wallsColor,
            strokeStyle: wallsColor,
            lineWidth: 1,
        }
    }, true)

    var objet2 = Bodies.fromVertices(width*0.679, height*0.272, ramp2, {
        isStatic: true,
        render: {
            fillStyle: wallsColor,
            strokeStyle: wallsColor,
            lineWidth: 1,
        }
    }, true)

    World.add(world, [objet,objet2]);

    Events.on(engine, "afterAdd", function(){
        console.log(this)
    })
        
    Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (ball.position.x > ballXPos+20|| ball.position.y < ballYPos-20)) {
            ball = Bodies.circle(ballXPos, ballYPos, ballBound, { 
                collisionFilter: {
                    mask: collition 
                },
                friction: 0.002,
                mass:1,
                restitution: rest,
                render: {
                    sprite: {
                        texture: './src/images/tennis.png',
                        xScale:ballSpriteBound,
                        yScale:ballSpriteBound
                    }
                }
            })
            

            /*
            World.add(world, ball);
            */
            elastic.bodyB = ball;

            //Evitar que la pelota sea agarrada
            this.world.bodies[7].collisionFilter.category=1;
            this.world.bodies[7].collisionFilter.mask=3;
            
            Observador()
        }



    });


    function Observador(){
        setTimeout(function(){ Repetir(intentos); }, 25000)

    }

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // red category objects should not be draggable with the mouse
    mouseConstraint.collisionFilter.mask = noCollition;




// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);


//Alertas para el usuario!
function reset(){
    Repetir(true)
}
function añadir(){

        // create two boxes and a ground
        var boxA = Bodies.rectangle(400, 600, 85, 60,{
            collisionFilter: {
                category: noCollition | collition
            }, 
            render: {
            sprite: {
                texture: './src/images/tv.png',
                fillStyle: 'red',
                xScale:0.03,
                yScale:0.03
            }
        }});
    World.add(world,boxA)
}

function Repetir(bool){

    if(bool){
        Swal.fire({
            title: 'Parece que no lo lograste',
            text: "Pero no te desanimes, vuelvelo a intentar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Repetir intento!',
            cancelButtonText: 'rendirte :('
          }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
          })
    }
    else{

    }

}





  //Cosas que voy a probar! 




  /*
    quitar la interacción del mouse, sobre algunos objetos

  mousemove: function({name,mouse,source}){
    if(source.body){
        let {y} = source.body.position;
        if(y < lastDieArea.y){
            source.body._ballObject.canTouch = false;
            source.body.collisionFilter.category = 0x0004;
            source.constraint.bodyB = null;
        }
    }
}
  
  */