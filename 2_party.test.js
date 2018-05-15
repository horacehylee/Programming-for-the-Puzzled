import { bestTimeToPartyOptimize as bestTimeToParty } from "./2_party";

describe("Best time to party", () => {
  it("should return best time to party", () => {
    const schedules = [
      { arrive: 6, depart: 8 },
      { arrive: 6, depart: 12 },
      { arrive: 6, depart: 7 },
      { arrive: 7, depart: 8 },
      { arrive: 7, depart: 10 },
      { arrive: 8, depart: 9 },
      { arrive: 8, depart: 10 },
      { arrive: 9, depart: 12 },
      { arrive: 9, depart: 10 },
      { arrive: 10, depart: 11 },
      { arrive: 10, depart: 12 },
      { arrive: 11, depart: 12 }
    ];
    const bestTime = bestTimeToParty(schedules);
    expect(bestTime).toEqual({ arrive: 9, numCelebrities: 5 });
  });

  it("should also works with fractional time", () => {
    const schedules = [
      { arrive: 6.0, depart: 8.0 },
      { arrive: 6.5, depart: 12.0 },
      { arrive: 6.5, depart: 7.0 },
      { arrive: 7.0, depart: 8.0 },
      { arrive: 7.5, depart: 10.0 },
      { arrive: 8.0, depart: 9.0 },
      { arrive: 8.0, depart: 10.0 },
      { arrive: 9.0, depart: 12.0 },
      { arrive: 9.5, depart: 10.0 },
      { arrive: 10.0, depart: 11.0 },
      { arrive: 10.0, depart: 12.0 },
      { arrive: 11.0, depart: 12.0 }
    ];
    const bestTime = bestTimeToParty(schedules);
    expect(bestTime).toEqual({ arrive: 9.5, numCelebrities: 5 });
  });
});
