export class Usuario {

  private _usuarioId: Number = 0;

  private _username: String = "";

  private _password: String = "";

  private _correo: String = "";

  private _nombres: String = "";

  private _apellidos: String = "";


  get usuarioId(): Number {
    return this._usuarioId;
  }

  set usuarioId(value: Number) {
    this._usuarioId = value;
  }

  get username(): String {
    return this._username;
  }

  set username(value: String) {
    this._username = value;
  }

  get password(): String {
    return this._password;
  }

  set password(value: String) {
    this._password = value;
  }

  get correo(): String {
    return this._correo;
  }

  set correo(value: String) {
    this._correo = value;
  }

  get nombres(): String {
    return this._nombres;
  }

  set nombres(value: String) {
    this._nombres = value;
  }

  get apellidos(): String {
    return this._apellidos;
  }

  set apellidos(value: String) {
    this._apellidos = value;
  }
}
