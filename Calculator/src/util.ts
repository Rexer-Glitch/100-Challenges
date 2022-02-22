import math from "mathjs-expression-parser";

export const calculate = (expression: string, isDeg: boolean, scope: {}) => {
  let ans: number = 0;
  expression = parseExpression(expression, isDeg);
  try {
    ans = math.eval(expression, scope);
  } catch (e) {
    throw new Error(e);
  }
  return ans;
};

function parseExpression(expression: string, isDeg: boolean): string {
  expression = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, `(${Math.PI})`)
    .replace(/ln\((.+)\)/g, "log($1,e)")
    .replace(/log\((.+)\)/g, "log($1, e")
    .replace(/cos⁻¹\((.+)\)/g, "acos($1)")
    .replace(/sin⁻¹\((.+)\)/g, "asin($1)")
    .replace(/tan⁻¹\((.+)\)/g, "atan($1)")
    .replace(/³√\((.+)\)/g, "($1)^(1/3)")
    .replace(/√/g, "sqrt");


  if (isDeg) {
    expression = expression
    .replace(/^cos\((.+)\)/g, `cos(($1) * (${math.pi}/180.0))`)
    .replace(/^sin\((.+)\)/g, `sin(($1) * (${math.pi}/180.0))`)
    .replace(/^tan\((.+)\)/g, `tan(($1) * (${math.pi}/180.0))`)
    
    .replace(/(acos\(.+\))/g, `($1 * (180.0/${math.pi}))`)
    .replace(/(asin\(.+\))/g, `($1 * (180.0/${math.pi}))`)
    .replace(/(atan\(.+\))/g, `($1 * (180.0/${math.pi}))`);
  }
  console.log(expression)

  return expression;
}
