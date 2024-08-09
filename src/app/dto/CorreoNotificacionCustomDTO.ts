export interface CorreoNotificacionCustomDTO {

    correoNotificacionId: number;

    usuarioId: number | null;

    canalVentaId: number;

    canalVentaDescripcion?: string;

    correo: string;

    lineaNegocioId: number;

    status: string;
}