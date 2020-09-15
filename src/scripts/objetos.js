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
    Bodies.rectangle(width, height * 0.5, width * 2 * 0.4, platformsWith, {
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
console.log( Math.PI * 0.5)
//canasta
World.add(world, [
    Bodies.rectangle(width*0.66, height-height*0.07,width*0.175 , platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        angle: Math.PI * 0.46,
        render: { fillStyle: canastaColor },
    }),
    Bodies.rectangle(width*0.745, height-height*0.07,0.0000000001 , 0.00000001, {
        isStatic: true,
        collisionFilter: { mask: null },
        render: {
            sprite: {
                texture: './src/images/Basurera.png',
                xScale:width*0.002,
                yScale:width*0.002
            }
        }
 
    }),
    Bodies.rectangle(width*0.835, height-height*0.07,width*0.175 , platformsWith, {
        collisionFilter: { mask: collition | noCollition },
        isStatic: true,
        angle: Math.PI * 0.53,
        render: { fillStyle: canastaColor },
    }),
]);


//rampas

var objetos ="252,554/258,553/263,553/270,553/277,553/289,553/296,552/303,551/309,551/315,550/320,550/328,550/337,549/342,549/347,549/352,549/359,550/368,550/376,550/383,550/391,550/401,550/408,551/416,551/425,551/431,551/436,550/443,550/449,550/456,550/464,549/470,549/476,549/482,549/488,549/493,549/499,549/506,549/513,548/519,548/526,548/533,547/538,547/544,547/551,547/560,547/566,547/572,547/580,547/586,547/592,547/600,546/607,546/614,546/619,546/626,545/633,545/642,544/649,544/656,544/663,544/668,544/674,544/680,544/687,544/691,542/690,537/689,532/689,527/688,522/688,517/688,512/688,507/689,501/689,495/689,490/689,479/689,474/689,469/689,463/689,457/689,450/690,444/690,437/690,431/690,422/690,417/690,412/691,401/692,393/693,388/693,377/693,369/693,361/693,352/693,344/694,335/695,325/695,320/696,311/696,306/697,301/697,294/697,285/697,276/697,269/697,264/698,256/698,251/699,242/699,235/699,228/699,223/699,217/699,210/699,205/699,199/698,193/698,187/698,181/698,175/698,169/697,164/697,159/697,153/696,148/695,141/695,136/694,129/693,124/692,119/692,114/692,124/691,133/689,137/687,142/685,146/683,153/682,158/681,163/679,167/677,172/675,176/672,182/670,187/667,194/665,198/662,203/659,209/656,215/653,221/651,226/649,230/647,234/644,239/642,244/639,249/636,254/632,260/630,264/624,273/621,277/618,281/615,285/613,289/606,298/603,302/599,307/595,311/591,315/587,318/583,323/579,326/575,329/571,333/567,337/561,342/555,347/549,354/541,362/538,366/532,371/527,376/521,380/516,384/511,389/506,392/500,397/496,400/488,406/484,409/477,413/472,417/468,420/462,423/458,426/450,431/446,433/442,436/437,438/433,440/428,442/424,445/418,448/412,451/408,453/398,458/394,460/386,463/382,465/378,467/373,469/367,471/360,475/351,478/344,482/337,485/329,488/323,490/318,492/313,494/308,495/303,497/297,500/293,502/288,503/283,505/279,507/273,508/268,509/263,511/258,512/253,512/248,512/247,518/247,524/247,530/248,537/250,541"
var bigRampVec = Vertices.fromPath(`${objetos}`)
bigRampVec = scaleVertices(bigRampVec,scale*0.35)


var smallRampVec = Vertices.fromPath(
    "384,753/407,752/444,746/477,741/514,734/554,727/598,719/644,709/718,693/768,680/819,665/870,648/920,630/987,602/1024,584/1056,567/1082,550/1105,535/1124,521/1139,510/1154,500/1166,493/1172,485/1173,500/1173,567/1172,587/1170,607/1167,627/1163,657/1161,676/1158,693/1157,710/1155,726/1154,742/1153,762/1153,753"
);
smallRampVec = scaleVertices(smallRampVec, scale*0.2)
 
var bigRamp = Bodies.fromVertices(
    width * 0.895,
    height * 0.447,
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
    height * 0.271,

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
    mass:25,
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
var resetButton= Bodies.rectangle(width*0.05, height * 0.031, width*0.06 , width*0.06, {
    collisionFilter: { mask: noCollition  },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/Reset.png',
            xScale:width*0.0012,
            yScale:width*0.0012
        }
    }

})

