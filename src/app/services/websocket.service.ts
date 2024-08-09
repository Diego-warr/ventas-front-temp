import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;

  public socketStatus = false;
  public usuario = null;

  private subject: Subject<any> = new Subject<any>();

  constructor() {
    this.checkStatus();
  }

    checkStatus() {
      this.socket = new WebSocket("ws://192.168.2.30:8008/ubicacion");
      console.log(this.socket)
      this.socket.onopen = (event) => {
        console.log("open:", event);
        this.socketStatus = true;
      }
      this.socket.onclose = (event) => {
        console.log("close:", event);
        this.socketStatus = false;
      }
      this.socket.onerror = (event) => {
        console.log("error:", event);
      }
      this.socket.onmessage = (event) => {
        console.log("message:", event);
        this.subject.next(event);
      }
    }

    emit(payload?: any) {
      console.log('Emitiendo', payload);
      this.socket.send(payload);
    }

    listen() {
      return this.subject; 
    }

}
