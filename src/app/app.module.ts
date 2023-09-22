import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  canActivate,
  AuthGuard
} from '@angular/fire/auth-guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule,ToastContainerModule  } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {
  NgxMatErrorsModule
} from 'ngx-mat-errors';
import { Auth } from '@angular/fire/auth';
import { ChatComponent } from './pages/chat/chat.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { HttpClientModule } from '@angular/common/http';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { JuegoPropioComponent } from './pages/juego-propio/juego-propio.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ListadoResultadosComponent } from './pages/listado-resultados/listado-resultados.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { ResultadosEncuestasComponent } from './pages/resultados-encuestas/resultados-encuestas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    RegistroComponent,
    PerfilComponent,
    NavBarComponent,
    ChatComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    JuegosComponent,
    JuegoPropioComponent,
    ResultadosComponent,
    ListadoResultadosComponent,
    EncuestaComponent,
    ResultadosEncuestasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    NgxMatErrorsModule,
    ReactiveFormsModule,
    FormsModule
  

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],

})
export class AppModule { }
