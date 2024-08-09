export interface CorreoNotificacionDTO {

    correoNotificacionId: number;

    usuarioId: number | null;

    canalVentaId: number;

    correo: string;

    lineaNegocioId: number | null;

    status: string;
}