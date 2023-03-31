export class Usuario {
    ID:string;
    Nome!: string;
    Sobrenome!: string;
    Email!: string;
    constructor(obj: Partial<Usuario> = {}) {
        Object.assign(this, obj);
    }
}