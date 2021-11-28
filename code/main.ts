import { k } from "./kaboom";

// load assets
k.loadSprite("bean", "sprites/bean.png");

// add a character to screen
k.add([
	// list of components
	k.sprite("bean"),
	k.pos(80, 40),
	k.area(),
]);
