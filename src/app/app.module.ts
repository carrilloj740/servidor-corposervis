import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared-component/navbar/navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PoliciaComponent } from './components/clientes/policia/policia.component';
import { ProteccionCivilMarinoComponent } from './components/clientes/proteccion-civil-marino/proteccion-civil-marino.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AdminDashboardComponent,
    PoliciaComponent,
    ProteccionCivilMarinoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
