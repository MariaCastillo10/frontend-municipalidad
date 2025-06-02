export interface ISessionData {
  token: string;
  user: {
    id: string;
    nombres: string;
    apellidos: string;
    email: string;
    role: string;
    points: number;
  };
}

export interface IRegisterData {
  nombres: string;
  email: string;
  password: string;
  telefono: string;
  esAdmin: boolean;
}
