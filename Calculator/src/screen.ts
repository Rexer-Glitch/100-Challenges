import { screen, screenIndicator, screenAnswer } from "./assets";
import { del } from "./screen.helper";
import { clamp } from "./util";

interface indicators {
  secf: boolean;
  alpha: boolean;
  STO: boolean;
  rad: boolean;
}

class Screen {
  #cursorPosition: number;
  screenWriter: HTMLDivElement;
  screenAns: HTMLDivElement;
  constructor() {
    this.screenWriter = screen;
    this.screenAns = screenAnswer;
    this.Clear();
  }

  get CursorPosition() {
    return this.#cursorPosition;
  }

  set CursorPosition(value: number) {
    this.#cursorPosition = clamp(value, 0, screen.innerHTML.length);
  }

  writeToScreenANS(ans: string | number) {
    screenAnswer.textContent = String(ans);
  }

  Clear() {
    screenAnswer.textContent = "";
    screen.innerHTML = "";
    this.CursorPosition = 0;
  }

  clearIndicators() {
    screenIndicator.innerHTML = "";
  }

  turnON() {
    screenAnswer.textContent = "0";
  }

  del() {
    const delObj = del(screen.innerHTML, this.CursorPosition);
    screen.innerHTML = delObj.text;

    if (delObj.count > 1) {
      this.CursorPosition -= delObj.count;
      this.setCursor(this.CursorPosition);
    } else {
      this.setCursor(this.CursorPosition);
      this.CursorPosition -= delObj.count;
    }
  }

  setIndicators(opt: indicators): void {
    let data = "";
    let optKeys = Object.keys(opt);
    for (let i = 0; i < optKeys.length; i++) {
      data += `<span>${opt[optKeys[i]] ? optKeys[i] : ""}</span>`;
    }

    screenIndicator.innerHTML = data
      .replace("secf", "<b>S</b>")
      .replace("alpha", "<b>A</b>")
      .toUpperCase();
  }

  setAnswer(ans: number): void {
    screenAnswer.innerHTML = String(ans);
  }

  addToScreen(text: string): void {
    this.#handleBrackets(text);
    this.setCursor(this.CursorPosition);
  }

  navigate(direction: number = 1): void {
    this.CursorPosition += direction / Math.abs(direction);
    this.setCursor(this.CursorPosition);
  }

  #handleBrackets(text: string) {
    let index = text.indexOf("(");
    if (index >= 0 && index + 1 < text.length && text[index + 1] === ")") {
      this.#appendToScreen(text);
      this.CursorPosition = screen.textContent.lastIndexOf("(") + 1;
    } else {
      this.#appendToScreen(text);
      this.CursorPosition += text.length;
    }
  }

  #appendToScreen(text: string): void {
    //clear the previous variable change
    if(screen.textContent.includes("=>"))this.Clear();

    let value = screen.innerHTML;
    let start = value.slice(0, this.CursorPosition);
    let end = value.slice(this.CursorPosition, value.length);

    screen.innerHTML = start + text + end;

    screen.scrollLeft = screen.scrollWidth;
  }

  setCursor(pos: number) {
    var tag = screen;

    var setpos = document.createRange();

    var set = window.getSelection();

    setpos.setStart(tag.childNodes[0], pos);

    setpos.collapse(true);

    set.removeAllRanges();

    set.addRange(setpos);

    tag.focus();
  }
}

export default Screen;
