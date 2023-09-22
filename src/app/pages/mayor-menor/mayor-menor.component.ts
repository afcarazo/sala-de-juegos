import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Juego } from 'src/app/clases/juego';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  numeroAleatorio: number;
  segundoNumero: number;
  puntuacion: number;
  resultados : any;

  constructor(private router: Router, private firestoreService:PartidasService, private auth:AuthService ) {
    this.numeroAleatorio = this.getRandom();
    this.segundoNumero = this.getRandom();
    this.puntuacion = 0;

  }

  ngOnInit(): void {
  }

  getRandom() {
    let numero = Math.floor(Math.random() * (13 - 1)) + 1;
    //console.log(numero);
    return Math.floor(numero);
  }

  esMenor() {
    if (this.segundoNumero <= this.numeroAleatorio) {
      this.puntuacion++;
      this.numeroAleatorio = this.segundoNumero;
      this.segundoNumero = this.getRandom();
      //puntuacion +1 y asigno dos numeros nuevos
    }
    else {
      this.apareceAlert();
    }
  }

  esMayor() {
    if (this.segundoNumero >= this.numeroAleatorio) {
      this.puntuacion++;
      this.numeroAleatorio = this.segundoNumero;
      this.segundoNumero = this.getRandom();
      //puntuacion +1 y asigno dos numeros nuevos
    }
    else {
      this.apareceAlert();
    }
  }

  apareceAlert() {
    let espacio = (<HTMLElement>document.getElementById("stop"));

    espacio.innerHTML = `<div class="alert alert-warning"">
      <h4 class="alert-heading">Juego Terminado!!</h4>
      <hr>
      <p>la carta era `+ this.segundoNumero + `</p>
      <p>Has hecho `+ this.puntuacion + ` puntos.</p>
      </div>`;
    
    
    console.log(this.firestoreService.juegos);

    this.resultados = this.firestoreService.juegos.find(juego => juego.juego == 'mayor-menor');
    this.resultados.puntuacion += this.puntuacion;

    this.firestoreService.setPuntuacion(this.resultados.id,this.resultados.puntuacion);

    
    this.desabilitarBotones();
  }

  ReiniciarJuego() {
    this.router.navigateByUrl('', { skipLocationChange: true }).
      then(() => this.router.navigate(["mayor-menor"]));
  }

  desabilitarBotones() {
    (<HTMLButtonElement>document.getElementById('btnMayor')).disabled = true;
    (<HTMLButtonElement>document.getElementById('btnMenor')).disabled = true;
  }



}
