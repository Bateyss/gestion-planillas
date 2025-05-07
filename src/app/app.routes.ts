import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PantallasComponent } from './pantallas/pantallas.component';
import { PlanillaComponent } from './planilla/planilla.component';

export const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    {
        path: 'menu', component: PantallasComponent, children: [
          { path: '', redirectTo: '/menu/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent, },
          { path: 'planilla', component: PlanillaComponent, }
        ]
    }
];