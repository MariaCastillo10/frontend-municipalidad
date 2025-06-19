export class ResumenModel {
    _id: string;
    ciudadanoDNI: string;
    nombres: string;
    correo?: string;
    celular?: string;
    tipo: string;
    modulo: string;
    via: string;
    prioridad: string;
    areaDestino: string;
    mensaje: string;
    meta: {
        idReferencia: string;
        tipoReferencia: string;
    };
    createdAt: string;

    constructor(params?: Partial<ResumenModel>) {
        this._id = params?._id || '';
        this.ciudadanoDNI = params?.ciudadanoDNI || '';
        this.nombres = params?.nombres || '';
        this.correo = params?.correo || '';
        this.celular = params?.celular || '';
        this.tipo = params?.tipo || '';
        this.modulo = params?.modulo || '';
        this.via = params?.via || '';
        this.prioridad = params?.prioridad || '';
        this.areaDestino = params?.areaDestino || '';
        this.mensaje = params?.mensaje || '';
        this.createdAt = params?.createdAt || '';
    }
}
