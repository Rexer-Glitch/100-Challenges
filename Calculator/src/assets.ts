import Textbox from "./textbox";

export const screenIndicators = document.querySelector(".screen .indicators") as HTMLDivElement;
export const screenAnswer = document.querySelector(".screen .ans") as HTMLDivElement;
export const buttons = document.querySelector(".operationContainer") as HTMLDivElement;
export const onBtn = document.querySelector(".onBtn") as HTMLButtonElement;
export const secFBtn = document.querySelector(".sec-btn") as HTMLButtonElement;
export const alphaBtn = document.querySelector(".alphaBtn") as HTMLButtonElement;





export const screen =  new Textbox({
    background: "none",
    width: "100%",
    height: "calc(50% - 7px",
    border: "none",
    padding: "2px 0"

}, document.querySelector(".screen .textbox"));