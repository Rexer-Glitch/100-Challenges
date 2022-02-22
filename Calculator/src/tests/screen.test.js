import {
  trimAll,
  isOperatorsFollowing,
  formatExpression,
  removeFollowingOperators,
  removeIsolatedOperators,
} from "../screen.helper";

it("checking if [trimAll] function removes all whitespaces", () => {
  expect(trimAll("3 + 4    = 7")).toBe("3+4=7");
  expect(trimAll("     ")).toBe("");
  expect(trimAll("300    +3 / 2 =  4")).toBe("300+3/2=4");
});

it("checking if [isOperatorsFollowing] function detect following operators", () => {
  expect(isOperatorsFollowing("++")).toBe(true);
  expect(isOperatorsFollowing("+ 3 -")).toBe(false);
  expect(isOperatorsFollowing("+     * = 4")).toBe(true);
  expect(isOperatorsFollowing("2+3/4=4")).toBe(false);
});

it("checking if [formatExpression] function correctly format math expression", () => {
  expect(formatExpression("3 +  4= 10")).toBe("3 + 4 = 10");
  expect(formatExpression("3 + + 4 = 10")).toBe("3 + 4 = 10");
  expect(formatExpression("3 + + 4 = 10+")).toBe("3 + 4 = 10 +");
  expect(formatExpression("3  +sin(3+4) / 3 = 4")).toBe(
    "3 + sin(3 + 4) / 3 = 4"
  );
});

it("checking if [isOperatorsFollowing] function detect following operators", () => {
  expect(removeFollowingOperators("++")).toBe("+");
  expect(removeFollowingOperators("+ 3 -")).toBe("+ 3 -");
  expect(removeFollowingOperators("+   *= 4")).toBe("+= 4");
  expect(removeFollowingOperators("2+3/4=4")).toBe("2+3/4=4");
});

it("checking if [removeIsolatedOperators] function correctly remove iso operators from the expression", () => {
  expect(removeIsolatedOperators("1")).toBe("1");
  expect(removeIsolatedOperators("1 + ")).toBe("1");
  expect(removeIsolatedOperators("+ 1")).toBe("1");
  expect(removeIsolatedOperators("sin( + 3)")).toBe("sin(3)");
  expect(removeIsolatedOperators("sin( + 3cos(2 - ))")).toBe("sin(3cos(2))");
  expect(removeIsolatedOperators("(3 + ) + 2")).toBe("3 + 2");
  expect(removeIsolatedOperators("(3 + 4 / ) + 2")).toBe("(3 + 4) + 2");
});
