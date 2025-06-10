import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-pantallas',
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.css'
})
export class PantallasComponent {

  logged = false;
  isChecked = false;
  public isLightTheme = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router) {
    var logged1 = this.document.defaultView?.localStorage?.getItem('logged');
    this.logged = logged1 == 'true' ? true : false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  onThemeSwitchChange() {
    this.isLightTheme = !this.isChecked;

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
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
