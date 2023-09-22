import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Juego } from '../clases/juego';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  juegos: any[] =[];
  juegosUsuario: any;
  constructor(private angularFirestore: AngularFirestore, private auth: AuthService) { 
    this.listadoJuegos();
  }




  guardarjuego(juegoGuardar: any) {
    
    let juego = {
      juego: juegoGuardar.codigo,
      ganadas: juegoGuardar.ganadas,
      perdidas: juegoGuardar.empresa,
      puntos: juegoGuardar.puntos,
      usuario: juegoGuardar.usuario
    };
    this.angularFirestore.collection<any>('juegos').add(juego).then((res) => res.id);
  }


  traerListajuegos() {
    return this.angularFirestore.collection<any>('juegos').snapshotChanges();
  }




  listadoJuegos() {
    this.traerListajuegos().subscribe(juegos => {
      if (juegos != null) {
        juegos.forEach((element: any) => {
          /* console.log(element.payload.doc.id);*/
          this.juegos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()//crea copia con todos sus datos
          });
        });
      }
    });
    console.log('listado',this.juegos);
  }
  setUsuario(id:any, usuarios:any) {
    this.angularFirestore.collection<any>('juegos').doc(id).update({
      usuarios: usuarios
    });
  }

  setPuntuacion(id:any,puntuacion:any) { 
    this.angularFirestore.collection<any>('juegos').doc(id).update({
      puntuacion: puntuacion
    });
  }
  setGanadas(id:any,ganadas:any) { 
    this.angularFirestore.collection<any>('juegos').doc(id).update({
      ganadas: ganadas
    });
  }
  setPerdidas(id:any,perdidas:any) { 
    this.angularFirestore.collection<any>('juegos').doc(id).update({
      perdidas: perdidas
    });
  }
  

 

}
