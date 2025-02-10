import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { PoliciaComponent } from './components/clientes/policia/policia.component';
import { ProteccionCivilMarinoComponent } from './components/clientes/proteccion-civil-marino/proteccion-civil-marino.component';

const routes: Routes = [

  // Páginas interntas
  {
    path: 'policia-marino',
    component: PoliciaComponent,
    canActivate: [AuthGuard],
    data: { role: 'policia1' },
  },
  {
    path: 'proteccion-civil-marino',
    component: ProteccionCivilMarinoComponent,
    canActivate: [AuthGuard],
    data: { role: 'proteccionCM' },
  },

  // Globales
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
