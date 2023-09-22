import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-resultados-encuestas',
  templateUrl: './resultados-encuestas.component.html',
  styleUrls: ['./resultados-encuestas.component.css']
})
export class ResultadosEncuestasComponent implements OnInit {

  listadoEncuestas: any[];
  constructor(private firestoreService:EncuestaService) { 
    this.listadoEncuestas = [];
  }

  ngOnInit(): void {
    this.firestoreService.traerListaEncuestas().subscribe((encuestas) => {
      if (encuestas != null) {
        this.listadoEncuestas = encuestas;
      }
    });
  }

}
