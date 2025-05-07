import { Empleado } from "./empleado";
import { Puesto } from "./puesto";

export interface Planilla {
    id: number,
    empleado: Empleado,
    nombre: string,
    esEmpleadoDirecto: boolean,
    salario: number,
    periodo: string,
    fechaIngreso: Date  
}
