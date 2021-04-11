import { calculatePercentage } from "./math";

it("calculates percentage of 20/30 to 67%", () => {
  expect(calculatePercentage(20, 30)).toBe("67%");
});

it("calculates percentage of 100/100 to 100%", () => {
  expect(calculatePercentage(100, 100)).toBe("100%");
});

it("calculates percentage of 0/7 to 100%", () => {
  expect(calculatePercentage(0, 7)).toBe("0%");
});

it("calculates percentage of 10/5 to 200%", () => {
  expect(calculatePercentage(10, 5)).toBe("Invalid input");
});
