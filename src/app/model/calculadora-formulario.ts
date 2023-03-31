import { FormBase } from '../utils/FormBase';

export class CalculadoraFormulario extends FormBase {
  constructor() {
    super({
      Codigo: { required: 'Campo obrigatório!' },
      Titulo: { required: 'Campo obrigatório!' },
      Funcao: { required: 'Campo obrigatório!' },
      Codigo_Menu: { required: 'Campo obrigatório!' },
    });
  }
}
