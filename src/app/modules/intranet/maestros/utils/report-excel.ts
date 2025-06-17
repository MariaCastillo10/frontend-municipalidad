/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { ExcelUtil } from '../../../../../shared/tools/export/excel.helper';

export type filterProductsRPT = {
  product?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
};
export module rptModuleExcel {
  export class rptMatrimonioExcel extends ExcelUtil {
    static async create(data: any[]) {
      const workbook = this.getInstance();
      const title = 'Rpt-Matrimonios - ' + new Date().toLocaleDateString();

      const worksheet = workbook.addWorksheet('Hoja 1');

      const mergeRange = 'B1:E2';
      await this.setHeader(worksheet, 'REGISTRO DE MATRIMONIOS', mergeRange);

      const headers = ['Solicitante', 'Cónyuge', 'Estado'];
      const rowIndex = 4;
      this.setTableHeaders(worksheet, headers, rowIndex);

      data.forEach((item) => {
        const row = worksheet.addRow([
          item.nombreSolicitante,
          item.nombreConyuge,
          item.estado
        ]);
        row.alignment = { horizontal: 'center', vertical: 'middle' };
        row.font = {
          bold: false,
          size: 9,
          name: 'Yu Gothic',
          color: { argb: '414456' },
        };
      });

      await this.saveWorkbook(workbook, title);
    }
  }

    export class rptLicenciaExcel extends ExcelUtil {
    static async create(data: any[]) {
      const workbook = this.getInstance();
      const title = 'Rpt-Licencias - ' + new Date().toLocaleDateString();

      const worksheet = workbook.addWorksheet('Hoja 1');

      const mergeRange = 'B1:E2';
      await this.setHeader(worksheet, 'REGISTRO DE LICENCIAS', mergeRange);

      const headers = ['Razón Social', 'Ruc', 'Representante', 'DNI', 'Dirección', 'Giro Negocio', 'Telefono', 'Correo', 'observaciones'];
      const rowIndex = 4;
      this.setTableHeaders(worksheet, headers, rowIndex);

      data.forEach((item) => {
        const row = worksheet.addRow([
          item.razonSocial,
          item.ruc,
          item.representanteLegal,
          item.dni,
          item.direccion,
          item.giroNegocio,
          item.telefono,
          item.correo,
          item.observaciones
        ]);
        row.alignment = { horizontal: 'center', vertical: 'middle' };
        row.font = {
          bold: false,
          size: 9,
          name: 'Yu Gothic',
          color: { argb: '414456' },
        };
      });

      await this.saveWorkbook(workbook, title);
    }
  }
}
