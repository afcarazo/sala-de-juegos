import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  confirmPassword = "";
  user: Usuario;
  formularioregistro: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService,
    private toast: NotificacionesService,
    public datepipe: DatePipe,
    public notificationService: NotificacionesService,
    public fb: FormBuilder
  ) {
    this.user = new Usuario();
    this.formularioregistro = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

      register() {
    if (this.user.password == this.confirmPassword) {
      if (this.user.email != '' && this.user.password != '' && this.confirmPassword != '') {
       this.authService.register(this.user.email, this.user.password);      

      }
      else {

        this.toast.showNotificationError('ERROR', 'Por favor complete todos los campos!');
      }//vacio
    }
    else {
      this.toast.showNotificationError('ERROR', 'Las constraseñas no coinciden!');

    }//las contraseñas no coinciden
  }

  ngOnInit() { }

}
