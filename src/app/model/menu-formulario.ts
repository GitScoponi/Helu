import { FormBase } from '../utils/FormBase';

export class MenuFormulario extends FormBase {
  constructor() {
    super({
      Codigo: { required: 'Campo obrigatório!' },
      Titulo: { required: 'Campo obrigatório!' },
      Rota: { required: 'Campo obrigatório!' }
    });
  }
}
