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
var isMovil = true
wallsColor = '#c67267'
// wallsColor='rgb(255 255 255 / 0%)'
canastaColor='rgb(255 255 255 / 0%)'
var relacion = (3 / 2)

width = screen.width;
height = width * .834;
if (width > 425) {
    width = 660;
    height = 400;
    isMovil = false;
}
var altura = height * .35
console.log("W " + width + " px")
console.log("H " + height + " px")
var scale = width / 660

var resetCount = 0;

var wallsWidth = width * .03
var ObjectsNumber = []

//Variable que controla el rebote
rest = 0.2,
    //Diametros de los objetos 
    ballBound = width * 0.05;
ballSpriteBound = width * 0.0025;
ballXPos = width * 0.22;
ballYPos = height - height * .13
platformsWith = width * .03




//
function scaleVertices(vertObject, scale) {

    for (var i = 0; i < vertObject.length; i++) {
        vertObject[i].x = vertObject[i].x * scale;
        vertObject[i].y = vertObject[i].y * scale;
    }

    return vertObject;


}


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





//Botton de reset
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

//Rectangulos grandes
var alturaRam =height - height * .57
if (isMovil) {altura = height * .3; alturaRam=height - height * .6}
World.add(world, [
    Bodies.rectangle(width / 1.5, height, width * .8, height * .85, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }),
    Bodies.rectangle(width * .92, alturaRam , width * .15, altura, {
        isStatic: true,
        render: { fillStyle: wallsColor },
    }),
]);
//rampas

var objetos = "252,554/258,553/263,553/270,553/277,553/289,553/296,552/303,551/309,551/315,550/320,550/328,550/337,549/342,549/347,549/352,549/359,550/368,550/376,550/383,550/391,550/401,550/408,551/416,551/425,551/431,551/436,550/443,550/449,550/456,550/464,549/470,549/476,549/482,549/488,549/493,549/499,549/506,549/513,548/519,548/526,548/533,547/538,547/544,547/551,547/560,547/566,547/572,547/580,547/586,547/592,547/600,546/607,546/614,546/619,546/626,545/633,545/642,544/649,544/656,544/663,544/668,544/674,544/680,544/687,544/691,542/690,537/689,532/689,527/688,522/688,517/688,512/688,507/689,501/689,495/689,490/689,479/689,474/689,469/689,463/689,457/689,450/690,444/690,437/690,431/690,422/690,417/690,412/691,401/692,393/693,388/693,377/693,369/693,361/693,352/693,344/694,335/695,325/695,320/696,311/696,306/697,301/697,294/697,285/697,276/697,269/697,264/698,256/698,251/699,242/699,235/699,228/699,223/699,217/699,210/699,205/699,199/698,193/698,187/698,181/698,175/698,169/697,164/697,159/697,153/696,148/695,141/695,136/694,129/693,124/692,119/692,114/692,124/691,133/689,137/687,142/685,146/683,153/682,158/681,163/679,167/677,172/675,176/672,182/670,187/667,194/665,198/662,203/659,209/656,215/653,221/651,226/649,230/647,234/644,239/642,244/639,249/636,254/632,260/630,264/624,273/621,277/618,281/615,285/613,289/606,298/603,302/599,307/595,311/591,315/587,318/583,323/579,326/575,329/571,333/567,337/561,342/555,347/549,354/541,362/538,366/532,371/527,376/521,380/516,384/511,389/506,392/500,397/496,400/488,406/484,409/477,413/472,417/468,420/462,423/458,426/450,431/446,433/442,436/437,438/433,440/428,442/424,445/418,448/412,451/408,453/398,458/394,460/386,463/382,465/378,467/373,469/367,471/360,475/351,478/344,482/337,485/329,488/323,490/318,492/313,494/308,495/303,497/297,500/293,502/288,503/283,505/279,507/273,508/268,509/263,511/258,512/253,512/248,512/247,518/247,524/247,530/248,537/250,541"
var bigRampVec = Vertices.fromPath(`${objetos}`)
if (isMovil) bigRampVec = scaleVertices(bigRampVec, scale * 0.4)
else bigRampVec = scaleVertices(bigRampVec, scale * 0.35)

