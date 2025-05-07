import { Departamento } from "./departamento";
import { Puesto } from "./puesto";

export interface Empleado {
    id: number,
    puesto: Puesto,
    nombres: string,
    apellidos: string
}
