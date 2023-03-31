export class Variaveis {
  var1: string;
  var2: string;
  var3: string;
  var4: string;
  var5: string;
  tipoVar1: string;
  tipoVar2: string;
  tipoVar3: string;
  tipoVar4: string;
  tipoVar5: string;
  funcao: string;
  calculadora: string;
  resultado:Function;

  constructor(obj: Partial<Variaveis> = {}) {
    Object.assign(this, obj);
    if (this.funcao != '' && this.funcao != null) {
      this.calculadora = this.funcao
        .replace('var1', this.var1)
        .replace('var2', this.var2)
        .replace('var3', this.var3)
        .replace('var4', this.var4)
        .replace('var5', this.var5);
      var aux = ` return function resultado(){ return ${this.calculadora};}`;
      this.resultado = new Function(aux)();
    }
  }
}
