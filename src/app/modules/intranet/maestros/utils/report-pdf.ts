/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { ICreatePDF, Img, Stack, Table, Txt } from 'pdfmake-wrapper';
import {
  PDFUtil,
  PDFUtilLandscape,
} from './../../../../../shared/tools/export/pdf.helper';

export type filterProductsRPT = {
  product?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
};

export module rptModulePDF {
  export class rptCalibersPdf extends PDFUtil {
    static async create(data: any[]): Promise<ICreatePDF> {
      const pdf = this.getInstance();

      const content: any[] = [];

      const title = new Stack([
        new Table([
          [
            await new Img('./assets/layout/images/favicon-cevicheria.png')
              .fit([50, 50])
              .margin([43, 0, 43, 0])
              .build(),
          ],
        ])
          .widths(['auto'])
          .margin([10, 25, 25, 10])
          .layout({
            fillColor: () => '#FFFFFF',
            hLineColor: () => '#2C73C0',
            vLineColor: () => '#2C73C0',
          })
          .absolutePosition(41, 27).end,

        new Table([
          [
            new Txt('REGISTROS DE INVENTARIO')
              .style('cellbold')
              .alignment('center')
              .fontSize(12)
              .color('#FFF')
              .margin([130, 10, 130, 10]).end,
          ],
        ])
          .widths(['auto'])
          .margin([10, 10, 10, 10])
          .layout({
            fillColor: this.fillColorHeader,
            hLineColor: () => '#FFF',
            vLineColor: () => '#FFF',
          })
          .absolutePosition(186, 25).end,
      ]).end;

      for (const item of data) {
        content.push([
          new Txt(item.codigo).style('cell').alignment('center').end,
          new Txt(item.nombre).style('cell').alignment('center').end,
          new Txt(item.costo).style('cell').alignment('center').end,
          new Txt(String(item.unidades)).style('cell').alignment('center').end,
          new Txt(String(item.porciones)).style('cell').alignment('center').end,
        ]);
      }

      const table = new Table([
        [
          new Txt('Código').style('cellbold').color('#FFF').end,
          new Txt('Nombre').style('cellbold').color('#FFF').end,
          new Txt('Costo').style('cellbold').color('#FFF').end,
          new Txt('Unidades').style('cellbold').color('#FFF').end,
          new Txt('Porciones').style('cellbold').color('#FFF').end,
        ],
        ...content,
      ])
        .widths(['*', '*', '*', '*', '*'])
        .layout({
          fillColor: this.fillColorHeader,
          hLineColor: () => '#eee',
          vLineColor: () => '#eee',
        }).end;

      pdf.add(title);
      pdf.add(table);

      return pdf.create();
    }
  }

  export class rptLicenciaPdf extends PDFUtilLandscape {
    static async create(data: any[]): Promise<ICreatePDF> {
      const pdf = this.getInstance();

      const content: any[] = [];

      const title = new Stack([
        new Table([
          [
            await new Img('./assets/layout/images/favicon-cevicheria.png')
              .fit([50, 50])
              .margin([43, 0, 43, 0])
              .build(),
          ],
        ])
          .widths(['auto'])
          .margin([10, 25, 25, 10])
          .layout({
            fillColor: () => '#FFFFFF',
            hLineColor: () => '#2C73C0',
            vLineColor: () => '#2C73C0',
          })
          .absolutePosition(41, 27).end,

        new Table([
          [
            new Txt('REGISTROS DE LICENCIAS')
              .style('cellbold')
              .alignment('center')
              .fontSize(12)
              .color('#FFF')
              .margin([180, 10, 320, 10]).end,
          ],
        ])
          .widths(['auto'])
          .margin([10, 10, 10, 10])
          .layout({
            fillColor: this.fillColorHeader,
            hLineColor: () => '#FFF',
            vLineColor: () => '#FFF',
          })
          .absolutePosition(186, 25).end,
      ]).end;

      for (const item of data) {
        content.push([
          new Txt(item.razonSocial).style('cell').alignment('center').end,
          new Txt(item.ruc).style('cell').alignment('center').end,
          new Txt(item.representanteLegal).style('cell').alignment('center')
            .end,
          new Txt(item.dni).style('cell').alignment('center').end,
          new Txt(item.direccion).style('cell').alignment('center').end,
          new Txt(item.giroNegocio).style('cell').alignment('center').end,
          new Txt(item.telefono).style('cell').alignment('center').end,
          new Txt(item.correo).style('cell').alignment('center').end,
          new Txt(item.observaciones).style('cell').alignment('center').end,
        ]);
      }

      const table = new Table([
        [
          new Txt('Razón Social').style('cellbold').color('#FFF').end,
          new Txt('Ruc').style('cellbold').color('#FFF').end,
          new Txt('Representante').style('cellbold').color('#FFF').end,
          new Txt('DNI').style('cellbold').color('#FFF').end,
          new Txt('Dirección').style('cellbold').color('#FFF').end,
          new Txt('Giro Negocio').style('cellbold').color('#FFF').end,
          new Txt('Telefono').style('cellbold').color('#FFF').end,
          new Txt('Correo').style('cellbold').color('#FFF').end,
          new Txt('observaciones').style('cellbold').color('#FFF').end,
        ],
        ...content,
      ])
        .widths([60, 50, '*', 50, '*', 60, 50, '*', '*'])
        .layout({
          fillColor: this.fillColorHeader,
          hLineColor: () => '#eee',
          vLineColor: () => '#eee',
        }).end;

      pdf.add(title);
      pdf.add(table);

      return pdf.create();
    }
  }
}
