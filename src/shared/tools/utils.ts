/* eslint-disable @typescript-eslint/no-namespace */
export namespace Utils {
  export function randomNumber(digits = 5) {
    const maximo = Math.pow(10, digits) - 1;
    const numero = Math.floor(Math.random() * maximo);
    return numero.toString().padStart(digits, '0');
  }

  export function objToEnum<T>(obj: T): T {
    return { ...obj };
  }
}
