import {EventEmitter, Injectable, Output} from "@angular/core";
import {UsuarioBodyDTO} from "../../../dto/UsuarioBodyDTO";

@Injectable({providedIn: 'root'})
export class ActionsServices {

  isOpen = false;
  vendedor: UsuarioBodyDTO = {
    correo: "",
    apellidos: "",
    username: "",
    password: "",
    nombres: "",
    status: "A",
    usuarioId: 0,
    roles: [],
    lineaNegocios: []
  };

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() dataUserChange: EventEmitter<UsuarioBodyDTO> = new EventEmitter();

  toggle() {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }

  sendDataUsuario(vendedor: UsuarioBodyDTO) {
    this.vendedor = vendedor;
    this.dataUserChange.emit(this.vendedor);
  }

  closeEmitter() {
    this.dataUserChange.complete();
  }
}
