import { FormBase } from '../utils/FormBase';

export class ParametrosFormulario extends FormBase {
  constructor() {
    super({
      Codigo: { required: 'Campo obrigatório!' },
      Titulo: { required: 'Campo obrigatório!' },
      Posicao: { required: 'Campo obrigatório!' },
      Tipo: { required: 'Campo obrigatório!' },
      Unidade: { required: 'Campo obrigatório!' },
      Codigo_Calculadora: { required: 'Campo obrigatório!' },
    });
  }
}
