import buttonData from "./buttonsData";
import { buttons, screen, screenAnswer, screenIndicators } from "./assets";
import { deleteExpression, isInFunction} from "./screen.helper";
import { calculate } from "./util";

class Calculator {
  private isSec = false;
  private isAlpha = false;
  private isDeg = true;
  private isSTO = false;
  private isOn = false;
  private isRCL = false;
  private ANS = null;
  private A = 0;
  private B = 0;
  private C = 0;
  private D = 0;
  private E = 0;
  private F = 0;
  private X = 0;
  private Y = 0;
  private a = 0;
  private b = 0;
  private c = 0;
  private r = 0;

  constructor() {
    this.handleClicks();
    this.turnOFF();
  }
  handleClicks() {
    /*
     Setup a delegate event handler, catching all button clicks and grabs button data for further process
    */
    buttons.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const { sec, ter } = target.dataset;

      const data = buttonData.find((d) => {
        if (!this.isSec && !this.isAlpha) return d.name === target.innerHTML;
        if (this.isSec) return d.name === sec;
        if (this.isAlpha) return d.name === ter;
      });
      if (data) {
        this.#processButtonClicks(data.func);
        return;
      }

      this.setIndicators({ isSec: false, isAlpha: false,isSTO: this.isSTO, isDeg: this.isDeg });
      this.isRCL = false;
    });
  }

  #processButtonClicks(func: string): void {
    /*
      Processes data from clicked button
        -assigns function based on the data provided by the clicked button
     */

    this.setIndicators({ isSec: false, isAlpha: false,isSTO: this.isSTO, isDeg: this.isDeg });

    if (func === "on") {
      if (this.isOn) {
        this.clearScreen();
        return;
      }
      this.turnON();
      return;
    } else if (func === "off") {
      this.turnOFF();
      return;
    }

    if (!this.isOn) return;

    switch (func) {
      case "←": {
        if(this.isOnVariableMode()){
          this.clearScreen();
          break;
        }


        screen.moveCaretPosition(-1);
        break;
      }
      case "→": {
        if(this.isOnVariableMode()){
          this.clearScreen();
          break;
        }


        screen.moveCaretPosition(1);
        break;
      }
      case "=": {
        if(this.isOnVariableMode()){
          this.clearScreen();
          break;
        }

        try {
          const answer = Math.fround(this.evaluate());
          this.ANS = answer;
          screenAnswer.textContent = String(answer);
        } catch (e) {
          screenAnswer.textContent = "Err";
        }
        break;
      }
      case "2nd F": {
        this.setIndicators({ isSec: true, isAlpha: false,isSTO: this.isSTO, isDeg: this.isDeg });
        break;
      }
      case "alpha": {
        this.setIndicators({ isSec: false, isAlpha: true,isSTO: this.isSTO, isDeg: this.isDeg });
        break;
      }
      case "STO": {
        this.setIndicators({ isSec: this.isSec, isAlpha: this.isSec,isSTO: true, isDeg: this.isDeg });
        break;
      }
      case "RCL": {
        this.isRCL = true;
        break;
      }
      case "del": {
        if(this.isOnVariableMode()){
          this.clearScreen();
          break;
        }



        deleteExpression(screen);
        break;
      }
      default: {
        if(isInFunction(screen.value, screen.caretPosition - 1)) break;


        //if its a variable saving combination, just save and not append
        if(this.saveVariablesToMemory(func)) break;

        if(this.isOnVariableMode()) this.clearScreen();

        const recallVar = this.recallVariable(func);

        if(recallVar !== false){
          func = String(recallVar);
        }

       

        screen.appendToCaret(func);
        if (func.includes("()")) {
          screen.moveCaretPosition(-1);
        }
        
        break;
      }
    }
  }

  evaluate():number{
   return calculate(screen.value, this.isDeg, {
      ANS: this.ANS,
      A: this.A,
      B: this.B,
      C: this.C,
      D: this.D,
      E: this.E,
      F: this.F,
      X: this.X,
      Y: this.Y,
      a: this.a,
      b: this.b,
      c: this.c,
      r: this.r,
    });
  }

  turnOFF() {
    this.isOn = false;
    this.isSec = false;
    this.isAlpha = false;

    this.clearScreen();
    screen.isCaretVisible = false;

    screenIndicators.innerHTML = "";
  }

  turnON() {
    this.isOn = true;

    screen.isCaretVisible = true;
    this.updateScreenIndicators();
  }

  clearScreen() {
    screen.value = "";
    screenAnswer.textContent = "";
  }

  private updateScreenIndicators() {
    screenIndicators.innerHTML = "";
    screenIndicators.innerHTML += this.isSec
      ? "<span><b>S</b></span>"
      : "<span></span>";
    screenIndicators.innerHTML += this.isAlpha
      ? "<span><b>A</b></span"
      : "<span></span>";
      screenIndicators.innerHTML += this.isSTO
      ? "<span>STO</span"
      : "<span></span>";
    screenIndicators.innerHTML += this.isDeg
      ? "<span>DEG</span"
      : "<span>RAD</span>";
  }

  private setIndicators(indicators: {
    isSec: boolean;
    isAlpha: boolean;
    isSTO: boolean
    isDeg: boolean;
  }): void {
    if (!this.isOn) return;
    const keys = Object.keys(indicators);
    keys.forEach((key) => {
      this[key] = indicators[key];
    });

    this.updateScreenIndicators();
  }

  saveVariablesToMemory(variable: string):boolean {
    if(this.isSTO){
      this.setIndicators({ isSec: this.isSec, isAlpha: this.isAlpha, isSTO: false, isDeg: this.isDeg });
    }else {return false};


    if(!['A','B','C', 'D', 'E', 'F','X','Y', 'a','b','c','r'].includes(variable) && this.isOnVariableMode) return false;

    const data:number = screenAnswer.textContent != "" ? Number(screenAnswer.textContent) : this.evaluate();
    if(!data || Number.isNaN(data)) return false;
    this[variable] = data;                              
              
    this.clearScreen();
    screen.value = `${variable} => ${data}`;
    return true;
  } 

  private isOnVariableMode():boolean{
    return screen.value.match(/^[ABCDEFXYabcr] => [0-9]+$/) !== null;
  }

  private recallVariable(variable: string):boolean | number {
    if(variable.match(/^[ABCDEFXYabcr]$/g) === null) return false; 
    if(!this.isRCL) return false;
    this.isRCL = false;
    return this[variable];
  }
}

export default Calculator;
