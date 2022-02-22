import Textbox from "./textbox";

export enum Direction {
  left = -1,
  right = 1,
  top,
  down,
}




export function formatExpression(expr: string): string {
  expr = removeFollowingOperators(expr);
  const reSpacedText = trimAll(expr)
    .replace(/(?<!^)([+\/*=-])/g, " $1 ")
    .trimEnd();
  return reSpacedText;
}

export function trimAll(text: string): string {
  return text.split(" ").join("");
}

export function isOperatorsFollowing(expr: string): boolean {
  const regexP = /[+\/*-]\s*[+\/*-]/g;
  return regexP.test(expr);
}

export function removeFollowingOperators(expr: string): string {
  if (!isOperatorsFollowing(expr)) return expr;

  return expr.replace(/([*+\/-])\s*[*+\/-]/g, "$1");
}

export function removeIsolatedOperators(expr: string): string {
  expr = trimAll(expr);
  const checkEndOperators = /^([0-9)!\s]*)([+\/\-*]+)$/.exec(expr);

  if (checkEndOperators !== null) {
    expr = checkEndOperators[1];
  }

  const checkBeginOperators = /^([+\/\-*]+)(.*)$/.exec(expr);
  if (checkBeginOperators !== null) {
    expr = checkBeginOperators[2];
  }

  expr = expr.replace(/([+\/*\-]+(\)))|((\()[+\/*\-]+)/g, "$4$2");

  expr = expr.replace(/((^|[+\/\-*]+)\(([^\s+\/\-*]+)\))/g, "$2$3");

  return formatExpression(expr);
}

export function deleteExpression(screen: Textbox):void {
  /*
    Removes a character(s) starting from caret position - 1 position. 
  */

  const text = screen.value;
  let location = screen.caretPosition - 1; 

  //remove ANS as a whole
  if(location >= 2 && text[location] === 'S' && text[location -1] === 'N' && text[location - 2] === "A"){
    screen.backspace();
    screen.backspace();
    screen.backspace();
    return;
  }

  if(text[location] === "("){
    let end = null;

    for(let i = location - 1; i >= -1; i--){
      end = i;
      const match = i !== -1 ? text[i].match(/[^0-9ABCDEFe×()\s\/\-+*]/g): null;
      if(match === null) break;
    }
    
    const bOpen = text.indexOf("(", location + 1);
    const bClose = text.indexOf(")", location + 1);
    let start = location;

    if(bClose > -1 && (bOpen === -1 || bOpen > -1 && bClose > -1 && bOpen > bClose)) {
      start = bClose;
      screen.caretPosition = bClose + 1;
    }

    let backspaces = start - end;
    while(backspaces !== 0){
      screen.backspace();
      backspaces--;
    }
    return;
  }

  while(location > 0 && isInFunction(text, location)) {
    location--;
  }

  if(screen.caretPosition !== location + 1) {
    screen.caretPosition = location + 1;
  }
  screen.backspace();
}



export function isInFunction(expr: string, location: number): boolean {
  if(!expr[location]) return false;
  const result = expr[location].match(/[^0-9ABCDEFe×()\s\/\-−+÷*]/g);
  return  result !== null;
}
