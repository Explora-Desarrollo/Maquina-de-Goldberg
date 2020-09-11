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
    Bodies.rectangle(width * 0.5,height-height*0.95, platformsWith, height * 0.1, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        render: { fillStyle: wallsColor },
    }), //top vertical
]);

//rampas

var objetos ="1021,290/1011,290/1000,290/990,290/942,290/932,290/920,290/899,290/887,290/876,290/866,290/866,276/866,266/866,254/866,244/879,244/889,243/903,241/915,236/926,232/944,222/954,215/962,208/971,198/979,188/985,179/992,167/1000,151/1007,136/1011,125/1015,112/1018,99/1022,90/1024,90"
var bigRampVec = Vertices.fromPath(`${objetos}`)



var smallRampVec = Vertices.fromPath(
    "776,182/789,181/801,179/816,175/830,170/839,166/848,161/857,155/866,148/874,141/874,150/874,170/880,170/880,180"
);
 
var bigRamp = Bodies.fromVertices(
    width * 0.9,
    height * 0.4,
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


//buttons
var resetButton= Bodies.rectangle(width*0.07, height * 0.028, width*0.1 , height*0.035, {
    collisionFilter: { mask: noCollition  },
    isStatic: true,
    render: { fillStyle: wallsColor },
})

var addNewObjButton= Bodies.rectangle(width*0.18, height * 0.028, width*0.1 , height*0.035, {
    collisionFilter: { mask: noCollition  },
    isStatic: true,
    render: { fillStyle: wallsColor },
})

var fullScreenButton= Bodies.rectangle(width-width*0.07, height * 0.028, width*0.1 , height*0.035, {
    collisionFilter: { mask:  noCollition },
    isStatic: true,
    render: { fillStyle: wallsColor },
})

World.add(world, [resetButton,addNewObjButton,fullScreenButton]);


// var points = Svg.pathToVertices("./src/images/ramp.svg", 30);
// vertexSets.push(Vertices.scale(points, 0.4, 0.4));