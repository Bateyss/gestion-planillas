import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { Planilla } from '../models/planilla';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Utils } from '../utils/utils';
import { Empleado } from '../models/empleado';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { GenerarPlanillaComponent } from '../generar-planilla/generar-planilla.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-planilla',
  imports: [MaterialModule],
  templateUrl: './planilla.component.html',
  styleUrl: './planilla.component.css'
})
export class PlanillaComponent {

  //forms
  public planillaForm: UntypedFormGroup;

  //selected
  // public planillaSeleccionado: Planilla = Data.getPlanillaVacio();
  public planillaSeleccionado: Planilla = {
    id: 0,
    empleado: {
      id: 0,
      puesto: {
        id: 0,
        departamento: {
          id: 0,
          nombreDepartamento: ''
        },
        nombrePuesto: '',
        ingresosMinimos: 0,
        ingresosMaximos: 0
      },
      nombres: '',
      apellidos: ''
    },
    nombre: '',
    esEmpleadoDirecto: false,
    salario: 0,
    periodo: '',
    fechaIngreso: new Date()
  };

  //list
  public planillaList: Array<Planilla> = [];
  public empleadoList: Array<Empleado> = [];

  constructor(
    // public planillaService: PlanillaService,
    // public puestoService: PuestoService,
    @Inject(DOCUMENT) private document: Document,
    public dataService: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private formBuilder: UntypedFormBuilder) {
    this.planillaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      empleado: [null, [Validators.required]],
      esEmpleadoDirecto: [false, [Validators.required]],
      salario: [0, [Validators.required, Validators.min(0.00)]],
      periodo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      fechaIngreso: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
    // document.defaultView?.localStorage.clear();
    this.cargarPlanillas();
    this.cargarEmpleados();
  }

  planillaF(control: string) { return this.planillaForm.get(control); }

  cargarPlanillas() {
    // this.planillaService.getList(lista => this.planillaList = lista);
    this.planillaList = this.dataService.getPlanillas(this.document);
  }
  cargarEmpleados() {
    // this.puestoService.getList(lista => this.puestoList = lista);
    this.empleadoList = this.dataService.getEmpleados(this.document);
  }

  guardarPlanilla() {
    if (this.validarDatos()) {
      this.planillaSeleccionado.nombre = this.planillaF('nombre')?.value;
      this.planillaSeleccionado.empleado = this.planillaF('empleado')?.value;
      this.planillaSeleccionado.esEmpleadoDirecto = this.planillaF('esEmpleadoDirecto')?.value;
      this.planillaSeleccionado.salario = this.planillaF('salario')?.value;
      this.planillaSeleccionado.periodo = this.planillaF('periodo')?.value;
      this.planillaSeleccionado.fechaIngreso = this.planillaF('fechaIngreso')?.value;

      this.dataService.pushPlanilla(this.document,this.planillaSeleccionado);
      this.planillaForm = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        empleado: [null, [Validators.required]],
        esEmpleadoDirecto: [false, [Validators.required]],
        salario: [0, [Validators.required, Validators.min(0.00)]],
        periodo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
      });
      this.cargarPlanillas()
      Utils.openSnackBar('listo', 'ok', this._snackBar);
      // if (this.planillaSeleccionado.idPlanilla > 0) {
      //   this.planillaService.editOne(this.planillaSeleccionado, listener => {
      //     Utils.openSnackBar('Inventario Editado', 'ok', this._snackBar);
      //   });
      // } else {
      //   this.planillaService.creteOne(this.planillaSeleccionado, listener => {
      //     if (listener && listener?.idPlanilla > 0) {
      //       this.planillaList.push(listener);
      //     }
      //   });
      // }
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.planillaForm.valid;
    if (!this.planillaF('nombre')?.valid) valido = false;
    if (!this.planillaF('empleado')?.valid) valido = false;
    if (!this.planillaF('esEmpleadoDirecto')?.valid) valido = false;
    if (!this.planillaF('salario')?.valid) valido = false ;
    if (!this.planillaF('periodo')?.valid) valido = false ;
    if (!this.planillaF('fechaIngreso')?.valid) valido = false;
    var salarioNum = parseFloat(this.planillaF('salario')?.value);
    if (!salarioNum || isNaN(salarioNum)){
      valido = false  
      this.planillaF('salario')?.setErrors({key:"1"});
    };
    return valido;
  }

  seleccionarPlanilla(row: any) {
    this.planillaSeleccionado = row; 
    this.planillaF('nombre')?.setValue(this.planillaSeleccionado.nombre);
    this.planillaF('empleado')?.setValue(this.planillaSeleccionado.empleado);
    this.planillaF('esEmpleadoDirecto')?.setValue(this.planillaSeleccionado.esEmpleadoDirecto);
    this.planillaF('salario')?.setValue(this.planillaSeleccionado.salario);
    this.planillaF('periodo')?.setValue(this.planillaSeleccionado.periodo);
    this.planillaF('fechaIngreso')?.setValue(this.planillaSeleccionado.fechaIngreso);
  }

  compareIds(id1: any, id2: any): boolean {
    return id1 === id2;
  }

  gemerarPlanilla() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      planillaList: this.planillaList
    };
    const dialogRef = this.dialog.open(GenerarPlanillaComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(  
    //   result => {
    //     if (result && result?.url) {
    //       let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //           "nada": 'xd'
    //         }
    //       };
    //       this._router.navigate([result.url], navigationExtras);
    //     }
    //   });
  }

}
