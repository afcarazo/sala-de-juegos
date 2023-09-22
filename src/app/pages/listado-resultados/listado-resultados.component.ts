import { Component, OnInit,Input } from '@angular/core';
import { Juego } from 'src/app/clases/juego';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.css']
})
export class ListadoResultadosComponent implements OnInit {

  @Input() listadoJuegosRecibidos?: Juego[];

  constructor() { }
 
  ngOnInit(): void {
  }
 
}
