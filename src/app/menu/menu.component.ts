import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from '../models/menu';

@Component({
  selector: 'app-menu',
  imports: [MaterialModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  public menusList: Array<Menu> = [];
  public menuSeleccionado: Menu = {
    id: 0,
    ruta: '',
    nombre: ''
  };
  public innerWidths = '0';

  constructor(
    private dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idUsuario: number
    }) { this.innerWidths = (window.innerWidth * 0.9) + 'px'; }

  ngOnInit(): void {
    this.cargarMenusDeMantenimientos();
  }

  cargarMenusDeMantenimientos() {
    this.menusList.push({ id: 1, ruta: '/menu/login', nombre: 'Login' });
    this.menusList.push({ id: 2, ruta: '/menu/planilla', nombre: 'Planillas' });

    // this.menusList.push({id: 1,ruta: '/menu/departamento',nombre: 'Departamentos'});
  }

  redirigirMenu(dir: string) {
    let response: any = {};
    response.url = dir;
    this.dialogRef.close(response);
  }

}
