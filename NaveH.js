function NavesH(){
    this.nave;
    this.fondo;
    this.constAncho=20;
    this.balaHImagen;
    this.balaHArray;
    this.balaH;
    this.vida;
    this.muriendo;
    this.perdida=0;
    this.tiempo=0;
    this.crear=function(){
        //---------------------hud de vida---------//
        this.vida=function(perdida){
            var color =45-perdida
           this.muriendo=210+perdida;
            stroke(255, 255, 255);
            strokeWeight(1);
            noFill();
            
            rect(34, 9, 211, 21);
           
           this.muriendo=constrain(this.muriendo, 0, 210);
            fill(color,210+perdida,0); 
            noStroke();
            textStyle(BOLD);
            textSize(16);
            text("HP", 10, 25);
            
            rect(35, 10, this.muriendo, 20);}
        //-------------------------   -------------//
        //cargamos el sprite, en nuestro caso como no tiene una animacion
        //sólo será una imagen
        this.nave=createSprite(width/2,height-25);
        this.nave.addAnimation("nave","./images/ship.png");
        this.nave.addAnimation("muerte","./images/explosiongreen.png");
        //definimos el limite de las colisiones
        this.nave.setCollider("circle",0,0,25);
        this.nave.debug=true;//debuger de colision nave
       // this.nave.immovable=true; //hacemos que el objeto sea inmovil a la colision
        this.fondo=loadImage("./images/background.jpg");
        //Creamos la imagen de la bala
        this.balaHImagen=loadImage("./images/laser.png");
        //creamos el array de las balas
        this.balaHArray=new Group();
    }
    
    this.movimiento=function(enemigo){
        var colorP=constrain(enemigo.enemigo2.position.y, 0, 255)-30;
        //Restringimos el area de movimiento al tamaño del canvas
        image(this.fondo, 0, 0, 800, 550);
        strokeWeight(10);
        stroke(colorP, 255-colorP, 0);
        line(0, 495, width, 495);
        //------------------------hud primitivo de vida------------------//
        this.vida(this.perdida);
       
        //----------------------------        -----------------------//
        
        this.nave.position.x=constrain(this.nave.position.x, this.nave.width + this.constAncho, width-(this.constAncho+this.nave.width));
        if(keyWentDown("a")){this.nave.velocity.x=-2;}
        if(keyWentUp("a")){this.nave.velocity.x=0;}
        if(keyWentDown("d")){this.nave.velocity.x=+2;}
        if(keyWentUp("d")){this.nave.velocity.x=0;}
    }
    
    var contador=0;
    this.disparo=function(){
 
            if(keyWentDown(" ") && contador==0){
                
                this.balaH=createSprite(this.nave.position.x, this.nave.position.y-20);
                this.balaH.addImage(this.balaHImagen);
                this.balaH.setCollider("rectangle",0,0,5,15);
                this.balaH.debug=true;
                this.balaH.velocity.y=-3;
                this.balaH.life=170; //tiempo de vida de la bala
                this.balaHArray.add(this.balaH);
           }
           if(keyWentDown(" ")){contador++;}
           
           if(contador%3==0){contador=0;}
           
            console.log(contador);
        }
    this.muerte=function(enemigo){
        //llamamos a una funcion anónima
        
        if(this.nave.overlap(enemigo.balaEArray)){this.perdida-=48;}
        if(this.muriendo==0 ||enemigo.enemigo1.position.y>=495-enemigo.enemigo1.height/2 || enemigo.enemigo2.position.y>=495-enemigo.enemigo2.height/2){
            this.nave.changeAnimation("muerte");
            juegoTerminado();

        }
        
    }
   
        
}
