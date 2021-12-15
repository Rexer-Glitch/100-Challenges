import Screen from "./screen";
import { buttons, onBtn, secFBtn, alphaBtn } from "./assets";
import { HandleClickButtons } from "./screen.helper";
import { calculate } from "./util";

class Calculator {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  X: number;
  Y: number;
  ANS: number;
  history: string[];
  ON: boolean;
  SecF: boolean;
  Alpha: boolean;
  STO: boolean;
  screen: Screen;
  isRad: boolean;

  constructor() {
    this.reset();
    this.init();
  }

  init() {
    buttons.addEventListener("click", (e) => {
      if (!this.ON) return;
      HandleClickButtons(e, this.SecF, this.Alpha)
        .then((data) => {
          this.processBtnData(data);
        })
        .finally(() => {
          //focus screen;
          this.screen.screenWriter.focus();

          //turn of second function or alpha on button click
          const target = e.target as HTMLButtonElement;
          if (
            target.classList.contains("sec-btn") ||
            target.classList.contains("alphaBtn") ||
            target.classList.contains("stoBtn")
          )
            return;
          this.SecF = false;
          this.Alpha = false;
          this.STO = false;
          this.setScreenIndicators();
        });
    });

    onBtn.addEventListener("click", () => {
      if (this.ON && this.SecF) {
        this.toggleOn();
        return;
      }

      if (this.ON && this.SecF === false) {
        this.clearScreen();
        return;
      }

      this.setScreenIndicators();
      this.toggleOn();
    });

    secFBtn.addEventListener("click", () => {
      if (this.ON) this.toggleSecF();
    });

    alphaBtn.addEventListener("click", () => {
      if (this.ON) this.toggleAlpha();
    });
  }

  processBtnData(data: string){
    switch (data) {
      case "=": {
        //dont calculate with => present on the screen
        if (
          this.screen.screenWriter.textContent.includes("=>") ||
          this.screen.screenWriter.textContent.trim() === ""
        )
          return;

        const expr = this.screen.screenWriter.textContent;
        try {
          const scope = {
            A: this.A,
            B: this.B,
            C: this.C,
            D: this.D,
            E: this.E,
            F: this.F,
            X: this.X,
            Y: this.Y,
            ANS: this.ANS,
          };

         const ans = calculate(expr, scope);
          this.ANS = ans;
          this.screen.writeToScreenANS(ans);
          this.screen.screenWriter.innerHTML = "";
        
          
        } catch (e) {
          this.screen.writeToScreenANS("error");
          console.log(e);
        }
        break;
      }
      case "←": {
        this.screen.navigate(-1);
        break;
      }
      case "→": {
        this.screen.navigate(1);
        break;
      }
      case "del": {
        this.screen.del();
        break;
      }
      case "STO": {
        this.toggleSTO();
        break;
      }
      default: {
        const variablesProcessed = this.processVariableData(data);
        if (!variablesProcessed) {
          this.screen.addToScreen(data);
        }
        break;
      }
    }
  }

  reset(): void {
    this.A = 0;
    this.B = 0;
    this.C = 0;
    this.D = 0;
    this.E = 0;
    this.F = 0;
    this.X = 0;
    this.Y = 0;
    this.ANS = 0;
    this.history = [];
    this.ON = false;
    this.SecF = false;
    this.Alpha = false;
    this.STO = false;
    this.isRad = true;
    this.screen = new Screen();
  }

  toggleOn(): void {
    this.ON = !this.ON;
    //add event................................
    if (this.ON) {
      this.screen.turnON();
      return;
    }
    this.screen.clearIndicators();
    this.reset();
  }

  clearScreen() {
    if (this.SecF === false && this.ON) {
      this.screen.Clear();
      this.screen.turnON();
    }
  }

  toggleSecF(): void {
    this.SecF = !this.SecF;
    if (this.SecF) {
      this.Alpha = false;
    }

    this.setScreenIndicators();
  }

  toggleSTO(): void {
    this.STO = !this.STO;

    this.setScreenIndicators();
  }

  setScreenIndicators() {
    this.screen.setIndicators({
      secf: this.SecF,
      alpha: this.Alpha,
      STO: this.STO,
      rad: this.isRad,
    });
  }

  processVariableData(data: string): boolean {
    const vars = ["A", "B", "C", "D", "E", "F", "X", "Y", "M"];
    const res = vars.find((v) => v === data);
    if (res) {
      return this.storeVariable(data);
    }

    return false;
  }

  storeVariable(variableName: string): boolean {
    const screenValueValid: boolean =
      this.screen.screenWriter.innerHTML !== "" &&
      this.screen.screenWriter.innerHTML.split(" ").length === 1;
    let val: number = 0;
    if (!this.STO) return false;

    console.log(
      this.screen.screenWriter.innerHTML,
      this.screen.screenAns.innerHTML
    );
    if (screenValueValid) {
      val = calculate(this.screen.screenWriter.innerHTML, {});
    } else if (this.screen.screenAns.textContent !== "") {
      val = calculate(this.screen.screenAns.innerHTML, {});
    } else {
      return false;
    }

    this[variableName] = val | 0;
    this.screen.Clear();
    this.screen.addToScreen(`${val | 0}=>${variableName}`);
    return true;
  }

  toggleAlpha(): void {
    this.Alpha = !this.Alpha;
    if (this.Alpha) {
      this.SecF = false;
    }

    this.setScreenIndicators();
  }
}

export default Calculator;
