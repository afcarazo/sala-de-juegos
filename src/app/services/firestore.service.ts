import { Injectable } from '@angular/core';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection, DocumentReference } from 'firebase/firestore';
import { Usuario } from '../clases/usuario';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  routerCollection = '/usuarios';
  referCollection : AngularFirestoreCollection<Usuario>;
  referBD:AngularFirestore;
  constructor(private bd: AngularFirestore) { 
    this.referBD = bd;
    this.referCollection = this.referBD.collection(this.routerCollection);
  }

  
  
   createUser(usuario:Usuario)
  {
    try
    { 
      return this.referCollection.add({...usuario});
    }
    catch (error) { 
      throw error;
    }
  
  }
  public searchUser(id: string) {
    return this.referBD.collection(this.routerCollection, ref => ref.where("id", "==", id));
  }
  getDoc<tipo>(path: string, id: string)
  {
    return this.referBD.collection(path).doc<tipo>(id).valueChanges();
  }

  users()
  {
    return this.referCollection.valueChanges();
  }

  probando(id:string)
  {
    let collection = this.referBD.collection(this.routerCollection).get();
    collection.forEach(doc => console.log(doc));
   }
}
