import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Usuario } from 'src/app/clases/usuario';
import { Auth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  correo: any;
  date: any;
  constructor(private firebaseAuthService: AuthService, private firestoreService: FirestoreService,private datepipe:DatePipe) { 
  }

  async userData()
  {
    return await this.firebaseAuthService.getCurrentUser();
   }

  async ngOnInit() {
    let user = await this.userData();
    if (user!=null)
    {
      this.correo = user.email;
      if (user.email == 'userprueba@gmail.com') {
        this.date = '2022-09-20';
      }
      else
      {
        let currentDate = new Date();
        let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
        this.date = latest_date;
       }
    
    }
  }


}
