
export class Parametros {
    Codigo: string;
    Codigo_Calculadora: string;
    Tipo: string;
    Titulo:string;
    Posicao:number;
    Unidade:string;
    constructor(obj:Partial<Parametros>={}){
        Object.assign(this,obj);
    }
}