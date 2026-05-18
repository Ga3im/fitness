export const timeHHMMSS = (time: number): string => {
  let hour;
  let HH;
  if (time >= 3600) {
    hour = Math.floor(time / 3600);
    HH = hour.toString().padStart(2, "0");
  }
  let min = Math.floor((time / 60) % 60);
  let sec = time % 60;

  let MM = min.toString().padStart(2, "0");
  let SS = sec.toString().padStart(2, "0");
  return time >= 3600 ? `${HH}:${MM}:${SS}` : `${MM}:${SS}`;
};

// export const swapElements = (arr, swapEl) => {
//   let lastValue = swapEl;
//   for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];

//   }
// };

export const sortArray = (a: number, b: number): number => {
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
};
