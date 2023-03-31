import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Menu } from '../model/menu.model';
import { AuteticationService } from './autetication.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private db: AngularFireDatabase,
    private _auth: AuteticationService
  ) {}
  banco: string = 'Menu';
  getAll() {
    return this.db
      .list(this.banco)
      .snapshotChanges()
      .pipe(
        map((x: any) => {
          return x.map((c: any) => {
            var response = new Menu(c.payload.val());
            response.Codigo = c.payload.key;
            return response;
          });
        })
      );
  }
  get(key: string) {
    return this.db.list(this.banco + '/' + key).valueChanges();
  }

  update(value: Menu) {
    return this.db
      .list(this.banco)
      .update(value.Codigo.toString(), value)
      .catch((error: any) => {
        console.error(error);
      });
  }
  insert(value: Menu) {
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
