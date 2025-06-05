import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

export class PDFUtil {
  static getInstance(): PdfMakeWrapper {
    const pdf = new PdfMakeWrapper();

    // PdfMakeWrapper.setFonts(pdfFonts);

    (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

    pdf.pageMargins([40, 40, 40, 60]);
    pdf.pageSize('A4');
    pdf.styles({
      title: {
        fontSize: 12,
        bold: true,
        alignment: 'center',
        color: '#000000',
      },
      subtitle: { fontSize: 6, alignment: 'center', color: '#000000' },
      cell: { fontSize: 9, alignment: 'center', margin: 0 },
      cellbold: { fontSize: 9, alignment: 'center', margin: 0, bold: true },
      bold: { bold: true },
      textCenter: { alignment: 'center', color: '#d3d3d3' },
    });
    return pdf;
  }

  static fillColor(_: number, __: any, columnIndex?: number): string {
    if (columnIndex === undefined) {
      return '';
    }
    return columnIndex % 2 == 0 ? '#BEBEBE' : '';
  }

  static fillColorHeader(i?: number, _?: any, __?: number): string {
    if (i === undefined) {
      return '';
    }
    return i == 0 ? '#0F48BE' : '';
  }

  static noBorderBottom(i?: number, node?: any, __?: number): number {
    if (i === undefined || node === undefined) {
      return 1;
    }
    return node.table.body.length == i ? 0 : 1;
  }
}

export class PDFUtilLandscape {
  static getInstance(): PdfMakeWrapper {
    const pdf = new PdfMakeWrapper();

    (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

    pdf.pageMargins([40, 40, 40, 60]);
    pdf.pageSize('A4');
    pdf.pageOrientation('landscape');
    pdf.defaultStyle({
      fontSize: 9,
    });
    pdf.styles({
      title: {
        fontSize: 9,
        bold: true,
        alignment: 'center',
        color: '#000000',
      },
      subtitle: { alignment: 'center', color: '#000000' },
      cell: { alignment: 'center', margin: 0 },
      cellbold: { alignment: 'center', margin: 0, bold: true },
      bold: { bold: true },
      textCenter: { alignment: 'center' },
      veryGood: { background: '#4CAF50' },
      good: { background: '#8BC34A' },
      regular: { background: '#FF5722' },
      outOfNorm: { background: '#F44336' },
    });
    pdf.permissions('12341234', {
      modifying: false,
    });
    return pdf;
  }

  static fillColor(_: number, __: any, columnIndex?: number): string {
    if (columnIndex === undefined) {
      return '';
    }
    return columnIndex % 2 == 0 ? '#BEBEBE' : '';
  }

  static fillColorHeader(i?: number, _?: any, __?: number): string {
    if (i === undefined) {
      return '';
    }
    return i == 0 ? '#0F48BE' : '';
  }

  static noBorderBottom(i?: number, node?: any, __?: number): number {
    if (i === undefined || node === undefined) {
      return 1;
    }
    return node.table.body.length == i ? 0 : 1;
  }
}
