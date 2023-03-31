import { ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable, fromEvent, merge, ReplaySubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export abstract class FormBase {
  private validationMessage: ValidationMessages = {};
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  submitted: boolean = false;
  constructor(validadores?: any) {
    if (validadores) {
      this.validationMessage = validadores;
      this.genericValidator = new GenericValidator(this.validationMessage);
    }
  }

  ativarFormulario(
    formInputElements: ElementRef[],
    formulario: FormGroup,
    btn: ElementRef
  ) {
    let controlBlurs: Observable<any>[] = formInputElements.map(
      (formControl: ElementRef) =>
        fromEvent(formControl.nativeElement, 'focusout')
    );
    let btnSubmit$: Observable<any> = fromEvent(btn.nativeElement, 'click');
    btnSubmit$.subscribe((x) => {
      this.displayMessage =
        this.genericValidator.processMessagesSubmit(formulario);
    });
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(formulario);
    });
  }
}

export class GenericValidator {
  constructor(private validationMessages: ValidationMessages) {}
  processMessages(container: FormGroup): DisplayMessage {
    let messages: any = {};
    for (let controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        let c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          let childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map((messagekey) => {
                if (this.validationMessages[controlKey][messagekey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messagekey];
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
  processMessagesSubmit(container: FormGroup): DisplayMessage {
    let messages: any = {};
    for (let controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        let c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          let childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if (c.errors) {
              Object.keys(c.errors).map((messagekey) => {
                if (this.validationMessages[controlKey][messagekey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messagekey];
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}

export interface DisplayMessage {
  [key: string]: string;
}
export interface ValidationMessages {
  [key: string]: { [key: string]: string };
}

// Como usar a class =======================================================================================================

// no Componente usar :

// @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
// ngAfterViewInit(): void {
//     this.formulario.ativarFormulario(this.formInputElements,this.cadastro);
//    }

// export class formulario extends FormBase {
//     email: string;
//     cpf: string;
//     password: string;
//     constructor(){
//     super({
//         Email: {
//           required: ' O nome é requerido',
//           email: 'Email inválido!'
//         },
//         Password: {
//           required: 'O password é requirido',
//           rangeLength: 'O password deve ter entre 3 e 10 caracteres'
//         },
//         Cpf: {
//           required: 'O CPF é requerido',
//           cpf: 'CPF inválido'
//         }
//       })
//     }
// }

// <label  class="form-label">{{titulo}}</label>
//    <input type="password" class="form-control" formControlName="Password"
//      [ngClass]="{'is-invalid': formulario.displayMessage.Password  }">
// <span class="text-danger" *ngIf="formulario.displayMessage.Password ">
//     <p [innerHTML]="formulario.displayMessage.Password"> </p>
// </span>
