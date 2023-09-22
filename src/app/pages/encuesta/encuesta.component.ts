import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/clases/encuesta';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public forma: FormGroup;

  encuesta: Encuesta;
  encuestas: any;
  texto: string = "Mostrar listado";
  mostrarOk: boolean = false;
  encuestado: Usuario;
  public constructor(private fb: FormBuilder, private firestoreService: EncuestaService, private auth:AuthService, private notificaciones:NotificacionesService) {
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'numeroDeTelefono': ['', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]]
    });
    this.encuestado = new Usuario();
    this.encuesta = new Encuesta(this.encuestado);
    this.encuestas = [];
  }

  ngOnInit(): void {
    /*this.firestoreService.traerListaEncuestas().subscribe((encuestas) => {
      if (encuestas != null) {
        this.encuestas = encuestas;
      }
    });*/

  }

  public aceptar(): void {
    if (this.forma)
      console.log(this.forma.getRawValue());
  }

  // CUSTOM VALIDATOR
  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null;
  }


  async registrarEncuesta($event: any) {
    $event.preventDefault();
    if (this.validaciones()) {
      //this.encuestas.push(this.encuesta);
      const result = await this.auth.getCurrentUser();
      if (result?.email) { 
        this.encuestado.email = result?.email;
      }
      this.firestoreService.guardarEncuesta(this.encuestado);
      this.notificaciones.showNotificationSuccess('Exito!','Encuesta enviada!');
      console.log(this.encuestas);
      
      this.encuesta = new Encuesta(new Usuario());
    }
  }
  validaciones(): boolean {
    let ok: boolean = true;
    if (this.encuesta.encuestado.nombre === ''
      || this.encuesta.encuestado.apellido === ''
      ||this.encuesta.encuestado.edad === 0
      ||this.encuesta.encuestado.numeroDeTelefono === 0
      || this.encuesta.encuestado.nombre === '')
    {
      ok = false;
     // alert('ERROR, Complete todos los campos para registrar!');
    }
    console.log(this.encuesta);
    return ok;
  }
  MostrarListado() {
    if (this.mostrarOk) {
      this.texto = "Mostrar listado";
      this.mostrarOk = false;
    }
    else {

      this.texto = "Cerrar listado";
      this.mostrarOk = true;
    }
  }

}
