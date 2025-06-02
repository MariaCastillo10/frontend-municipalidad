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
  export class rptCalibersExcel extends ExcelUtil {
    static async create(data: any[]) {
      const workbook = this.getInstance();
      const title = 'Rpt-Inventario - ' + new Date().toLocaleDateString();

      const worksheet = workbook.addWorksheet('Hoja 1');

      const mergeRange = 'B1:E2';
      await this.setHeader(worksheet, 'REGISTRO DE IVENTARIO', mergeRange);

      const headers = ['Codigo', 'Nombre', 'Costo', 'Unidades', 'Porciones'];
      const rowIndex = 4;
      this.setTableHeaders(worksheet, headers, rowIndex);

      data.forEach((item) => {
        const row = worksheet.addRow([
          item.codigo,
          item.nombre,
          item.costo,
          item.unidades,
          item.porciones,
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
