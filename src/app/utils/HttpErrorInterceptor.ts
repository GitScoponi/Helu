import { FGService } from './FG.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, delay } from 'rxjs/operators';
import { Alert } from './Alert';
import { FG } from './FuncoesGerais';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private fg: FGService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.fg.AtivarSpinner();
    return next.handle(request).pipe(
      // tap(x=>{this.fg.DesativarSpinner();}),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log('erro', error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          switch (error.status) {
            case 0:
              errorMessage = 'Erro de conexão!';
              break;
            case 401:
              this.router.navigate(['/']);
              // errorMessage = "Acesso negado para realizar esta operação!"
              break;
            default:
              errorMessage = `${
                error.error.message
                  ? error.error.message
                  : error.error.error
                  ? error.error.error
                  : error.error
              }`;
              break;
          }
        }
        if (error.status != 401) Alert.AlertaErro(errorMessage);
        this.fg.DesativarSpinner();
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
