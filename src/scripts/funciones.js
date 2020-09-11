//Hace que el juego se repita (mirar si es posible mejorarlo)
function Repetir(bool) {
    if (bool) {
        Swal.fire({
            title: 'Parece que no lo lograste',
            text: "Pero no te desanimes, vuelvelo a intentar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Repetir intento!',
            cancelButtonText: 'rendirte :(',
            target:elem //definir en que contenedor se va a visualizar
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
        })
    }
}

function reset() {
    Repetir(true)
}




//añade un elemento nuevo a la maquina
function añadirTv(number) {
    let boxAdd = Bodies.rectangle(width*0.9, height*0.9, width*0.17, width*0.12, {
      collisionFilter: {
          category: noCollition | collition,
      },
      render: {
        mass:number,
        friction: 0.002,
          sprite: {
              texture: "./src/images/tv.png",
              fillStyle: "red",
              xScale: width*0.00006,
              yScale: width*0.00006,
          },
      },
  });
    World.add(world,boxAdd )
}

function añadirPelota() {
  let ball = Bodies.circle(width*0.9, height*0.9, ballBound, { 
    collisionFilter: {
        category: noCollition | collition
    }, 
    friction: 0.002,
    mass:20,
    restitution: rest,
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