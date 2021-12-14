import { evaluate } from "mathjs";

export function clamp(n: number, l: number, h: number): number {
  if (n < l) {
    return l;
  } else if (n > h) {
    return h;
  }

  return n;
}

export function calculate(expression:string, scope:{}):number {
  let ans:number = 0;
    expression = parseExpression(expression);
    try{
      ans = evaluate(expression, scope);
    }catch(e){
      throw new Error(e);
    }
  return ans;
} 

function parseExpression(expression:string):string{
  return expression.replace(/×/g,"*").replace(/÷/g, "/").replace(/−/g, "-").replace(/π/g, `(${Math.PI})`).replace(/ln\((.+)\)/g, "log($1,e)").replace(/cos⁻¹\((.+)\)/g,"acos($1)").replace(/³√\((.+)\)/g, "($1)^(1/3)").replace(/√/g, "sqrt");
}
