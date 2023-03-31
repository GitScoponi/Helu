
export class Calculadora {
    Codigo: string;
    Titulo:string;
    Funcao:string;
    Codigo_Menu:number;
    constructor(obj:Partial<Calculadora>={}){
        Object.assign(this,obj);
    }
}