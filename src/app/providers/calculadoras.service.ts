import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Calculadora } from '../model/calculadora.model';
import { Favoritos } from '../model/favoritos.model';
import { AuteticationService } from './autetication.service';

@Injectable({
  providedIn: 'root',
})
export class CalculadorasService {
  constructor(
    private db: AngularFireDatabase,
    private _auth: AuteticationService
  ) {}
  banco: string = 'Calculadora';
  getAll() {
    return this.db
      .list(this.banco)
      .snapshotChanges()
      .pipe(
        map((x: any) => {
          return x.map((c: any) => {
            var response = new Calculadora(c.payload.val());
            response.Codigo = c.payload.key;
            return response;
          });
        })
      );
  }
  get(key: string) {
    return this.db.list(this.banco + '/' + key).valueChanges();
  }
  getByMenu(key: string) {
    return this.db
      .list(this.banco, (ref) => {
        return ref.orderByChild('Codigo_Menu').equalTo(key);
      })
      .snapshotChanges()
      .pipe(
        map((x: any) => {
          return x.map((c: any) => {
            var response = new Calculadora(c.payload.val());
            response.Codigo = c.payload.key;
            return response;
          });
        })
      );
  }

  update(value: Calculadora) {
    return this.db
      .list(this.banco)
      .update(value.Codigo.toString(), value)
      .catch((error: any) => {
        console.error(error);
      });
  }
  insert(value: Calculadora) {
    return this.db
      .list(this.banco)
      .push(value)
      .catch((error: any) => {
        console.error(error);
      });
  }
  delete(value: string) {
    return this.db
      .object(this.banco + '/' + value)
      .remove()
      .catch((error: any) => {
        console.error(error);
      });
  }
}
