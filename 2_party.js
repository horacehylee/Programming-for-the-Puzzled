//@ts-check

/**
 *
 * @param {{arrive: number, depart: number}[]} schedules
 */
export const bestTimeToParty = schedules => {
  let minTime = Number.MAX_SAFE_INTEGER;
  let maxTime = Number.MIN_SAFE_INTEGER;
  for (let schedule of schedules) {
    minTime = Math.min(schedule.arrive, minTime);
    maxTime = Math.max(schedule.arrive, maxTime);
  }

  let bestTime = { arrive: minTime, numCelebrities: 0 };

  for (let i = minTime; i < maxTime; i++) {
    let numCelebrities = 0;
    for (let schedule of schedules) {
      if (i >= schedule.arrive && i < schedule.depart) {
        numCelebrities++;
      }
    }
    if (numCelebrities > bestTime.numCelebrities) {
      bestTime = { arrive: i, numCelebrities: numCelebrities };
    }
  }
  return bestTime;
};

/**
 *
 * @param {{arrive: number, depart: number}[]} schedules
 */
export const bestTimeToPartyOptimize = schedules => {
  let timeslots = [];
  for (let schedule of schedules) {
    timeslots.push({ time: schedule.arrive, type: "arrive" });
    timeslots.push({ time: schedule.depart, type: "depart" });
  }

  timeslots.sort((a, b) => a.time - b.time);

  let bestTime = { arrive: 0, numCelebrities: 0 };

  let count = 0;

  for (let i = 0; i < timeslots.length; i++) {
    let timeslot = timeslots[i];
    if (timeslot.type === "arrive") {
      count++;
    } else if (timeslot.type === "depart") {
      count--;
    }

    if (
      i + 1 >= timeslots.length ||
      timeslots[i].time != timeslots[i + 1].time
    ) {
      if (count > bestTime.numCelebrities) {
        bestTime = { arrive: timeslot.time, numCelebrities: count };
      }
    }
  }

  return bestTime;
};
