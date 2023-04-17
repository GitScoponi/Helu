export class Funcao {
    Codigo: string;
    Codigo_Calculadora:string;
    Funcao:string;
    constructor(obj:Partial<Funcao>={}){
        Object.assign(this,obj);
    }
}