var bigRamp = Bodies.fromVertices(
    width * .76,
    height * .5,
    bigRampVec,
    {
        isStatic: true,
        render: {
            fillStyle:canastaColor ,
            strokeStyle: canastaColor,
            lineWidth: 1,
        },
    },
    true,
);

World.add(world, [bigRamp]);


//Florero
let boxAdd = Bodies.rectangle(width*.33, height*.5, width*0.11, height*0.2, {
    render: {
      mass:10,
      friction: 1,
        sprite: {
          texture: './src/images/Florero.png',
          xScale:width*0.0015,
          yScale:height*0.0017
      }
    },
});
  World.add(world,boxAdd )

  ObjectsNumber.push(boxAdd.id)

//Pelota de billar
let ball = Bodies.circle(width*0.9, height-height*0.8, ballBound*0.9, { 
    mass:40,
    render:{
      sprite: {
        texture: './src/images/Bola_billar.png',
        xScale:width*0.0025,
        yScale:width*0.0025
    }
    }
})

World.add(world, [
    Bodies.rectangle(width*.048, height-height*.2,height*0.4 , width*.03, {
        isStatic: true,
        angle: Math.PI * 0.46,
        render: { fillStyle: canastaColor },
    }),
    Bodies.rectangle(width*0.24, height-height*.2,height*0.4  , width*.03, {
        isStatic: true,
        angle: Math.PI * 0.53,
        render: { fillStyle: canastaColor },
    }),
]);


  World.add(world,ball )
  ObjectsNumber.push(ball.id)

 
  var mapa = Bodies.rectangle(width / 2, height / 2, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/MAPA_2.png',
            xScale: width * .0015,
            yScale: height * .0025,
        }
    }

})

World.add(world, mapa);
ObjectsNumber.push(mapa.id)


function CrearIndicativo(){
    
//instructivo
var indicativo = Bodies.rectangle(width*.72, 0+height*.6, 1, 1, {
    collisionFilter: {
        mask: null
    },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/instrauctivo_2.png',
            yScale: height * .0025,
            xScale: height * .0021,
        }
    }

})
World.add(world, indicativo);
ObjectsNumber.push(indicativo.id)
}
CrearIndicativo()


Events.on(mouseConstraint, "mousedown", function () {


    //Verificar si doy click en el recuadro de reset

        if (mouseConstraint.mouse.button == 0 && (world.constraints[0].pointA.x >= resetButton.bounds.min.x && world.constraints[0].pointA.x <= resetButton.bounds.max.x) && (world.constraints[0].pointA.y >= resetButton.bounds.min.y && world.constraints[0].pointA.y <= resetButton.bounds.max.y)) {
            // console.log(this.world.constraints[1].pointA) //Aqui tengo la posición exacta del puntero 
            let objetos = world.bodies
            for (i = 0; i < ObjectsNumber.length; i++) {
                var removeIndex = objetos.map(function (item) { return item.id; }).indexOf(ObjectsNumber[i]);
                objetos.splice(removeIndex, 1);
            }
            ObjectsNumber = []


            
//Florero
let boxAdd = Bodies.rectangle(width*.33, height*.5, width*0.11, height*0.2, {
    render: {
      mass:10,
      friction: 1,
        sprite: {
          texture: './src/images/Florero.png',
          xScale:width*0.0015,
          yScale:height*0.0017
      }
    },
});
  World.add(world,boxAdd )

  ObjectsNumber.push(boxAdd.id)

//Pelota de billar
let ball = Bodies.circle(width*0.9, height-height*0.8, ballBound*0.9, { 
    mass:40,
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


        }
        
        mapa = Bodies.rectangle(width / 2, height / 2, 1, 1, {
            collisionFilter: {
                mask: null
            },
            isStatic: true,
            render: {
                sprite: {
                    texture: './src/images/MAPA_2.png',
                    xScale: width * .0015,
                    yScale: height * .0025,
                }
            }
        
        })
        
        World.add(world, mapa);
        ObjectsNumber.push(mapa.id)
        CrearIndicativo()
   

})



