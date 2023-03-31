import { debounceTime, map } from 'rxjs/operators';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FGService {

  constructor() { }

  spinnerLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  AtivarSpinner() {
    this.spinnerLoading.next(true);
  }
  DesativarSpinner() {
    this.spinnerLoading.next(false);
  }

  resizeObservable$: Observable<any>
  tamanhoDaTela() {
    this.resizeObservable$ = fromEvent(window, 'resize')
    return this.resizeObservable$.pipe(debounceTime(500), map(x => x.target.innerWidth));

  }
  mostraNaTela() {
    this.resizeObservable$ = fromEvent(window, 'resize')
    return this.resizeObservable$.pipe(debounceTime(500), map(x => new Tela({
      mostraCelular: x.target.innerWidth < 576,
      mostraTablet: x.target.innerWidth >= 576,
      mostraComputador: x.target.innerWidth > 992
    })));
  }
  convertLocaleDatetoDate(date:string){
    var dia = date.substring(0,2);
    var mes = date.substring(3,5);
    var ano = date.substring(6,10);
    return mes+'/'+dia+'/'+ano;
  }

  tratarCampo(type: string, campo: string) {
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

export class Tela {
  mostraCelular: boolean;
  mostraTablet: boolean;
  mostraComputador: boolean;
  constructor(tela: Partial<Tela> = {}) {
    Object.assign(this, tela);
  }
}
