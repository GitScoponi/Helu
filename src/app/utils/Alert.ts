import * as Noty from 'noty';
export abstract class Alert {
  static AlertaSucesso(msg: string) {
    new Noty({
      theme: 'bootstrap-v4',
      text: msg,
      type: 'success',
      layout: 'center',
      timeout: 2000,
    }).show();
  }

  static AlertaAviso(msg: string) {
    new Noty({
      type: 'warning',
      layout: 'center',
      theme: 'bootstrap-v4',
      timeout: 2500,
      text: msg,
    }).show();
  }

  static AlertaErro(msg: string) {
    new Noty({
      type: 'error',
      layout: 'center',
      theme: 'bootstrap-v4',
      killer: true,
      buttons: [
        Noty.button('Ok', 'btn btn-danger btn-sm btn-rounded', (n: any) => {
          n.close();
        }),
      ],
      timeout: false,
      text: msg,
    }).show();
  }
}
