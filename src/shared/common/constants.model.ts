/* eslint-disable */
export module Constans {
  export module STATUS {
    export let Success = 1;
    export let Error = -1;
    export let Warning = -2;
    export let Forbidden = -3;
    export let Unauthorized = -4;
    export let UnprocessableModel = -5;
  }

  export module API_METHODS {
    export let Get = 1;
    export let Post = 2;
    export let Put = 3;
    export let Delete = 4;
  }

  export module TYPE_FORM {
    export let Inspection = 1;
    export let Temperature = 2;

    export function toString(key: number): string {
      switch (key) {
        case TYPE_FORM.Inspection:
          return 'Inspección';
        case TYPE_FORM.Temperature:
          return 'Temperatura';
        default:
          return 'Undefined';
      }
    }

    export function toList(): any[] {
      const list = [TYPE_FORM.Inspection, TYPE_FORM.Temperature];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }

  export module MUNICIPALIDAD_LIST {
    export let Trujillo = 1;
    export let Porvenir = 2;

    export function toString(key: number): string {
      switch (key) {
        case MUNICIPALIDAD_LIST.Trujillo:
          return 'Trujillo';
        case MUNICIPALIDAD_LIST.Porvenir:
          return 'Porvenir';
        default:
          return 'Undefined';
      }
    }

    export function toList(): any[] {
      const list = [MUNICIPALIDAD_LIST.Trujillo, MUNICIPALIDAD_LIST.Porvenir];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }

  export module LUGAR_LIST {
    export let PlazaArmas = 1;
    export let ColiseoIncaRoca = 2;
    export let EstadioMunicipal = 3;
    export let Parque12Noviembre = 4;
    export let ParqueMilagros = 5;
    export let AuditorioMunicipal = 6;
    export let FrontisMunicipal = 7;
    export let ParqueIndustrial = 8;
    export let MercadoCentral = 9;
    export let CalleAvenida = 10;

    export function toString(key: number): string {
      switch (key) {
        case LUGAR_LIST.PlazaArmas:
          return 'Plaza de Armas de El Porvenir';
        case LUGAR_LIST.ColiseoIncaRoca:
          return 'Coliseo Municipal Inca Roca';
        case LUGAR_LIST.EstadioMunicipal:
          return 'Estadio Municipal de El Porvenir';
        case LUGAR_LIST.Parque12Noviembre:
          return 'Parque 12 de Noviembre';
        case LUGAR_LIST.ParqueMilagros:
          return 'Parque Señor de los Milagros';
        case LUGAR_LIST.AuditorioMunicipal:
          return 'Auditorio Municipal';
        case LUGAR_LIST.FrontisMunicipal:
          return 'Frontis de la Municipalidad';
        case LUGAR_LIST.ParqueIndustrial:
          return 'Parque Industrial El Porvenir';
        case LUGAR_LIST.MercadoCentral:
          return 'Mercado Central del Porvenir';
        case LUGAR_LIST.CalleAvenida:
          return 'Calles o Avenidas (para eventos públicos)';
        default:
          return 'No definido';
      }
    }

    export function toList(): any[] {
      const list = [
        LUGAR_LIST.PlazaArmas,
        LUGAR_LIST.ColiseoIncaRoca,
        LUGAR_LIST.EstadioMunicipal,
        LUGAR_LIST.Parque12Noviembre,
        LUGAR_LIST.ParqueMilagros,
        LUGAR_LIST.AuditorioMunicipal,
        LUGAR_LIST.FrontisMunicipal,
        LUGAR_LIST.ParqueIndustrial,
        LUGAR_LIST.MercadoCentral,
        LUGAR_LIST.CalleAvenida,
      ];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }

  export module TIPO_PERMISO {
    export let EventoPublico = 1;
    export let FeriaComercial = 2;
    export let ActividadReligiosa = 3;
    export let ObraConstruccion = 4;
    export let Manifestacion = 5;
    export let ActividadDeportiva = 6;
    export let EspectaculoArtistico = 7;
    export let InstalacionTemporal = 8;
    export let RodajeCinematografico = 9;

    export function toString(key: number): string {
      switch (key) {
        case TIPO_PERMISO.EventoPublico:
          return 'Evento Público';
        case TIPO_PERMISO.FeriaComercial:
          return 'Feria Comercial';
        case TIPO_PERMISO.ActividadReligiosa:
          return 'Actividad Religiosa';
        case TIPO_PERMISO.ObraConstruccion:
          return 'Obra de Construcción';
        case TIPO_PERMISO.Manifestacion:
          return 'Manifestación o Protesta';
        case TIPO_PERMISO.ActividadDeportiva:
          return 'Actividad Deportiva';
        case TIPO_PERMISO.EspectaculoArtistico:
          return 'Espectáculo Artístico';
        case TIPO_PERMISO.InstalacionTemporal:
          return 'Instalación Temporal';
        case TIPO_PERMISO.RodajeCinematografico:
          return 'Rodaje Cinematográfico';
        default:
          return 'No definido';
      }
    }

