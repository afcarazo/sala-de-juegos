import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';
import { Chat } from '../clases/chat';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Chat>;
  public chats: Chat[] = [];
  usuario: any;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private auth:AuthService) {
    this.usuario = new Usuario();
    this.itemsCollection = this.afs.collection<Chat>('chats', ref => ref.orderBy('date', 'asc').limit(10));
  
    this.afAuth.authState.subscribe(user => {
      console.log('estado', user);
      if (!user)
      {
        return;
      }
      this.usuario.id = user.uid;
      if(user.email)
      this.usuario.name = this.auth.getName(user.email);
     })
    }
  
  cargarMensajes() {
    
    return this.itemsCollection.valueChanges().subscribe((mensajes) => {
      if (mensajes !== null) {
        this.chats = mensajes;
        this.chats = [];
        for (let mensaje of mensajes) {
         this.chats.unshift(mensaje);
          
        }
      }
      return this.chats;
    });

  }
  agregarMensaje(texto:string)
  { 
    let date = new Date();
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    //TODO falta el UID
    console.log(this.usuario);
    let mensaje: Chat =
    {
      name: this.usuario.name,
      message: texto,
      date: fecha,
      uid:this.usuario.id

    }
    console.log(mensaje);
    return this.itemsCollection.add(mensaje);
  }
  
}

