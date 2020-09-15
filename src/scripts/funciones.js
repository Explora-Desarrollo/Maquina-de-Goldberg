//Hace que el juego se repita (mirar si es posible mejorarlo)
function Repetir(bool) {
    if (bool) {
        Swal.fire({
            title: 'Parece que no lo lograste',
            text: "Pero no te desanimes, vuelvelo a intentar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'green',
            confirmButtonText: 'Reiniciar!',
            cancelButtonText: 'Seguir jugando',
            target:elem //definir en que contenedor se va a visualizar
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
        })
    }
}

function reset(opcion) {
  if(opcion=="reiniciar"){
    location.reload()
  }
  else{
    Repetir(true)
  }
    
    
}




//añade un elemento nuevo a la maquina
function añadirRubik() {
    let boxAdd = Bodies.rectangle(width*0.9, height*0.9, width*0.08, width*0.08, {
      collisionFilter: {
          category: noCollition | collition,
      },
      render: {
        mass:5,
        friction: 0,
          sprite: {
              texture: './src/images/Rubik.png',
              xScale:width*0.0015,
              yScale:width*0.0015
          }
      },
  });
    World.add(world,boxAdd )
}
//añade un elemento nuevo a la maquina
function añadirFlorero() {
  let boxAdd = Bodies.rectangle(100, 100, width*0.11, width*0.156, {
    collisionFilter: {
        category: noCollition | collition,
    },
    render: {
      mass:90,
      friction: 0,
        sprite: {
          texture: './src/images/Florero.png',
          xScale:width*0.0017,
          yScale:width*0.0014
      }
    },
});
  World.add(world,boxAdd )
}

function añadirPelota() {
  let ball = Bodies.circle(width*0.9, height*0.9, ballBound, { 
    collisionFilter: {
        category: noCollition | collition
    }, 
    mass:20,
    restitution: rest,
    render:{
      sprite: {
        texture: './src/images/tennis.png',
        xScale:width*0.0025,
        yScale:width*0.0025
    }
    }
})

  World.add(world,ball )
}

function añadirBolaBillar() {
  let ball = Bodies.circle(width*0.9, height*0.9, ballBound*0.9, { 
    collisionFilter: {
        category: noCollition | collition
    }, 
    mass:20,
    restitution: rest,
    render:{
      sprite: {
        texture: './src/images/Bola_billar.png',
        xScale:width*0.0025,
        yScale:width*0.0025
    }
    }
})

  World.add(world,ball )
}



//
function scaleVertices(vertObject,scale){

  for (var i = 0; i < vertObject.length; i++ ) {
    vertObject[i].x =  vertObject[i].x * scale ;
    vertObject[i].y = vertObject[i].y * scale ;
}

return vertObject;


}

//Permite iniciar un cronometro para enviar un aviso al usuario de si rendirse o no
function Observador() {
    setTimeout(function () { 
            Repetir(intentos); 
    }, endGameTime)
}

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }