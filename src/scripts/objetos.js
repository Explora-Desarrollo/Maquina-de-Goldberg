// walls
World.add(world, [
    Bodies.rectangle(width / 2, 0, width, wallsWidth, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //top
    Bodies.rectangle(width / 2, height, width, wallsWidth, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //bottom
    Bodies.rectangle(width, height / 2, wallsWidth, height, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //right
    Bodies.rectangle(0, height / 2, wallsWidth, height, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //left
]);

//Platforms
//Agregar angulos --- angle: Math.PI * 0.06 ---
World.add(world, [
    Bodies.rectangle(0, height * 0.3, width * 2 * 0.75, platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }),
    Bodies.rectangle(width, height * 0.5, width * 2 * 0.5, platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }),
    Bodies.rectangle(width * 0.722,height-height*0.95, platformsWith*2, height * 0.1, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //top vertical
    Bodies.rectangle(width * 0.722,height-height*0.75, platformsWith*2, height * 0.1, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }),
]);

//canasta
World.add(world, [
    Bodies.rectangle(width*0.665, height-height*0.1,width*0.175 , platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        angle: Math.PI * 0.5,
        render: { fillStyle: wallsColor },
    }),
    Bodies.rectangle(width*0.83, height-height*0.1,width*0.175 , platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        angle: Math.PI * 0.5,
        render: { fillStyle: wallsColor },
    }),
    Bodies.rectangle(width*0.6, height-height*0.2,width*0.2 , platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        angle: Math.PI * 0.25,
        render: { fillStyle: wallsColor },
    }),
    Bodies.rectangle(width*0.9, height-height*0.2,width*0.2 , platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        angle: Math.PI * 0.75,
        render: { fillStyle: wallsColor },
    }),
]);


//rampas

var objetos ="1021,290/1011,290/1000,290/990,290/942,290/932,290/920,290/899,290/887,290/876,290/866,290/866,276/866,266/866,254/866,244/879,244/889,243/903,241/915,236/926,232/944,222/954,215/962,208/971,198/979,188/985,179/992,167/1000,151/1007,136/1011,125/1015,112/1018,99/1022,90/1024,90"
var bigRampVec = Vertices.fromPath(`${objetos}`)
bigRampVec = scaleVertices(bigRampVec, scale)


var smallRampVec = Vertices.fromPath(
    "776,182/789,181/801,179/816,175/830,170/839,166/848,161/857,155/866,148/874,141/874,150/874,170/880,170/880,180"
);
smallRampVec = scaleVertices(smallRampVec, scale)
 
var bigRamp = Bodies.fromVertices(
    width * 0.9,
    height * 0.41,
    bigRampVec,
    {
        isStatic: true,
        render: {
            fillStyle: wallsColor,
            strokeStyle: wallsColor,
            lineWidth: 1,
        },
    },
    true,
);

var smallRamp = Bodies.fromVertices(
    width * 0.4,
    height * 0.279,

    smallRampVec,
    {
        isStatic: true,
        render: {
            fillStyle: wallsColor,
            strokeStyle: wallsColor,
            lineWidth: 1,
        },
    },
    true
);

World.add(world, [bigRamp, smallRamp]);

// create two boxes and a ground
var box = Bodies.rectangle(400, 600, 85, 60, {
    collisionFilter: {
        category: noCollition | collition,
    },
    render: {
        sprite: {
            texture: "./src/images/tv.png",
            fillStyle: "red",
            xScale: 0.03,
            yScale: 0.03,
        },
    },
});

//añade la pelota
var ball = Bodies.circle(ballXPos, ballYPos, ballBound, { 
    collisionFilter: {
        category: noCollition | collition
    }, 
    friction: 0.002,
    mass:10,
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


//buttons
var resetButton= Bodies.rectangle(width*0.07, height * 0.031, width*0.1 , height*0.035, {
    collisionFilter: { mask: noCollition  },
    isStatic: true,
    render: { fillStyle: wallsColor },
})

var addNewObjButton= Bodies.rectangle(width*0.18, height * 0.031, width*0.1 , height*0.035, {
    collisionFilter: { mask: noCollition  },
    isStatic: true,
    render: { fillStyle: wallsColor },
})

var fullScreenButton= Bodies.rectangle(width-width*0.07, height * 0.031, width*0.1 , height*0.035, {
    collisionFilter: { mask:  noCollition },
    isStatic: true,
    render: { fillStyle: wallsColor },
})

World.add(world, [resetButton,addNewObjButton,fullScreenButton]);
//pendulos
//pendulos

var pendulo = Bodies.circle(xPenduloPosition, yPenduloPosition, radioPendulo, { density: 0.04,mass:masaPendulo, frictionAir: 0.005});
World.add(world, pendulo);
World.add(world, Constraint.create({
    pointA: { x: xPenduloCuerdaPosition, y: yPenduloCuerdaPosition },
    bodyB: pendulo
}));


// Plataforma que pivota
var Plataforma = Bodies.rectangle(xPlataformaPosition, yPlataformaPosition, anchoPlataforma, platformsWith*1.5);
var boxPlatform = Bodies.rectangle(0+width*0.11,height-height*0.07,width*0.19 ,height*0.12,{isStatic:true});
var constraint = Constraint.create({
    pointA: { x: xPlataformaPosition, y: yPlataformaPosition },
    bodyB: Plataforma,
    length: 0
});

World.add(world, [Plataforma, constraint,boxPlatform]);