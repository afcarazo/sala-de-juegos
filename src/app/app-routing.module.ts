import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { RegistroComponent } from './pages/registro/registro.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth.guard';
import { ChatComponent } from './pages/chat/chat.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { JuegoPropioComponent } from './pages/juego-propio/juego-propio.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { AdminGuard } from './guards/admin.guard';
import { ResultadosEncuestasComponent } from './pages/resultados-encuestas/resultados-encuestas.component';
/*loadchildren --> juegos*/ 
const routes: Routes =
[{ path: '', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'quien-soy', component: QuienSoyComponent },
{ path: 'registro', component: RegistroComponent },
{ path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
{ path: 'ahorcado', component: AhorcadoComponent },
{ path: 'mayor-menor', component: MayorMenorComponent },
{ path: 'preguntados', component: PreguntadosComponent },
{ path: 'juegos', component: JuegosComponent },
{ path: 'juego-propio', component: JuegoPropioComponent },
{ path: 'listados', component: ResultadosComponent },
{ path: 'encuesta', component: EncuestaComponent },
{ path: 'perfil', component: PerfilComponent ,  canActivate: [AuthGuard] }, 
{ path: 'listado-encuestas', component: ResultadosEncuestasComponent ,  canActivate: [AdminGuard] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