    export function toList(): any[] {
      const list = [
        TIPO_PERMISO.EventoPublico,
        TIPO_PERMISO.FeriaComercial,
        TIPO_PERMISO.ActividadReligiosa,
        TIPO_PERMISO.ObraConstruccion,
        TIPO_PERMISO.Manifestacion,
        TIPO_PERMISO.ActividadDeportiva,
        TIPO_PERMISO.EspectaculoArtistico,
        TIPO_PERMISO.InstalacionTemporal,
        TIPO_PERMISO.RodajeCinematografico,
      ];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }

  export module TYPE_ESTADO {
    export let Proceso = 1;
    export let Verificado = 2;

    export function toString(key: number): string {
      switch (key) {
        case TYPE_ESTADO.Proceso:
          return 'En Proceso';
        case TYPE_ESTADO.Verificado:
          return 'Aprobado';
        default:
          return 'Undefined';
      }
    }

    export function toColor(key: number): string {
      switch (key) {
        case TYPE_ESTADO.Proceso:
          return '#FF8C00';
        case TYPE_ESTADO.Verificado:
          return '#18AF5F';
        default:
          return 'Undefined';
      }
    }

    export function toList(): any[] {
      const list = [TYPE_ESTADO.Proceso, TYPE_ESTADO.Verificado];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }

  export module DISTRITO_LIST {
    export let Trujillo = 1;
    export let Porvenir = 2;
    export let Florencia_Mora = 3;
    export let Huanchaco = 4;
    export let La_Esperanza = 5;
    export let Laredo = 6;
    export let Moche = 7;
    export let Poroto = 8;
    export let Salaverry = 9;
    export let Simbal = 10;
    export let Victor_Larco = 11;
    export let Alto_Trujillo = 12;

    export function toString(key: number): string {
      switch (key) {
        case DISTRITO_LIST.Trujillo:
          return 'Trujillo';
        case DISTRITO_LIST.Porvenir:
          return 'El Porvenir';
        case DISTRITO_LIST.Florencia_Mora:
          return 'Florencia de Mora';
        case DISTRITO_LIST.Huanchaco:
          return 'Huanchaco';
        case DISTRITO_LIST.La_Esperanza:
          return 'La Esperanza';
        case DISTRITO_LIST.Laredo:
          return 'Laredo';
        case DISTRITO_LIST.Moche:
          return 'Moche';
        case DISTRITO_LIST.Poroto:
          return 'Poroto';
        case DISTRITO_LIST.Salaverry:
          return 'Salaverry';
        case DISTRITO_LIST.Simbal:
          return 'Simbal';
        case DISTRITO_LIST.Victor_Larco:
          return 'Víctor Larco Herrera';
        case DISTRITO_LIST.Alto_Trujillo:
          return 'Alto Trujillo';
        default:
          return 'Undefined';
      }
    }

    export function toList(): any[] {
      const list = [
        Trujillo,
        Porvenir,
        Florencia_Mora,
        Huanchaco,
        La_Esperanza,
        Laredo,
        Moche,
        Poroto,
        Salaverry,
        Simbal,
        Victor_Larco,
        Alto_Trujillo,
      ];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }

  export module INDICATORS {
    export let muy_buena = 1;
    export let buena = 2;
    export let regular = 3;
    export let fuera_forma = 4;

    export function toString(key: number): string {
      switch (key) {
        case INDICATORS.fuera_forma:
          return 'Fuera de forma';
        case INDICATORS.regular:
          return 'Regular';
        case INDICATORS.buena:
          return 'Buena';
        case INDICATORS.muy_buena:
          return 'Muy Buena';
        default:
          return 'Undefined';
      }
    }

    export function toColor(key: number): string {
      switch (key) {
        case INDICATORS.fuera_forma:
          return '#EA3B29';
        case INDICATORS.regular:
          return '#DC741E';
        case INDICATORS.buena:
          return '#EEDD37';
        case INDICATORS.muy_buena:
          return '#18AF5F';
        default:
          return 'Undefined';
      }
    }

    export function toList(): any[] {
      const list = [
        INDICATORS.fuera_forma,
        INDICATORS.regular,
        INDICATORS.buena,
        INDICATORS.muy_buena,
      ];
      return list.map((key) => ({ id: key, name: toString(key) }));
    }
  }
}
