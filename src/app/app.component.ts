import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
const ptMessages = require('../../node_modules/devextreme/localization/messages/pt.json');
import { loadMessages, locale } from 'devextreme/localization';
import { AuteticationService } from './providers/autetication.service';
import { FGService } from './utils/FG.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '';
  loadingVisible: boolean = false;
  caminhoLogo: string = '';
  MostraLogo: string;
  nomeUsuario = '';

  constructor(
    private cdref: ChangeDetectorRef,
    private fg: FGService,
    private router: Router,
    private _auth:AuteticationService
  ) {
    loadMessages(ptMessages);
    locale(navigator.language);
    this.fg.spinnerLoading.subscribe((visivel) => {
      this.loadingVisible = visivel;
    });
 
  }

  toTop() {
    window.scroll(0, 0);
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }


 
  sair() {
    this._auth.sair();
  }
 
  //#endregion
}
