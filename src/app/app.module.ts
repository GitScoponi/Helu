import { NgxMaskModule } from 'ngx-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { SpwFormGroupComponent } from 'src/app/components/spw-form-group/spw-form-group.component';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import {
  DevExtremeModule,
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpErrorInterceptor } from './utils/HttpErrorInterceptor';
import { FGService } from './utils/FG.service';
import { Router } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AngularFireModule } from '@angular/fire';
import { MenuComponent } from './pages/menu/menu.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { HomeComponent } from './pages/home/home.component';
import { LogoClaraComponent } from './components/logo-clara/logo-clara.component';
import { LogoEscuraComponent } from './components/logo-escura/logo-escura.component';
import { LoginComponent } from './pages/login/login.component';
import { CalculadoraGridInternaComponent } from './pages/calculadora/calculadora-grid-interna/calculadora-grid-interna.component';
import { ParametrosGridInternaComponent } from './pages/parametros/parametros-grid-interna/parametros-grid-interna.component';
var firebaseConfig = {
  apiKey: 'AIzaSyB8HBhPPNLv0VbpXuXp8Tu2ylCeH2D22pg',
  authDomain: 'pedsafe-b44f4.firebaseapp.com',
  databaseURL: 'https://pedsafe-b44f4-default-rtdb.firebaseio.com',
  projectId: 'pedsafe-b44f4',
  storageBucket: 'pedsafe-b44f4.appspot.com',
  messagingSenderId: '58442520255',
  appId: '1:58442520255:web:6741059180126c6026580a',
  measurementId: 'G-FJWEX1Q72M',
};
@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent,
    SpwFormGroupComponent,
    MenuComponent,
    ParametrosComponent,
    HomeComponent,
    LogoClaraComponent,
    LogoEscuraComponent,
    LoginComponent,
    CalculadoraGridInternaComponent,
    ParametrosGridInternaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxNavbarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng2SearchPipeModule,
    NgxMaskModule.forRoot(),
    DxLoadPanelModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    NgxExtendedPdfViewerModule,
    DxButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [FGService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
