import { Component, OnInit } from '@angular/core';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-juego-propio',
  templateUrl: './juego-propio.component.html',
  styleUrls: ['./juego-propio.component.css']
})
export class JuegoPropioComponent implements OnInit {
  resultados : any;
  public tituloPage = 'Escape: Dinosaurio';

  //Tiempos animaciones y movimientos
  public time: Date=new Date();
  public deltaTime: number=0;

  //Necesarios
  public sueloY = 22;
  public velY: number=0;
  public impulso = 2.6;
  public gravedad = 0.05;

  //Dino
  public claseDino: string="";
  public dinoPosX = 42;
  public dinoPosY: number=0;

  //Suelo y escenario
  public sueloX: number=0;
  public sueloLeft: number=0;
  public velEscenario = 1280/3;
  public gameVel = 1;


  //Obstaculos
  public tiempoHastaObstaculo = 1800;
  public tiempoObstaculoMin = 400;
  public tiempoObstaculoMax = 1500;
  public obstaculoPosY = 16;
  public obstaculos: any[] = [];

  //Estado juego
  public puntaje: number=0;
  public juegoIniciado = false;
  public gameOver = false;

  //Estado dino
  public parado = true;
  public saltando = false;

  public correoJugador: string='';

  constructor(private firestoreService:PartidasService) { }

  ngOnInit(): void {
    this.juegoIniciado = false;
    this.gameOver = false;
    this.parado = false;

    console.log(!this.juegoIniciado && !this.gameOver);
  }

  public Update(){

    if(!this.parado)
    {
      this.MoverSuelo();
      this.MoverDinosaurio();
      this.DecidirCrearObstaculo();
      this.MoverObstaculos();
      this.DetectarColision();

      this.velY -= this.gravedad;
    }
  }

  public Start(){
    this.time = new Date();
    this.deltaTime = 0;
    this.velY = 0;
    this.dinoPosY = this.sueloY;
    this.sueloX = 0;
    this.sueloLeft = 0;
    this.obstaculos = [];

    this.puntaje = 0;


    this.gameOver = false;
    this.parado = false;
    this.claseDino = 'dino-corriendo'
    this.juegoIniciado = true;

    console.log("gameOver:",this.gameOver,"juegoIniciado",this.juegoIniciado)
    this.Loop();
  }

  public Loop(){
    if(!this.gameOver){
      this.deltaTime = 2+(new Date().getTime() - this.time.getTime()) / 60000;
      this.Update();
      window.requestAnimationFrame(() => this.Loop());
    }
  }

  public MoverSuelo(){
    this.sueloX += this.CalcularDesplazamiento();
    this.sueloLeft = -(this.sueloX % 920);
  }

  public CalcularDesplazamiento(){
    return this.deltaTime * this.gameVel;
  }

  public Saltador(){
    if(!this.parado){
      this.Saltar();
    }
  }

  public Saltar(){
    if(this.dinoPosY === this.sueloY){
      this.saltando = true;
      this.velY = this.impulso;

      this.claseDino = "";
    }
  }

  public MoverDinosaurio(){
    this.dinoPosY += this.velY * 2.4;
    if(this.dinoPosY < this.sueloY){
      this.TocarSuelo();
    }
  }

  public TocarSuelo(){
    this.dinoPosY = this.sueloY;
    this.velY = 0;
    if(this.saltando){
      this.claseDino = "dino-corriendo";
    }
    this.saltando = false;
  }

  public DecidirCrearObstaculo(){
    this.tiempoHastaObstaculo -= this.deltaTime;
    if(this.tiempoHastaObstaculo <= 100){
      this.CrearObstaculo();
    }
  }

  public CrearObstaculo(){
    let obstaculo = {posX: 920};
    this.obstaculos.push(obstaculo);
    console.log(this.obstaculos);
    this.tiempoHastaObstaculo = this.tiempoObstaculoMin + Math.random() * (this.tiempoObstaculoMax-this.tiempoObstaculoMin) / this.gameVel;
  }

  public MoverObstaculos(){
    for(let i = this.obstaculos.length -1; i>=0; i--){
      if(this.obstaculos[i].posX < -50){

        this.obstaculos.splice(i,1);
        this.GanarPuntos();
      }
      else{
        this.obstaculos[i].posX -= this.CalcularDesplazamiento();
      }
    }
  }

  public DetectarColision(){
    for(let i = 0; i<this.obstaculos.length; i++){
      if (this.obstaculos[i].posX > this.dinoPosX + 84){
        //EVADE
        break;
      }
      else{
        if(this.IsCollision(this.obstaculos[i])){
          this.GameOver();
        }
      }
    }
  }

  public IsCollision(obstaculo: any){
    const dino = {left: this.dinoPosX, top: this.dinoPosY, height: 84, width: 84};
    const cactus = {left: obstaculo.posX, top: 22, height: 96, width: 46};
    const paddingTop = 10;
    const paddingRight = 30;
    const paddingBottom = 15;
    const paddingLeft = 20;

    return !(
      (dino.top + dino.height - paddingBottom < cactus.top) ||
      (dino.top + paddingTop > cactus.top + cactus.height)  ||
      (dino.left + dino.width - paddingRight < cactus.left) ||
      (dino.left + paddingLeft > cactus.left + cactus.width)
    )
  }

  public GameOver(){
    this.gameOver = true;
    this.parado = true;

    this.claseDino = "dino-estrellado";

    console.log("gameOver:",this.gameOver,"juegoIniciado",this.juegoIniciado)
    //this.puntajeService.registrarPuntaje('Escape: Dinosaurio',this.correoJugador, this.puntaje);
  }

  public GanarPuntos(){
    this.puntaje++;
    
    this.resultados = this.firestoreService.juegos.find(juego => juego.juego == 'rescata-al-dinosaurio');
    this.resultados.puntuacion += this.puntaje;

    this.firestoreService.setPuntuacion(this.resultados.id,this.resultados.puntuacion);
  }
}
