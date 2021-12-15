import Evaluate from "../evaluate";

const evaluate = new Evaluate("1", {});

test("evaluate single numbers", ()=> {
    expect(evaluate.parseExpressionElement("1").value).toBe(1);
    expect(evaluate.parseExpressionElement("1.1").value).toBe(1.1);
    expect(evaluate.parseExpressionElement("100").value).toBe(100);
    expect(evaluate.parseExpressionElement("sin(cos(1 + 3))")).toBe({
        type: "function",
        func: "sin",
        funcValue: 1,
        value: null
    });
})