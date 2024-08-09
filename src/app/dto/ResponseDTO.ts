export class ResponseDTO<T> {

  data: T | undefined;
  message: String = "";
  status: String = "";
  apiVersion: String = "";
}
