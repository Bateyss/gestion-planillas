import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-pantallas',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.css'
})
export class PantallasComponent {
  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router) { }

  ngOnInit(): void {
  }

  abrirMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idUsuario: 1
    };
    const dialogRef = this.dialog.open(MenuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(  
      result => {
        if (result && result?.url) {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "nada": 'xd'
            }
          };
          this._router.navigate([result.url], navigationExtras);
        }
      });
  }
}