var addNewObjButton= Bodies.rectangle(width*0.17, height * 0.031, width*0.06 , height*0.035, {
    collisionFilter: { mask: noCollition  },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/Objetos.png',
            xScale:width*0.0012,
            yScale:width*0.0012
        }
    }
})

var fullScreenButton= Bodies.rectangle(width-width*0.045, height * 0.031, width*0.06 , width*0.06, {
    collisionFilter: { mask:  noCollition },
    isStatic: true,
    render: {
        sprite: {
            texture: './src/images/fullscreen.png',
            xScale:width*0.0012,
            yScale:width*0.0012
        }
    }
})

World.add(world, [resetButton,addNewObjButton,fullScreenButton]);

//pendulos

var pendulo = Bodies.circle(xPenduloPosition, yPenduloPosition, radioPendulo, { density: 0.04,mass:masaPendulo, frictionAir: 0.005, 
    render: {
        sprite: {
            texture: './src/images/Yoyo.png',
            xScale:width*0.003,
            yScale:width*0.003
        }
    },
});
World.add(world, pendulo);
World.add(world, Constraint.create({
    pointA: { x: xPenduloCuerdaPosition, y: yPenduloCuerdaPosition },
    bodyB: pendulo
}));


// Plataforma que pivota
var CatapulaVec = Vertices.fromPath(
    "131,297/136,298/171,298/173,302/173,308/174,315/175,320/177,325/179,329/182,333/192,343/196,348/202,353/207,357/213,362/217,366/222,369/226,371/232,372/237,373/243,374/252,375/261,375/268,376/276,377/364,377/369,378/393,378/401,379/411,379/418,380/427,381/462,381/469,382/479,382/484,383/490,383/498,384/504,384/509,385/519,385/525,386/540,386/545,387/562,387/571,388/577,388/583,389/590,389/596,390/606,391/619,391/626,392/648,392/654,393/660,393/666,394/776,394/781,396/781,406/782,411/783,419/783,426/782,432/777,431/769,430/762,429/757,428/743,428/736,427/726,427/720,426/713,426/699,424/685,424/675,423/668,423/662,422/628,422/621,421/606,421/598,420/561,420/553,419/481,419/473,418/326,418/319,417/312,417/302,416/296,416/291,415/285,414/280,414/275,413/266,411/260,410/254,408/248,407/242,406/237,405/230,403/225,401/219,400/214,398/209,396/203,395/195,392/183,386/176,383/168,378/163,374/157,369/152,365/146,355/144,350/142,345/140,340/137,332/135,325/134,320/132,313/131,306"
);
CatapulaVec = scaleVertices(CatapulaVec, scale*0.377)
 
var Catapula = Bodies.fromVertices(
    width * 0.895,
    height * 0.447,
    CatapulaVec,
     {
        render: {
            fillStyle: "#c67267",
            strokeStyle: "#c67267",
            lineWidth: 1,
        },
    },
    true,
);


var Plataforma = Catapula;
var boxPlatform = Bodies.rectangle(0+width*0.11,height-height*0.07,width*0.19 ,height*0.12,{
    isStatic:true,
    render: {
        fillStyle: wallsColor
        // sprite: {
        //     texture: './src/images/MADERA.png',
        //     xScale:width*0.00037,
        //     yScale:width*0.000234
        // }
    },
});
var constraint = Constraint.create({
    pointA: { x: xPlataformaPosition, y: yPlataformaPosition },
    bodyB: Plataforma,
    length: 0
});

World.add(world, [Plataforma, constraint,boxPlatform]);





