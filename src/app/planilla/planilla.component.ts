import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenerarPlanillaComponent } from '../generar-planilla/generar-planilla.component';
import { MaterialModule } from '../material/material.module';
import { Empleado } from '../models/empleado';
import { Planilla } from '../models/planilla';
import { DataService } from '../services/data.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-planilla',
  imports: [MaterialModule],
  templateUrl: './planilla.component.html',
  styleUrl: './planilla.component.css'
})
export class PlanillaComponent {

  //selected
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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public dataService: DataService,
    public dialog: MatDialog) {
    this.cargarPlanillas();
  }

  cargarPlanillas() {
    // this.planillaService.getList(lista => this.planillaList = lista);
    this.planillaList = this.dataService.getPlanillas(this.document);
  }

  seleccionarPlanilla(row: any) {
    this.planillaSeleccionado = row;
  }

  generarPlanilla() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      planillaList: this.planillaList
    };
    
    const dialogRef = this.dialog.open(GenerarPlanillaComponent, dialogConfig);
  }

  crearPlanilla() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      planillaSeleccionado: this.planillaSeleccionado
    };
    dialogConfig.exitAnimationDuration = '1000ms';
    dialogConfig.enterAnimationDuration = '1000ms';
    
    const dialogRef = this.dialog.open(CrearPlanillaDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(  
      result => {
        this.cargarPlanillas();
        this.planillaSeleccionado = this.dataService.getPlanillaVacio();
      });
  }

}

@Component({
  selector: 'dialog-crear',
  templateUrl: 'crear.planilla.component.html',
  imports: [MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearPlanillaDialog {

  //forms
  public planillaForm: UntypedFormGroup;

  public empleadoList: Array<Empleado> = [];

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

  readonly dialogRef = inject(MatDialogRef<CrearPlanillaDialog>);

  constructor(
    public dialog: MatDialog,
    public dataService: DataService,
    private _snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_DIALOG_DATA) public data: {
      planillaSeleccionado: Planilla
    }) {
    this.planillaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      empleado: [null, [Validators.required]],
      esEmpleadoDirecto: [false, [Validators.required]],
      salario: [0, [Validators.required, Validators.min(0.00)]],
      periodo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      fechaIngreso: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
    this.seleccionarPlanilla(data.planillaSeleccionado);
    this.cargarEmpleados();
    //this.document.defaultView?.localStorage.clear();
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

  validarDatos() {
    var valido = this.planillaForm.valid;
    if (!this.planillaF('nombre')?.valid) valido = false;
    if (!this.planillaF('empleado')?.valid) valido = false;
    if (!this.planillaF('esEmpleadoDirecto')?.valid) valido = false;
    if (!this.planillaF('salario')?.valid) valido = false;
    if (!this.planillaF('periodo')?.valid) valido = false;
    if (!this.planillaF('fechaIngreso')?.valid) valido = false;
    var salarioNum = parseFloat(this.planillaF('salario')?.value);
    if (!salarioNum || isNaN(salarioNum)) {
      valido = false
      this.planillaF('salario')?.setErrors({ key: "1" });
    };
    return valido;
  }

  guardarPlanilla() {
    if (this.validarDatos()) {
      this.planillaSeleccionado.nombre = this.planillaF('nombre')?.value;
      this.planillaSeleccionado.empleado = this.planillaF('empleado')?.value;
      this.planillaSeleccionado.esEmpleadoDirecto = this.planillaF('esEmpleadoDirecto')?.value;
      this.planillaSeleccionado.salario = this.planillaF('salario')?.value;
      this.planillaSeleccionado.periodo = this.planillaF('periodo')?.value;
      this.planillaSeleccionado.fechaIngreso = this.planillaF('fechaIngreso')?.value;

      if (this.planillaSeleccionado.id > 0) {
        this.dataService.editarPlanilla(this.document, this.planillaSeleccionado);  
      }else{
        this.dataService.pushPlanilla(this.document, this.planillaSeleccionado);
      }
      this.planillaForm = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        empleado: [null, [Validators.required]],
        esEmpleadoDirecto: [false, [Validators.required]],
        salario: [0, [Validators.required, Validators.min(0.00)]],
        periodo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
      });
      Utils.openSnackBar('listo', 'ok', this._snackBar);
      this.dialogRef.close();
    } else {
      Utils.openSnackBar('completa las validaciones', 'ok', this._snackBar);
    }
  }

  cargarEmpleados() {
    // this.puestoService.getList(lista => this.puestoList = lista);
    this.empleadoList = this.dataService.getEmpleados(this.document);
  }

  planillaF(control: string) { return this.planillaForm.get(control); }
}
