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
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Usuario;
  formularioLogin: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacionesService: NotificacionesService,
    public fb: FormBuilder
  ) { 
    this.user = new Usuario();
    this.formularioLogin = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
}

ngOnInit() {

 }


async login()
{
  try {
    if (this.user.email != '' && this.user.password != '') {

      const user = await this.authService.login(this.user.email, this.user.password);
      if (user) {
        this.notificacionesService.showNotificationSuccess('Login exitoso!', 'Redirigiendo a home!');
        setTimeout(() => { this.router.navigateByUrl('', { replaceUrl: true }); }, 2000);
      }
    } else {
      this.notificacionesService.showNotificationError('Campos vacios', 'Por favor llene todos los campos.');
    }
  } catch (error)
  {
    console.log('Ocurrio un error');
    console.log(error);
   }
  
  
 }
  quickLogin()
  { 
    this.user.email = 'admin@admin.com';
    this.user.password = '111111';
  }
  quickLoginEmpleado()
  { 
    this.user.email = 'empleado@empleado.com';
    this.user.password = '222222';
  }


}
