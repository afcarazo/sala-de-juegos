import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private angularFirestore: AngularFirestore) { }

  guardarEncuesta(encuestadoGuardar: any) { 
    
    let encuestado = {
      id: encuestadoGuardar.id,
      nombre: encuestadoGuardar.nombre,
      apellido: encuestadoGuardar.apellido,
      edad: encuestadoGuardar.edad,
      numeroDeTelefono: encuestadoGuardar.numeroDeTelefono, 
      email: encuestadoGuardar.email
     
    };
    this.angularFirestore.collection<any>('encuestas').add(encuestado);
  }

  

  traerListaEncuestas() {
    let collection = this.angularFirestore.collection<any>('encuestas');
    return collection.valueChanges();
  }


}
