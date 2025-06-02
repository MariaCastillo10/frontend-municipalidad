import { Workbook, Worksheet } from 'exceljs';

export class ExcelUtil {
  static getInstance(): Workbook {
    return new Workbook();
  }

  static async setHeader(
    worksheet: Worksheet,
    title: string,
    mergeRange: string,
  ): Promise<void> {
    const logoUrl = './assets/layout/images/favicon-cevicheria.png';
    const logoWidth = 80;
    const logoHeight = 40;

    worksheet.mergeCells('A1:A2');
    worksheet.mergeCells(mergeRange);

    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF' },
    };
    worksheet.getCell(mergeRange.split(':')[0]).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0F48BE' },
    };

    worksheet.getCell(mergeRange.split(':')[0]).value = title;
    worksheet.getCell(mergeRange.split(':')[0]).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    worksheet.getCell(mergeRange.split(':')[0]).font = {
      name: 'Yu Gothic',
      color: { argb: 'FFFFFF' },
      size: 12,
      bold: true,
      family: 2,
    };

    const logoBase64 = await this.getBase64Image(logoUrl);
    const logoId = worksheet.workbook.addImage({
      base64: `data:image/png;base64,${logoBase64}`,
      extension: 'png',
    });

    worksheet.addImage(logoId, {
      tl: { col: 0.8, row: 0 },
      ext: { width: logoWidth, height: logoHeight },
    });
  }

  static setTableHeaders(
    worksheet: Worksheet,
    headers: string[],
    rowIndex: number,
  ): void {
    worksheet.getRow(rowIndex).alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
    worksheet.getRow(rowIndex).values = headers;

    headers.forEach((_, index) => {
      const cell = worksheet.getCell(rowIndex, index + 1);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0F48BE' },
      };
      cell.font = {
        bold: true,
        size: 9,
        name: 'Yu Gothic',
        color: { argb: 'FFFFFF' },
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFF2F2F2' } },
        left: { style: 'thin', color: { argb: 'FFF2F2F2' } },
        bottom: { style: 'thin', color: { argb: 'FFF2F2F2' } },
        right: { style: 'thin', color: { argb: 'FFF2F2F2' } },
      };
    });

    worksheet.columns = headers.map(() => ({ width: 25 }));
  }

  static async saveWorkbook(workbook: Workbook, title: string): Promise<void> {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${title}.xlsx`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  private static getBase64Image(imgUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imgUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  }
}
