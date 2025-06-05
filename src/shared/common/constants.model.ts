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
