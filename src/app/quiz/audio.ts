import { preload } from "expo-audio";

export const correctSoundSource = require("@/assets/sounds/correct.mp3");
export const incorrectSoundSource = require("@/assets/sounds/incorrect.mp3");

preload(correctSoundSource);
preload(incorrectSoundSource);