export class ResponseLoginDTO<T> {

  data: T | undefined;
  message: String = "";
  status: String = "";
  apiVersion: String = "";
}
