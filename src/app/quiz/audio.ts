import { preload } from "expo-audio";

export const correctSoundSource = require("@/assets/sounds/correct.mp3");
export const incorrectSoundSource = require("@/assets/sounds/incorrect.mp3");
export const backgroundSoundSource = require("@/assets/sounds/quiz-background.mp3");

preload(correctSoundSource);
preload(incorrectSoundSource);
preload(backgroundSoundSource);

// TODO: pesquisar sobre o armazenamento desse preload e se nao há vazamento de memoria, qual o life cycle dele e se ele faz "unload" automático