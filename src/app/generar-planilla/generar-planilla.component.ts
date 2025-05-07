import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Planilla } from '../models/planilla';

@Component({
  selector: 'app-generar-planilla',
  imports: [MaterialModule],
  templateUrl: './generar-planilla.component.html',
  styleUrl: './generar-planilla.component.css'
})
export class GenerarPlanillaComponent {

  //list
  public planillaList: Array<any> = [];

  constructor(private dialogRef: MatDialogRef<GenerarPlanillaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      planillaList: Array<Planilla>
    }) {
    this.cargarPlanillas();

  }
  cargarPlanillas() {
    this.planillaList = this.data.planillaList;

    for (let i = 0; i < this.planillaList.length; i++) {
      var actualDate : Date = new Date()
      var planillaDate = Date.parse(this.planillaList[i].fechaIngreso);
      var dateYearsDiff = actualDate.getTime() - planillaDate;
      dateYearsDiff = dateYearsDiff / (1000*3600*24*7);
      dateYearsDiff = dateYearsDiff / 52.1429;

      this.planillaList[i].aniosLaborados = dateYearsDiff;

      var salarioValue = this.planillaList[i].salario;

      var isssPatronal =  salarioValue<1000?salarioValue*0.075: 75;
      this.planillaList[i].isssPatronal = isssPatronal;

      var isssEmpleado =  salarioValue<1000?salarioValue*0.03: 30;
      this.planillaList[i].isssEmpleado = isssEmpleado;

      var afpPatronal =  salarioValue*0.085;
      this.planillaList[i].afpPatronal = afpPatronal;

      var afpEmpleado =  salarioValue*0.0725;
      this.planillaList[i].afpEmpleado = afpEmpleado;
      
      //this.data.planillaList[0].salario
    }
  }

}
