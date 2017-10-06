function NavesE(){
    this.enemigo1;
    this.enemigo2;
    this.enemigos1Array;
    this.enemigos2Array;
    this.constDistancia;
    this.constVelocidad1=1;
    this.constVelocidad2=1;
    this.balaEImagen;
    this.balaE1;
    this.balaE2;
    this.balaEArray;
   this.distx
    this.crear=function(){
       this.enemigos1Array=new Group();
       this.enemigos2Array=new Group();
       this.balaEImagen=loadImage("./images/enemylaser.png");
       this.balaEArray=new Group();
       this.distx=100;
        for(var i=0; i<7;i++){
            this.enemigo1=createSprite(60+this.distx*i,70);
            this.enemigo1.addAnimation("enemigo1","./images/eazul1.png","./images/eazul2.png");
            this.enemigo1.setCollider("rectangle",0,0,40,30);
           // this.enemigo1.debug=true;
            this.enemigos1Array.add(this.enemigo1);
            this.enemigo2=createSprite(60+this.distx*i,120);
            this.enemigo2.addAnimation("enemigo2","./images/everde1.png","./images/everde2.png");
            this.enemigo2.setCollider("rectangle",0,0,40,30);
           // this.enemigo2.debug=true;
            this.enemigos2Array.add(this.enemigo2);
        }
    }
    this.movimiento=function(){
        var tiempo=second();
        for(var i=0; i<this.enemigos1Array.length;i++){
            var g=this.enemigos1Array[i];//en una sola variable agrupamos todas instancias del array y ejecutamos una acción
            //unísona
            
            if(g.position.x<=g.width+15){this.constVelocidad1=1.5;}
            //podemos modificar el movimiento de las naves
            if(g.position.x>=width-(g.width+15)){this.constVelocidad1=-1.5;}
            if(tiempo%5==0){g.position.y+=1;}
            g.velocity.x=this.constVelocidad1;

        }
      
        for(var i=0;i<this.enemigos2Array.length;i++){
            var d=this.enemigos2Array[i];
            if(d.position.x<=d.width+15){this.constVelocidad2=1.3;}
            if(d.position.x>=width-(d.width+15)){this.constVelocidad2=-1.3;}
            if(tiempo%5==0){d.position.y+=1;}
            d.velocity.x=this.constVelocidad2;
        }
        
    }
    this.disparo=function(){
        var cantidad1=this.enemigos1Array.length
        var cantidad2=this.enemigos2Array.length
      //  console.log(cantidad2); revisor de la variacion de la cantidad.
        var posicion1=parseInt(random(0, cantidad1));
        var posicion2=parseInt(random(0, cantidad2));
       
        if(frameCount%60==0){
          if(posicion1!=0){
            this.balaE=createSprite(this.enemigos1Array[posicion1-1].position.x,this.enemigos1Array[posicion1-1].position.y);
            this.balaE.addImage(this.balaEImagen);
            this.balaE.setCollider("rectangle",0,0,5,15);
            //this.balaE.debug=true; // debugeamos las bala
            this.balaE.life=170;
            this.balaE.velocity.y=8;
            this.balaEArray.add(this.balaE);
          }
          else{return 0;}

        }
     if(frameCount%40==0){
          if(posicion2!=0){//El problema surge en que nunca será nulo, 
            //la cantidad está definida por la longitud del array, y la longitud no es nula es cero, entonces siempre y cuando la 
            //posición, es decir que haya un intervalo entre cantidad y cero, se podrá ejecutar un disparo.
            this.balaE=createSprite(this.enemigos2Array[posicion2-1].position.x,this.enemigos2Array[posicion2-1].position.y);
            this.balaE.addImage(this.balaEImagen);
            this.balaE.setCollider("rectangle",0,0,5,15);
            //this.balaE.debug=true; // debugeamos las bala
            this.balaE.life=170;
            this.balaE.velocity.y=10;
            this.balaEArray.add(this.balaE);
          }
          else{return 0;}
           
        }

    }
    this.muerte=function(nave){

        
        if(nave.balaH==null){}
        else{
            for(var i=0; i<nave.balaHArray.length;i++){
                nave.balaHArray[i].collide(this.enemigos1Array,this.eliminar);
                nave.balaHArray[i].collide(this.enemigos2Array,this.eliminar);
            }
            
            //console.log(nave.balaHArray.length);
        }
        if(this.enemigos1Array.length==0 && this.enemigos2Array.length==0){juegoTerminado();}
        


    }

    this.eliminar=function(bala, enemigo){enemigo.remove();}
   // this.eliminar2=function(bala,enemigo){enemigo.remove;}





}