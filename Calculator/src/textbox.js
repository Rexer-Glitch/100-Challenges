class Textbox {
  root = null;
  #container = null;
  #content = null;
  #caret = null;
  #caretPosition = 1;
  #caretIntervalCode = null;
  #styles = {
    base: {
      display: "inline-block",
      background: "white",
      color: "black",
      width: "200px",
      height: "30px",
      border: "1px solid rgba(0,0,0,0.4)",
      borderRadius: "4px",
      padding: "5px",
      cursor: "text",
    },
    container: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
    },
    content: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
    caret: {
      display: "inline",
      width: "1.5px",
      height: "80%",
      background: "grey",
      position: "absolute",
      top: "50%",
      left: "0px",
      transform: "translate(0, -50%)",
    },
  };

  constructor(styles = {}, root = document.querySelector(".textbox")) {
    this.root = root;

    //set style properties
    const pStylesKeys = Object.keys(styles);
    for (let i = 0; i < pStylesKeys.length; i++) {
      if (!this.#styles.base[pStylesKeys[i]]) continue;
      this.#styles.base[pStylesKeys[i]] = styles[pStylesKeys[i]];
    }

    if (styles.caretBackground)
      this.#styles.caret.background = styles.caretBackground;

    this.#init();
  }

  get isCaretVisible() {
    return this.#caret.style.display !== "none";
  }

  set isCaretVisible(value) {
    if (value) {
      this.#caret.style.display = "block";
      //set caret animation
      this.#caretIntervalCode = setInterval(() => {
        this.#caret.style.display =
          this.#caret.style.display === "block" ? "none" : "block";
      }, 600);
    } else {
      this.#caret.style.display = "none";

      //remove caret animation
      if (this.#caretIntervalCode !== null)
        clearInterval(this.#caretIntervalCode);
    }
  }

  get value() {
    let text = "";

    for (let i = 0; i < this.#content.children.length; i++) {
      const data = this.#content.children[i].textContent;
      text += data !== "" ? data : " ";
    }

    return text;
  }

  set value(text) {
    while (this.#content.lastChild !== null) {
      this.#content.removeChild(this.#content.lastChild);
    }

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      this.#content.appendChild(span);
      if (text[i] == " ") {
        span.style.minWidth = "0.5ex";
        continue;
      }
      span.textContent = text[i];
    }

    this.#caretPosition = this.value.length;
    this.#setCaretPosition();
  }

  get caretPosition() {
    return this.#caretPosition;
  }

  set caretPosition(position) {
    this.#caretPosition =
      Math.min(this.value.length, position) === Math.max(0, position)
        ? position
        : this.#caretPosition;
  }

  #init() {
    this.#container = document.createElement("div");
    this.#content = document.createElement("div");
    this.#caret = document.createElement("div");

    this.#container.classList.add("container");
    this.#content.classList.add("content");
    this.#caret.classList.add("caret");

    this.root.appendChild(this.#container);
    this.#container.appendChild(this.#content);
    this.#container.appendChild(this.#caret);

    //apply default styles
    const baseStyles = Object.keys(this.#styles.base);
    for (let i = 0; i < baseStyles.length; i++) {
      this.root.style[baseStyles[i]] = this.#styles.base[baseStyles[i]];
    }

    const contentStyles = Object.keys(this.#styles.content);
    for (let i = 0; i < contentStyles.length; i++) {
      this.#content.style[contentStyles[i]] =
        this.#styles.content[contentStyles[i]];
    }

    const containerStyles = Object.keys(this.#styles.container);
    for (let i = 0; i < containerStyles.length; i++) {
      this.#container.style[containerStyles[i]] =
        this.#styles.container[containerStyles[i]];
    }

    const caretStyles = Object.keys(this.#styles.caret);
    for (let i = 0; i < caretStyles.length; i++) {
      this.#caret.style[caretStyles[i]] = this.#styles.caret[caretStyles[i]];
    }

    //set caret visibility
    this.isCaretVisible = true;
  }

  #setCaretPosition() {
    if (this.#caretPosition === 0) {
      this.#caret.style.transform = `translate(0, -50%)`;
      return;
    }

    const letter = this.#content.children[this.#caretPosition - 1];
    const posX = letter.offsetLeft + letter.clientWidth;
    this.#caret.style.transform = `translate(${posX}px, -50%)`;

    //scroll
    this.#container.scrollLeft = posX - 20;
  }

  moveCaretPosition(dir) {
    this.caretPosition = this.#caretPosition + dir;
    this.#setCaretPosition();
  }

  appendToCaret(text) {
    for (let i = 0; i < text.length; i++) {
      const newLetter = document.createElement("span");

      if (text[i] !== " ") {
        newLetter.textContent = text[i];
      } else {
        newLetter.textContent = "";
        newLetter.style.minWidth = "0.3ex";
      }

      this.#content.insertBefore(
        newLetter,
        this.#content.children[this.#caretPosition]
      );
      this.#caretPosition++;
      this.#setCaretPosition();
    }
  }

  backspace() {
    const letter = this.#content.children[this.#caretPosition - 1];
    if (!letter) return;

    letter.remove();
    this.moveCaretPosition(-1);
  }
}

export default Textbox;
