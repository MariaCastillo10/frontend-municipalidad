/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable  */

import { DatePipe } from '@angular/common';
import { ButtonItems } from '@shared/interfaces';
import moment from 'moment';

export module Converter {
  export function createButtonItems(
    exportToExcel: () => void,
    exportToPDF: () => void,
  ): ButtonItems[] {
    return [
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: exportToExcel,
      },
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: exportToPDF,
      },
    ];
  }

  export module BASE {
    export function toQueryParams(obj: any) {
      return Object.keys(obj)
        .filter((x) => obj[x] !== null && obj[x] !== undefined)
        .map((x) => {
          let url = '';
          if (obj[x] instanceof Date) url = `${x}=${obj[x].toJSON()}`;
          else url = `${x}=${obj[x]}`;
          return url;
        })
        .join('&');
    }
  }

  export module DATE {
    export const dateFormat = 'dd/MM/yyyy';
    export const dateAndTimeFormat = 'dd/MM/yyyyTHH:mm';
    export const longFormat = 'EEEE, MMMM d, y';

    export function fromAPItoDATE(
      date: string,
      withTime: boolean = false,
    ): Date {
      if (!withTime) date = `${date.split('T')[0]}T00:00:00Z`;
      return moment.utc(date).local().toDate();
    }

    export function firstDayOfMonth(date?: Date) {
      if (date) return moment(date).startOf('month').toDate();
      return moment().startOf('month').toDate();
    }

    export function lastDayOfMonth(date?: Date) {
      if (date) return moment(date).endOf('month').toDate();
      return moment().endOf('month').toDate();
    }

    export function transform(date: Date, format: string = dateFormat): string {
      const pipe = new DatePipe('es-PE');
      return pipe.transform(date, format) || '-';
    }

    export function toServerFormat(date: Date): string {
      const pipe = new DatePipe('en-US');
      return pipe.transform(date, 'yyyy-MM-dd') || '';
    }

    export function transformReport(
      date: Date,
      format: string = dateFormat,
    ): string {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '-';
      }
      const pipe = new DatePipe('es-PE');
      return pipe.transform(date, format) || '-';
    }

    export function generateArray(
      start: number,
      end: number,
      inverse: boolean = false,
    ) {
      const list: any[] = [...Array(end - start + 1).keys()].map((x) =>
        inverse ? end - x : start + x,
      );
      return list
        .map((x) => {
          return {
            id: x,
            name: `${x}`,
          };
        })
        .reverse();
    }

    export function getYear(
      startYear = 2022,
      endYear = new Date().getFullYear(),
    ) {
      const years = [];
      for (let i = endYear; i >= startYear; i--) {
        years.push({ id: i, name: i.toString() });
      }
      return years;
    }

    export function getMonths() {
      let months = [];
      months = [
        { id: 1, name: 'Enero' },
        { id: 2, name: 'Febrero' },
        { id: 3, name: 'Marzo' },
        { id: 4, name: 'Abril' },
        { id: 5, name: 'Mayo' },
        { id: 6, name: 'Junio' },
        { id: 7, name: 'Julio' },
        { id: 8, name: 'Agosto' },
        { id: 9, name: 'Septiembre' },
        { id: 10, name: 'Octubre' },
        { id: 11, name: 'Noviembre' },
        { id: 12, name: 'Diciembre' },
      ];
      return months;
    }

    export function MonthName(mes: number) {
      const months = new Map(getMonths().map((r) => [r.id, r.name]));
      return months.get(mes);
    }

    export function getDateTimeFromDateOnlyAndTimeOnly(
      date: Date,
      time: string,
    ): Date {
      return new Date(`${Converter.DATE.transform(date)}T${time}`);
    }

    export function getFirstAndLastDateOfMonth(
      month: number,
      year = new Date().getFullYear(),
    ): { startDate: Date; endDate: Date } {
      const dateMonth = new Date(year, month, 1);
      return {
        startDate: DATE.firstDayOfMonth(dateMonth),
        endDate: DATE.lastDayOfMonth(dateMonth),
      };
    }

    export function getDatesOfMonth(
      month: number,
      inStringFormat = false,
      year = new Date().getFullYear(),
    ) {
      const { startDate, endDate } = DATE.getFirstAndLastDateOfMonth(
        month,
        year,
      );
      const dates = [];

      const currDate = moment(startDate).startOf('day');
      const lastDate = moment(endDate).startOf('day');

      dates.push(inStringFormat ? DATE.transform(startDate) : startDate);
      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        if (inStringFormat)
          dates.push(DATE.transform(currDate.clone().toDate()));
        else dates.push(currDate.clone().toDate());
      }
      dates.push(inStringFormat ? DATE.transform(endDate) : endDate);

      return dates;
    }
  }
}
