export interface ClienteJVBodyDTO {

    clienteId: number | null;

    clienteTipoPersona: String;

    clienteCardCode: String | null;

    tipoDocumentoIdentidadId: number;

    clienteNumeroDocumentoIdentidad: String;

    clienteRazonSocial: String | null;

    clienteNombreComercial: String | null;

    clienteCardType: string;

    clienteApellidoPaterno: String | null;

    clienteApellidoMaterno: String | null;

    clienteNombres: String | null;

    clienteDireccion: String | null;

    clienteDepartamento: String | null;

    clienteProvincia: String | null;

    clienteDistrito: String | null;

    clienteDireccionReferencia: String | null;

    canalVentaId: number | null;

    carpetaId: number;

    clienteCredito: number | null;

    clienteDiasCredito: number | null;

    clienteTipoCliente: String;

    clienteNumeroDocumentoIdentidadReal: String;

    clienteTelefono: String | null;

    clienteMovil: String | null;

    clienteEmail: String | null;

    clienteEstadoCivil: String;

    clienteGarantiaCredito: String | null;

    clienteLineaCredito: number | null;

    clienteCodigoPagador: String | null;

    usuarioId: number | null;

    clienteActivo: String;

    giroNegocio: String;

    clienteFax: string;

    clienteTipoMoneda: string | null;

    grupoClienteId: number | null;

    condicionPagoId: number | null;

    mediopagoId: number | null;

    fechaNacimiento: Date | null;
}