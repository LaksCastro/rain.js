export type Utils = {
  randomInt: (min: number, max: number) => number;
};

export default function Utils(): Utils {
  function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const self: Utils = {
    randomInt,
  };

  return Object.freeze(self);
}
