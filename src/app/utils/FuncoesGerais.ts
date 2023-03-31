import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, from, fromEvent, Observable, of, throwError } from "rxjs";
import { debounceTime, map } from "rxjs/operators";


export abstract class FG {

  static getHeaders() {
    var headers: HttpHeaders = new HttpHeaders()
      .set(
        'Content-Type', 'application/json')
    // .set('Authorization', `bearer ${this.login.getCredentials()}`)
    return { 'headers': headers };
  }

  static tratarCampo(type: string, campo: string) {
    switch (type) {
      case 'date':
        return campo.substring(0, 10);
      case 'currency':
        return 'R$' + (Number.parseFloat(campo.replace(',', '.'))).toLocaleString();
      default:
        return campo;
    }

  }

}

export abstract class Session {

}
