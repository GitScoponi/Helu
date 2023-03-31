import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Parametros } from '../model/parametros.model';
import { AuteticationService } from './autetication.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrossService {
  constructor(
    private db: AngularFireDatabase,
    private _auth: AuteticationService
  ) {}
  banco: string = 'Parametros';
  getAll() {
    return this.db
      .list(this.banco)
      .snapshotChanges()
      .pipe(
        map((x: any) => {
          return x.map((c: any) => {
            var response = new Parametros(c.payload.val());
            response.Codigo = c.payload.key;
            return response;
          });
        })
      );
  }
  get(key: string) {
    return this.db.list(this.banco + '/' + key).valueChanges();
  }
  getByCalculadora(key: string) {
    return this.db
    .list(this.banco, (ref) => {
      return ref.orderByChild('Codigo_Calculadora').equalTo(key);
    })
    .snapshotChanges()
    .pipe(
      map((x: any) => {
        return x.map((c: any) => {
          var response = new Parametros(c.payload.val());
          response.Codigo = c.payload.key;
          return response;
        });
      })
    );
  }

  update(value: Parametros) {
    return this.db
      .list(this.banco)
      .update(value.Codigo.toString(), value)
      .catch((error: any) => {
        console.error(error);
      });
  }
  insert(value: Parametros) {
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
