import { k } from "./kaboom";
import {mainMenu} from './scenes/mainMenu';

// Register scenes
k.scene('mainMenu', mainMenu);

k.go('mainMenu');
