export class Favoritos {
  IDUsuario!: string;
  IDCalculadora!: number;
  constructor(obj: Partial<Favoritos> = {}) {
    Object.assign(this, obj);
  }
}
