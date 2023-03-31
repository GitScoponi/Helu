import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { first } from 'rxjs/operators';
import { Usuario } from '../model/usuario.model';
import { FGService } from '../utils/FG.service';

@Injectable({
  providedIn: 'root',
})
export class AuteticationService {
  constructor(
    private auth: AngularFireAuth,
    private _db: AngularFireDatabase,
    private _fg: FGService,
    private _nav: Router
  ) {
    this.auth.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        this.setUser(user);
      } else {
        this.setUser('null');
      }
    });
  }

  login(Usuario: string, Senha: string) {
    return this.auth.signInWithEmailAndPassword(Usuario, Senha);
  }
  get usuarioLogado(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }
  cadastrarNovoUsuario(Email: string, Senha: string) {
    return this.auth.createUserWithEmailAndPassword(Email, Senha);
  }

  cadastrarUsuarioNoBanco(
    ID: string,
    Nome: string,
    Sobrenome: string,
    Email: string
  ) {
    return this._db
      .list('Usuarios')
      .push(
        new Usuario({ ID: ID, Nome: Nome, Email: Email, Sobrenome: Sobrenome })
      )
      .catch((x) => {
        console.error(x);
      });
  }

  enviarEmailSenha(Email: string) {
    return this.auth.sendPasswordResetEmail(Email);
  }

  setUser(usuario: any) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }
  getUser() {
    var user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return this._nav.navigate(['/login']);
  }

  sair() {
    this.auth.signOut().then((x) => {
      localStorage.removeItem('user');
      return this._nav.navigate(['/login']);
    });
  }
}
