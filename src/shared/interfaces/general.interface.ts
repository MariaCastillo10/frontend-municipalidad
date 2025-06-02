export interface IStatus {
  id: string;
  name: string;
}

export interface IResponseList<T> {
  data: T;
  links: any[];
}
