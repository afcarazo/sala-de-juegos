import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  users: any;
  elemento: any;
  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes();
    setTimeout(() => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
     },3000)

  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje()
  { 
    console.log(this.mensaje);
  
    if(this.mensaje.length===0)
    {
      return;
    }
    this.chatService.agregarMensaje(this.mensaje).then(() =>
    this.mensaje = "")
      .catch((error) => console.error('Error al enviar', error));

  }
  

}
