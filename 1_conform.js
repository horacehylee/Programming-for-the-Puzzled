//@ts-check

/**
 *
 * @param {string[]} caps
 */
export const pleaseConformV1 = caps => {
  let start = 0;
  let forward = 0;
  let backward = 0;
  const intervals = [];

  for (let i = 0; i < caps.length; i++) {
    if (caps[i] != caps[start]) {
      intervals.push({ start: start, end: i - 1, type: caps[start] });

      if (caps[start] === "F") {
        forward++;
      } else {
        backward++;
      }
      start = i;
    }
  }

  // Last element
  intervals.push({ start: start, end: caps.length - 1, type: caps[start] });
  if (caps[start] === "F") {
    forward++;
  } else {
    backward++;
  }

  let flip = forward < backward ? "F" : "B";
  return intervals.filter(interval => interval.type === flip);
};

/**
 *
 * @param {string[]} caps
 */
export const pleaseConformV2 = caps => {
  let start = 0;
  let forward = 0;
  let backward = 0;
  const intervals = [];

  caps = [...caps, "END"];

  for (let i = 0; i < caps.length; i++) {
    if (caps[i] != caps[start]) {
      intervals.push({ start: start, end: i - 1, type: caps[start] });

      if (caps[start] === "F") {
        forward++;
      } else {
        backward++;
      }
      start = i;
    }
  }

  let flip = forward < backward ? "F" : "B";
  return intervals.filter(interval => interval.type === flip);
};

/**
 *
 * @param {string[]} caps
 */
export const pleaseConformOnePass = caps => {
  caps = [...caps, caps[0]];
  const intervals = [];
  let start = 0;
  for (let i = 1; i < caps.length; i++) {
    if (caps[i] != caps[i - 1]) {
      if (caps[i] != caps[0]) {
        start = i;
      } else {
        intervals.push({ start: start, end: i - 1, type: caps[i - 1] });
      }
    }
  }
  return intervals;
};
