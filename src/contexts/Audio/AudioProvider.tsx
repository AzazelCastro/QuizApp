import { ReactNode, useState } from "react";
import { AudioContext } from "./AudioContext";
import AudioController from "@/components/AudioProvider/AudioController"

interface AudioProviderProps {
    children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
    const [backgroundVolume, setBackgroundVolume] = useState(1);
    const [soundEffectVolume, setSoundEffectVolume] = useState(1);

    const [backgroundMuted, setBackgroundMuted] = useState(false);
    const [soundEffectsMuted, setSoundEffectsMuted] = useState(false);

    return(
        <AudioContext.Provider
            value={{
                backgroundVolume,
                soundEffectVolume,
                backgroundMuted,
                soundEffectsMuted,
                setBackgroundVolume,
                setSoundEffectVolume,
                setBackgroundMuted,
                setSoundEffectsMuted,
            }}
        >
            <AudioController />
            {children}
        </AudioContext.Provider>
    );
}