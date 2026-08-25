import { createContext, useContext } from "react";

interface AudioSettingsContextData {
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

export const AudioSettingsContext = createContext<AudioSettingsContextData | undefined>(
    undefined,
);

export function useAudioSettings() {
    const context = useContext(AudioSettingsContext);

    if(!context) {
        throw new Error("useAudioSettings deve ser usado dentro de um AudioSettingsProvider");
    }

    return context;
}