import { createContext, useContext } from "react";

interface AudioContextData {
    backgroundVolume: number,
    soundEffectVolume: number,

    backgroundMuted: boolean,
    soundEffectsMuted: boolean,

    currentBackgroundVolume: number;
    currentSoundEffectVolume: number;

    setBackgroundVolume: (volume: number) => void,
    setSoundEffectVolume: (volume: number) => void,

    setBackgroundMuted: (muted: boolean) => void,
    setSoundEffectsMuted: (muted: boolean) => void,
}

export const AudioContext = createContext<AudioContextData | undefined>(
    undefined,
);

export function useAudio() {
    const context = useContext(AudioContext);

    if(!context) {
        throw new Error("useAudio deve ser usado dentro de um AudioProvider");
    }

    return context;
}