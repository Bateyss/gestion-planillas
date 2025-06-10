import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuComponent } from '../menu/menu.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pantallas',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.css'
})
export class PantallasComponent {

  public logged = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router) {
    var logged1 = this.document.defaultView?.localStorage?.getItem('logged');
    this.logged = logged1 == 'true' ? true : false;
  }

  ngOnInit(): void {
    console.log('init');

  }

  ngOnChanges(): void {
    console.log('changue');
  }

  routerActivated(value: any): void {
    var logged1 = this.document.defaultView?.localStorage?.getItem('logged');
    this.logged = logged1 == 'true' ? true : false;
  }

  onLoggionChangue(value: any): void {
    console.log('valor loggin changue');
    console.log(value);
    if (value) {
      this.logged = true;
    } else {
      this.logged = false;
    }
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

  homeClick() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "nada": 'xd'
      }
    };
    this._router.navigate(['/menu/planilla'], navigationExtras);
  }

  cerrarSesion() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "logged": 'false'
      }
    };
    this.document.defaultView?.localStorage?.setItem('logged', 'false');
    this._router.navigate(['/menu/login'], navigationExtras);
  }
}
