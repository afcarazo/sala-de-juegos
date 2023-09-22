import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { PaisesService } from 'src/app/services/paises.service';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  pregunta:any;
  pais:any;
  loading:boolean = true;
  arrayPaises: any = [];
  juego: any;
  ganadas: number;
  perdidas: number;
  arrayPreguntas:any = [
    {
      //ARGENTINA
      pregunta:'¿Qué ocurrió el 9 de julio de 1816?',
      op1:'Revolución de Mayo',
      op2:'Se declaró la Independencia',
      op3:'El Cordobazo',
      op4:'La Noche de los Lápices',
      respuesta: 2,
    },
    {
      //COLOMBIA
      pregunta:'¿Qué cordillera atraviesa el territorio colombiano?',
      op1:'Cordillera de los Andes',
      op2:'Cordillera de Brooks',
      op3:'cordillera de Talamanca',
      op4:'Ninguna de las anteriores',
      respuesta: 1,
    },
    {
      //BRASIL
      pregunta:'¿Quién es el actual presidente de Brasil?',
      op1:'Jair Bolsonaro',
      op2:'Gustavo Petro',
      op3:'Gabriel Boric',
      op4:'Nicolás Maduro Moros',
      respuesta: 1,
    },
    {
      //ESPAÑA
      pregunta:'¿Cuántos mundiales de Fútbol ha ganado España?',
      op1:'tres',
      op2:'dos',
      op3:'uno',
      op4:'ninguno',
      respuesta: 1,
    },
    {
      //CHILE
      pregunta:'¿Cúal es el nombre de la flor nacional de Chile?',
      op1:'Bailahuén',
      op2:'Boldo',
      op3:'Rosa',
      op4:'Copíhue',
      respuesta: 4,
    },
    {
      //PERÚ
      pregunta:'¿Cúal es la capital de este país?',
      op1:'Asunción',
      op2:'Quito',
      op3:'Brasilia',
      op4:'Lima',
      respuesta: 4,
    }
  ];

  constructor(private paisesService: PaisesService, private notificacionesService:NotificacionesService, private firestoreService:PartidasService) {
   
    this.ganadas =0;
    this.perdidas=0;
  }

  ngOnInit(): void {
    this.paisesService.traerPaises().subscribe(datosRetornados => {
      this.arrayPaises = datosRetornados;
      console.info('PREGUNTAS', this.arrayPreguntas);
      this.armarPregunta();
    });
  }


  armarPregunta()
  {
    let indexRandom = this.getRandomInt(0,6);
    this.pregunta = this.arrayPreguntas[indexRandom];
    this.pais = this.arrayPaises[indexRandom];

    console.info('pregunta', this.pregunta);
    console.info('pais', this.pais);
    this.loading = false;
  }


  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  seleccionarRta(respuesta:any)
  {
    this.loading = true;
    if(respuesta == this.pregunta.respuesta)
    {
      console.info('error');
      this.notificacionesService.showNotificationSuccess('Correcto!', 'Has acertado la pregunta.');
        
    console.log(this.firestoreService.juegos);
      this.juego = this.firestoreService.juegos.find(juego => juego.juego == 'preguntados');
      this.ganadas++;
      console.log(this.juego);
      this.juego.ganadas += this.ganadas;
      console.log(this.juego.ganadas);
      this.firestoreService.setGanadas(this.juego.id,this.juego.ganadas);
  
    }
    else
    {
      console.info('error');
      this.juego = this.firestoreService.juegos.find(juego => juego.juego == 'preguntados');
      this.notificacionesService.showNotificationError('Incorrecto!', 'Has fallado la pregunta.');
      this.perdidas++;
      this.juego.perdidas += this.perdidas;
      this.firestoreService.setPerdidas(this.juego.id,this.juego.perdidas);
    }
    setTimeout(() => {
      this.armarPregunta();
    }, 200);
  }
}
