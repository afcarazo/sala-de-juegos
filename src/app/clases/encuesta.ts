import { Usuario } from "./usuario";

export class Encuesta {
    encuestado: Usuario;
    constructor(encuestado:Usuario)
    { 
        this.encuestado = encuestado;
    }
}
