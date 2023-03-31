import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { AuteticationService } from 'src/app/providers/autetication.service';
import { Alert } from 'src/app/utils/Alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuteticationService, private _route: Router) {}

  ngOnInit(): void {}
  enviarFormulario(f: NgForm) {
    var form = f.form;
    if (form.valid)
      this._auth.login(form.value.Usuario, form.value.Senha).then(
        (x: any) => {
          if (x.user.emailVerified) {
            this._auth.setUser(
              new Usuario({ ID: x.user.uid, Email: form.value.Senha })
            );
            this._route.navigate(['/home']);
            // this.menu.enable(true);
          } else {
            Alert.AlertaErro('Usuário ou senha incorretos');
          }
        },
        (e) => {
          Alert.AlertaErro('Usuário ou senha incorretos');
        }
      );
  }
}
