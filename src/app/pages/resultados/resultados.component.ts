import { Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { PartidasService } from 'src/app/services/partidas.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

 
  juegos: any[]=[];
  juegosUsuario: any[] = [];
  juego: any;
  usuarioActual: any;
  juegoRecibido!: Juego;
  constructor(private firestoreService: PartidasService, private auth:AuthService, private notificacionesService:NotificacionesService) { 
  
  }
  ngOnInit(): void {
    this.firestoreService.traerListajuegos().subscribe(juegos => {
      this.juegos = [];
      if (juegos != null) {
        juegos.forEach((element: any) => {
          /* console.log(element.payload.doc.id);*/
          this.juegos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()//crea copia con todos sus datos
          });
          console.log(this.juegos);
        });
      }
    });

  }

  

}
