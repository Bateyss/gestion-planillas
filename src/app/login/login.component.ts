import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material/material.module'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-login',
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

//forms
public loginForm: UntypedFormGroup;

public mensajeLogin = '';

  constructor(private formBuilder: UntypedFormBuilder, private _snackBar: MatSnackBar){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  login() {
    if (this.validarDatos()) {
      if (this.loginF('username')?.value === 'admin' && this.loginF('password')?.value === '1234') {
        Utils.openSnackBar('Login exitoso', 'ok', this._snackBar);
      } else {
        Utils.openSnackBar('Credenciales incorrectas', 'ok', this._snackBar);
      }
    }else{
      Utils.openSnackBar('Completar credenciales', 'ok', this._snackBar);
    }
  }

  validarDatos() {
    var valido = this.loginForm.valid;
    if (!this.loginF('username')?.valid) valido = false;
    if (!this.loginF('password')?.valid) valido = false;
    return valido;
  }

  loginF(control: string) { return this.loginForm.get(control); }
}
