import { preload } from "expo-audio";

export const badResultSoundSource = require("@/assets/sounds/bad-result.mp3");
export const goodResultSoundSource = require("@/assets/sounds/good-result.mp3");
export const backgroundSoundSource = require("@/assets/sounds/result-background.mp3")

preload(badResultSoundSource);
preload(goodResultSoundSource);
preload(backgroundSoundSource);