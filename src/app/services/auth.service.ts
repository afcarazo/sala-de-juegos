import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,sendPasswordResetEmail,signInWithPopup,GoogleAuthProvider,onAuthStateChanged} from '@angular/fire/auth'
import { NotificacionesService } from './notificaciones.service';
import { FirestoreService } from './firestore.service';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  constructor(private auth: AngularFireAuth, private fs: AngularFirestore, private notificacionesService: NotificacionesService, private firestore: FirestoreService, private datepipe: DatePipe, private router: Router) {
    
  }

  resetPassword({ email }: any) {
    try {
      return this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      return null;
    }
  }
  async register(email: any, password: any) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        let user = new Usuario();
        let name = "";
        user.email = email;
        user.password = password;
        //displayName
        if (this.getName(user.email) != '') {
          user.name = this.getName(user.email);
        }
        user.id = data.user?.uid;
        let currentDate = new Date();
        let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
        if (latest_date) {
          user.fechaRegistro = latest_date;
        }
        this.firestore
          .createUser(user)
          .then(() => {
            this.notificacionesService.showNotificationSuccess(
              'Exito!',
              'Registro exitoso, redirigiendo a home.'
            );
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          })
          .catch((error) => {
        
            this.notificacionesService.showNotificationError(
              'ERROR',
              error.code
            );
          
          });
      })
      .catch((error) => {
        
        if (error.code == 'auth/email-already-in-use') {
          this.notificacionesService.showNotificationError(
            'ERROR',
            'El usuario ya existe!'
          );
        } else {
          this.notificacionesService.showNotificationError(
            'ERROR',
            error.code
          );
        }
      });
  }


  async login(email: any, password: any) {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password).catch((error) => {
        if (error.code == 'auth/wrong-password') {
  
          this.notificacionesService.showNotificationError('ERROR', 'Email/contraseña incorrecta. Intente nuevamente!');
        } else {
          this.notificacionesService.showNotificationError('ERROR', error.message);
        }
          
      })
      return user;
    } catch (error) {
      return null;
    }
  
  }
  logout() {
    return this.auth.signOut();
  }
  async googleLogin() {
    try {
      return this.auth.signInWithPopup(new GoogleAuthProvider);
    } catch (error) {
      return null;
    }
  }
  isLogin(user:any) { 
    
    try {
      return this.auth.onAuthStateChanged(user);
    } catch (error) {
      return null;
    }
  }
  getCurrentUser()
  { const user = this.auth.currentUser;
    return user;
 }

  getUser() { 
      this.auth.onAuthStateChanged((user) => { 
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          return user.uid;
        }
        else { 
          return null;
        }
      })
  }
  getName(email:string):string
  {
    let name = '';
    for (let index = 0; index < email.length; index++) {
      if (email[index] != "@") {
        if (index == 0) {
          name += email[index].toUpperCase();
        } else
        {
          name += email[index];

        }
      }
      else { 
        break;
      }
    }
    return name;
   }
}