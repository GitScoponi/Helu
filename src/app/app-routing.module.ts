import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'calculadora',
    component: CalculadoraComponent,
    canActivate: [LoginAuthGuard],
  },
  { path: 'menu', component: MenuComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'parametros',
    component: ParametrosComponent,
    canActivate: [LoginAuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
