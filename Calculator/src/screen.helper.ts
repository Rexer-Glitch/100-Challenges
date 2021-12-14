import btnData from "./buttonsData";

interface delObj {
  text:string,
  count:number
}

export function HandleClickButtons(
  { target },
  isSecF: boolean = false,
  isAlpha: boolean = false
): Promise<string> {
  return new Promise((resolve, reject) => {
    if(target.tagName != "BUTTON") return;
    const data = btnData.find((d) =>
      isSecF
        ? target.dataset.sec === d.name
        : isAlpha
        ? target.dataset.ter === d.name
        : d.name === target.innerHTML
    );
    
    if (!data)return;

    resolve(data.func);
    
  });
}

export function del(text:string, position:number):delObj {
  
  if(text[position - 1] === ")" || text[position] === ")"){
    return {text, count: 1};
  }else if(text[position] === "("){
    let startIndex = text.lastIndexOf(" ", position - 1) | 0;
    let endIndex = text.indexOf(")", position);
    let tempStartIndex = text.lastIndexOf("(",endIndex);
    tempStartIndex = text.lastIndexOf("(",tempStartIndex - 1);
  
    if(endIndex >= 0){
      startIndex = tempStartIndex !== position - 1 &&  tempStartIndex < endIndex?  tempStartIndex + 1 : startIndex;
      text = text.substring(0, startIndex) + text.substring(endIndex + 1, text.length);
      return {text, count: position - startIndex};
    }
  }
 
    text = text.substring(0, position) + text.substring(position + 1, text.length);
    return {text, count: 1};
}