import { Injectable } from '@angular/core';
import { Departamento } from '../models/departamento';
import { Empleado } from '../models/empleado';
import { Planilla } from '../models/planilla';
import { Puesto } from '../models/puesto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private departamentosList: Array<Departamento> = [];
  // private empleadosList: Array<Empleado> = [];
  // private planillasList: Array<Planilla> = [];
  // private puestosList: Array<Puesto> = [];

  constructor() {
  }

  pushDepartamento(document: Document,datos: Departamento) {
    var localStorage = document.defaultView?.localStorage;
    var departamentosList: Array<Departamento> = this.getDepartamentos(document);
    datos.id = departamentosList.length + 1;
    departamentosList.push(datos);
    localStorage?.setItem('departamentosList',JSON.stringify(departamentosList));
  }

  pushEmpleado(document: Document,datos: Empleado) {
    var localStorage = document.defaultView?.localStorage;
    var empleadosList: Array<Empleado> = this.getEmpleados(document);
    datos.id = empleadosList.length + 1;
    empleadosList.push(datos);
    localStorage?.setItem('empleadosList',JSON.stringify(empleadosList));
  }

  pushPlanilla(document: Document,datos: Planilla) {
    var localStorage = document.defaultView?.localStorage;
    var planillasList: Array<Planilla> = this.getPlanillas(document);
    datos.id = planillasList.length + 1;
    planillasList.push(datos);
    localStorage?.setItem('planillasList',JSON.stringify(planillasList));
  }

  pushPuesto(document: Document,datos: Puesto) {
    var localStorage = document.defaultView?.localStorage;
    var puestosList: Array<Puesto> = this.getPuestos(document);
    datos.id = puestosList.length + 1;
    puestosList.push(datos);
    localStorage?.setItem('puestosList',JSON.stringify(puestosList));
  }

  getDepartamentoVacio(): Departamento {
    return {
      id: 0,
      nombreDepartamento: ''
    };
  }

  getEmpleadoVacio(): Empleado {
    return {
      id: 0,
      puesto: this.getPuestoVacio(),
      nombres: '',
      apellidos: ''
    };
  }

  getPlanillaVacio(): Planilla {
    return {
      id: 0,
      empleado: this.getEmpleadoVacio(),
      nombre: '',
      esEmpleadoDirecto: false,
      salario: 0,
      periodo: '',
      fechaIngreso: new Date()
    };
  }

  getPuestoVacio(): Puesto {
    return {
      id: 0,
      departamento: this.getDepartamentoVacio(),
      nombrePuesto: '',
      ingresosMinimos: 0,
      ingresosMaximos: 0
    };
  }

  getDepartamentos(document: Document): Array<Departamento> {
    var localStorage = document.defaultView?.localStorage;
    var departamentosList: Array<Departamento> = [];

    var departamentosListSession = localStorage?.getItem('departamentosList');
    if (departamentosListSession) {
      departamentosList = JSON.parse(departamentosListSession) as Array<Departamento>;
    } 

    if (!departamentosList || departamentosList.length == 0) {
      departamentosList.push({
        id: 1,
        nombreDepartamento: 'departamento 1'
      });
      departamentosList.push({
        id: 2,
        nombreDepartamento: 'departamento 2'
      });
      departamentosList.push({
        id: 3,
        nombreDepartamento: 'departamento 3'
      });
    }

    localStorage?.setItem('departamentosList',JSON.stringify(departamentosList));
    return departamentosList;
  }

  getEmpleados(document: Document): Array<Empleado> {
    var localStorage = document.defaultView?.localStorage;
    var empleadosList: Array<Empleado> = [];

    var empleadosListSession = localStorage?.getItem('empleadosList');
    if (empleadosListSession) {
      empleadosList = JSON.parse(empleadosListSession) as Array<Empleado>;
    } 
    
    if (!empleadosList || empleadosList.length == 0) {
      empleadosList.push({
        id: 1,
        puesto: this.getPuestos(document)[0],
        nombres: 'Cesar',
        apellidos: 'Gomez'
      });
      empleadosList.push({
        id: 2,
        puesto: this.getPuestos(document)[1],
        nombres: 'Pedro',
        apellidos: 'Alfaro'
      });
      empleadosList.push({
        id: 3,
        puesto: this.getPuestos(document)[2],
        nombres: 'Carlos',
        apellidos: 'Argueta'
      });
      empleadosList.push({
        id: 4,
        puesto: this.getPuestos(document)[3],
        nombres: 'Jeyby',
        apellidos: 'Castillo'
      });
    }
    localStorage?.setItem('empleadosList',JSON.stringify(empleadosList));
    return empleadosList;
  }

  getPlanillas(document: Document): Array<Planilla> {
    var localStorage = document.defaultView?.localStorage;
    var planillasList: Array<Planilla> = [];

    var planillasListSession = localStorage?.getItem('planillasList');
    if (planillasListSession) {
      planillasList = JSON.parse(planillasListSession) as Array<Planilla>;
    }

    if (!planillasList || planillasList.length == 0) {
      planillasList.push(
        {
          id: 1,
          empleado: this.getEmpleados(document)[0],
          nombre: this.getEmpleados(document)[0].nombres + ' ' + this.getEmpleados(document)[0].apellidos,
          esEmpleadoDirecto: true,
          salario: 600,
          periodo: '05-2025',
          fechaIngreso: new Date()
        }
      );
      planillasList.push(
        {
          id: 2,
          empleado: this.getEmpleados(document)[1],
          nombre: this.getEmpleados(document)[1].nombres + ' ' + this.getEmpleados(document)[1].apellidos,
          esEmpleadoDirecto: true,
          salario: 700,
          periodo: '05-2025',
          fechaIngreso: new Date()
        }
      );
      planillasList.push(
        {
          id: 3,
          empleado: this.getEmpleados(document)[2],
          nombre: this.getEmpleados(document)[2].nombres + ' ' + this.getEmpleados(document)[2].apellidos,
          esEmpleadoDirecto: true,
          salario: 900,
          periodo: '05-2025',
          fechaIngreso: new Date()
        }
      );
      planillasList.push(
        {
          id: 4,
          empleado: this.getEmpleados(document)[3],
          nombre: this.getEmpleados(document)[3].nombres + ' ' + this.getEmpleados(document)[3].apellidos,
          esEmpleadoDirecto: true,
          salario: 1000,
          periodo: '05-2025',
          fechaIngreso: new Date()
        }
      );
    }
    localStorage?.setItem('planillasList',JSON.stringify(planillasList));
    return planillasList;
  }

  getPuestos(document: Document): Array<Puesto> {
    var localStorage = document.defaultView?.localStorage;
    var puestosList: Array<Puesto> = [];

    var puestosListSession = localStorage?.getItem('puestosList');
    if (puestosListSession) {
      puestosList = JSON.parse(puestosListSession) as Array<Puesto>;
    }

    if (!puestosList || puestosList.length == 0) {
      puestosList.push({
        id: 1,
        departamento: this.getDepartamentos(document)[0],
        nombrePuesto: 'puesto 1',
        ingresosMinimos: 500,
        ingresosMaximos: 600
      });
      puestosList.push({
        id: 2,
        departamento: this.getDepartamentos(document)[0],
        nombrePuesto: 'puesto 2',
        ingresosMinimos: 500,
        ingresosMaximos: 700
      });
      puestosList.push({
        id: 3,
        departamento: this.getDepartamentos(document)[1],
        nombrePuesto: 'puesto 3',
        ingresosMinimos: 700,
        ingresosMaximos: 900
      });
      puestosList.push({
        id: 3,
        departamento: this.getDepartamentos(document)[2],
        nombrePuesto: 'puesto 4',
        ingresosMinimos: 850,
        ingresosMaximos: 1000
      });
    }
    localStorage?.setItem('puestosList',JSON.stringify(puestosList));
    return puestosList;
  }

  editarPlanilla(document: Document,datos: Planilla){
    var planillasList: Array<Planilla> = this.getPlanillas(document);
    var planillasList2: Array<Planilla> = [];

    planillasList.forEach(arrData => {
      var newData: Planilla = arrData;
      if (newData.id == datos.id){
        newData = datos;
      }
      planillasList2.push(newData);
    });

    localStorage?.setItem('planillasList',JSON.stringify(planillasList2));
  }
}
