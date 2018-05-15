import { pleaseConformOnePass as pleaseConform } from "./1_conform";

describe("please conform", () => {
  it("should conform caps", () => {
    const caps = [
      "F",
      "F",
      "B",
      "B",
      "B",
      "F",
      "B",
      "B",
      "B",
      "F",
      "F",
      "B",
      "F"
    ];
    const intervals = pleaseConform(caps);
    expect(intervals).toEqual([
      { start: 2, end: 4, type: "B" },
      { start: 6, end: 8, type: "B" },
      { start: 11, end: 11, type: "B" }
    ]);
  });

  it("should contains last element to conform", () => {
    const caps = ["F", "F", "B", "B", "B", "F", "B", "B", "B", "F", "F", "B"];
    const intervals = pleaseConform(caps);
    expect(intervals).toEqual([
      { start: 2, end: 4, type: "B" },
      { start: 6, end: 8, type: "B" },
      { start: 11, end: 11, type: "B" }
    ]);
  });

  it("should return empty array if no need conform", () => {
    const caps = ["F", "F"];
    const intervals = pleaseConform(caps);
    expect(intervals).toEqual([]);
  });

  it("should return empty array for empty input", () => {
    const caps = [];
    const intervals = pleaseConform(caps);
    expect(intervals).toEqual([]);
  });
});
