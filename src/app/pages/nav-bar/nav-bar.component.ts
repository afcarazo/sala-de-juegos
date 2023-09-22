import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogin : boolean;
  isAdmin : boolean;
  constructor(private router: Router, private auth: AuthService) {
    this.isLogin = false;
    this.isAdmin = false;
    this.login();

    console.log(this.isLogin);
  }
  ngOnInit(): void {

  
  }
  async login()
  {
    const result = await this.auth.getCurrentUser();
    if (result) {
      //console.log(result);
      this.isLogin = true;
    }
    if(result?.email=='admin@admin.com')
    { 
      this.isAdmin = true;
    }
   }
  navegarAlogin()
  {
    this.router.navigateByUrl('login');
  
   }
  navegarAJuegos()
  {
    this.router.navigateByUrl('juegos');
  
   }
  navegarAhome()
  {
    this.router.navigateByUrl('');
   }
   
   navegarAregister()
  {
    this.router.navigateByUrl('registro');
   }
   navegarAquienSoy()
  {
    this.router.navigateByUrl('quien-soy');
   }

  navegarAPerfil()
  {
    this.router.navigateByUrl('perfil');
  }

  navegarAChat()
  {
    this.router.navigateByUrl('chat');
  }
  logout() {
    this.isLogin = false;
    this.auth.logout();
    this.navegarAhome();
    window.location.reload;
  }
  navegarAListados() { 
    this.router.navigateByUrl('listados');
  }
  navegarAEncuesta() { 
    this.router.navigateByUrl('encuesta');
  }

  navegarAEncuestaResultados() { 
    this.router.navigateByUrl('listado-encuestas');
  }

}
