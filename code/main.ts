import { k } from "./kaboom";
import { ws } from "./ws";
import {mainMenu} from './scenes/mainMenu';
import {characterSelect} from './scenes/characterSelect';
import {battle} from './scenes/battle';

const { loadSprite, scene, go } = k;

// Load assets
loadSprite("character-select-bg", "sprites/bg/character-select.png");
loadSprite("main-menu-bg", "sprites/bg/main-menu.png");
loadSprite("battle-bg", "sprites/bg/battle.png");
loadSprite("mozart", "sprites/composers/mozart.png");
loadSprite("beethoven", "sprites/composers/beethoven.png");
loadSprite("button-right", "sprites/ui/button-right.png");
loadSprite("button-left", "sprites/ui/button-left.png");

// Register scenes
scene('mainMenu', mainMenu);
scene('characterSelect', characterSelect);
scene('battle', battle);

go('battle', { composerName: "mozart" });
go('characterSelect');
// go('mainMenu');
