import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  teclado:any = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  arrayPalabras = [
    'CABALLO',
    'COMPUTADORA',
    'TELEVISOR',
    'AURICULAR',
    'TOSTADORA',
    'PARAGUAS',
    'HELADERA',
    'MANZANA',
    'BOTELLA'
  ];

  arrayImagenes = [
    '../../../assets/ahorcado/horcaCero.png',
    '../../../assets/ahorcado/horcaUno.png',
    '../../../assets/ahorcado/horcaDos.png',
    '../../../assets/ahorcado/horcaTres.png',
    '../../../assets/ahorcado/horcaCuatro.png',
    '../../../assets/ahorcado/horcaCinco.png',
    '../../../assets/ahorcado/horcaSeis.png',
    '../../../assets/ahorcado/horcaSiete.png'
  ]
  indexImagen:number = 0;

  palabraElegida:string;
  palabraConGuionesArray:any= [];
  resultados: any;
  ganadas: any;
  perdidas: any;

  /** Elijo un numero random y luego a la variable Palabra elegida le asigno la palabra en ese indice
   *  Luego creo un array que va a contener tanta cantidad de guiones como letras la palabraElegida;
   *  este array sera el que se mostrara
   */
  constructor(private router:Router,private firestoreService:PartidasService) {
    let numero:number = this.numeroRandom();
    this.palabraElegida = this.arrayPalabras[numero];

    this.palabraConGuionesArray = Array(this.palabraElegida.length).fill('_');
   
    this.perdidas = 0;
    this.ganadas = 0;
   }

  ngOnInit(): void {
  }

  /**Devuelve un numero entre 0 y 5 que despues se utiliza para elegir la palabra aleatoria */
  numeroRandom()
  {
    return Math.floor(Math.random()*6);
  }

  /** Devuelve los indices en los que aparece una letra/string dentro de un string
   *  Si el primer parametro es A y el segundo es maravilla, la funcion devuelve [1,3,8]
   *  Esta funcion me la paso facu
   */
  getIndicesOf(searchStr: string, str: string, caseSensitive: boolean) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices:any = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
  }


  /** Se le pasa como parametro una letra y en caso de que la encuentre en la palabra escondida
   * la reemplaza en todas sus oportunidades. y devuelve true
   * en caso de no encontrarla devuelve false
   * 
   * @param letra la letra que se busca
   * @returns true si pudo reemplazar la letra o false si no encontro la letra
   */
  revelarLetra(letra:string)
  {
    let indices:any = this.getIndicesOf(letra, this.palabraElegida,false);

    console.log(indices);
    if(indices.length != 0)
    {
      for(let indice of indices)
      {
        console.log(indice);

        this.palabraConGuionesArray[indice] = letra;
        console.log(this.palabraConGuionesArray);
      }
      return true;
    }
    return false;

  }


  /** Se llama a esta funcion siempre que se apriete una letrao
   *  Busca la letra y la reemplaza
   *  Cambia la imagen en caso de error
   *  Verifica y notifica si el jugador gano
   *  Verifica y notifica si el jugador perdio
   * 
   * @param letra la letra que se oprimio
   */
  pushLetra(letra:string)
  {
    (<HTMLButtonElement> document.getElementById(letra)).disabled=true;

    if(this.revelarLetra(letra))
    {
      if(this.PlayerWins())
      {
        this.teclado.forEach((_letter: string) => {
          (<HTMLButtonElement> document.getElementById(_letter)).disabled=true;
        });
        this.apareceAlert(true);
      }
    }
    else{
      this.indexImagen++;
    }

    if(this.indexImagen == 7)
    {
      this.apareceAlert(false);
      this.teclado.forEach((_letter: string) => {
        (<HTMLButtonElement> document.getElementById(_letter)).disabled=true;
      });

    }
   
  }

  /** Recarga la pagina y recarga todos los componentes
   * 
   */
  ReiniciarJuego()
  {
    this.router.navigateByUrl('', {skipLocationChange: true}).
      then( () => this.router.navigate(["ahorcado"]));
  }

  /** Verifica si el jugador gano.
   *  controla que no haya ningun '_' en el array de la palabra
   * 
   * @returns true si el jugador completo la palabra, false si no
   */
  PlayerWins()
  {
    for(let item of this.palabraConGuionesArray)
    {
      if(item == "_")
      {
        return false;
      }
    }
    return true;
  }


  apareceAlert(gano:boolean)
  {
    let espacio = (<HTMLElement>document.getElementById("pedrito"));

    if(gano)
    {
      espacio.innerHTML= `<div class="alert alert-success"">
      <h4 class="alert-heading">Felicitaciones!!</h4>s
      <hr>
      <p>Has ganado esta partida.</p>
      </div>`
      this.resultados = this.firestoreService.juegos.find(juego => juego.juego == 'ahorcado');
      this.ganadas++;     
      this.resultados.ganadas += this.ganadas;
  
      this.firestoreService.setGanadas(this.resultados.id,this.resultados.ganadas);
    }
    else
    {
      espacio.innerHTML= `<div class="alert alert-danger" [hidden]="!perdedor" >
      <h4 class="alert-heading">Lo sentimos :(</h4>
      <hr>
      <p>Has perdido esta partida. La palabra era `+this.palabraElegida+`</p>
      </div>`
      this.resultados = this.firestoreService.juegos.find(juego => juego.juego == 'ahorcado');
      this.perdidas++;
      this.resultados.perdidas += this.perdidas;
  
      this.firestoreService.setPerdidas(this.resultados.id,this.resultados.perdidas);
    }
  }





}