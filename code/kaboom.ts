import kaboom from "kaboom";

const n: number = "5";
console.log(n);

export const k = kaboom({
	width: 960,
	height: 540,
	scale: 1,
	clearColor: [0, 0, 0, 1],
  global: false,
});
