export class Menu {
  Codigo: string;
  Titulo: string;
  Rota: string;

  constructor(obj: Partial<Menu> = {}) {
    Object.assign(this, obj);
  }
}
