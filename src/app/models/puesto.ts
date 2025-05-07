import { Departamento } from "./departamento";

export interface Puesto {
    id: number,
    departamento: Departamento,
    nombrePuesto: string,
    ingresosMinimos: number,
    ingresosMaximos: number
}
