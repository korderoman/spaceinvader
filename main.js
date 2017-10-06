var heroe;
var villano;
var portada;
var gameOver=true;
var start;
var musica;
var test=0;

function setup(){
    createCanvas(800,550);
//createCanvas(windowWidth, windowHeight).parent("juego");;

    heroe= new NavesH();
    villano= new NavesE();
    heroe.crear();
    villano.crear();
    var colores=color(255,255, 255);
    start= createButton("START");
    
    start.style("background-color",colores);
    start.size(150, 50);
    start.position(width/2-40, height/2);
    
    
    portada=loadImage("./images/portada.png");
   
}
/*
function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}*/

function draw(){
   
   if(gameOver==true){
       background(0, 100);
        image(portada, 0, 0, 800, 550);
        start.mousePressed(juegoNuevo);
   }
   if(gameOver==false){
   
    heroe.movimiento(villano);
    heroe.disparo();
    heroe.muerte(villano);
    villano.movimiento();
    villano.disparo();
    villano.muerte(heroe);
    drawSprites();
   }

   

}

function juegoNuevo(){
  heroe.nave.changeAnimation("nave");//restituimos la animacion de la nave
   heroe.perdida=0;
    gameOver=false;
    updateSprites(true);
    heroe.nave.position.x=width/2;
    //Estos es un pequeño artilugio, ya que hemos removido todos los sprites enemigos, debemos nuevamente crearlos
    //La primera vez se crea en el setup, pero luego debe jugarse entre las funciones juego nuevo y juego terminado.
   if(test==1){villano.crear();}
        test=0;
    start.hide();

}
function juegoTerminado(){
    gameOver=true;
    start.show();
    test=1;
  /**
   * Según la comunidad, el método remove, no está bien definido en la librería.
   * https://github.com/molleindustria/p5.play/issues/7
   * Entiedo esto, sin embargo el método que plantean no me funciona, finalmente llegué a la conclusión
   * de hacer un for que borre desde el último elemento hacia atrás, esto es por el solapamiento
   * del elemento, cuando un elemento de un array es eliminado, el siguiente ocupa su lugar en el index
   * pero se borramos del ultimo hacia el inicio ello, no ocurrirá
   */
    for(var i=villano.enemigos1Array.length-1;i>=0;i--){
        villano.enemigos1Array[i].remove();
    }

    for(var i=villano.enemigos2Array.length-1;i>=0;i--){
        villano.enemigos2Array[i].remove();
    }

    updateSprites(false);
    


}


/**
 * VIVIR PARA PROGRAMAR
 * PROGRAMAR PARA VIVIR
 *  
 */