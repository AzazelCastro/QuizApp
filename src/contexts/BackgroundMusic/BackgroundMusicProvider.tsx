import { ReactNode, useEffect, useState } from "react";
import { AudioSource, useAudioPlayer } from "expo-audio";

import { BackgroundMusicContext } from "./BackgroundMusicContext";
import { useAudioSettings } from "@/contexts/AudioSettings/AudioSettingsContext";

interface BackgroundMusicProviderProps {
    children: ReactNode;
}

export function BackgroundMusicProvider({ children }: BackgroundMusicProviderProps) {
    const { currentBackgroundVolume } = useAudioSettings();
    const [currentTrackSource, setCurrentTrackSource] = useState<AudioSource | null>(null);

    const backgroundPlayer = useAudioPlayer(currentTrackSource);

    useEffect(() => {
        if (backgroundPlayer) {
            backgroundPlayer.volume = currentBackgroundVolume;
        }
    }, [backgroundPlayer, currentBackgroundVolume]);

    useEffect(() => {
        if (backgroundPlayer && currentTrackSource) {
            backgroundPlayer.loop = true;
            backgroundPlayer.play();
        }
    }, [backgroundPlayer, currentTrackSource]);

    const playBackgroundTrack = (source: AudioSource) => {
        if (currentTrackSource !== source) {
            setCurrentTrackSource(source);
        } else if (backgroundPlayer && !backgroundPlayer.playing) {
            backgroundPlayer.play();
        }
    };

    const stopBackgroundTrack = () => {
        if (backgroundPlayer && backgroundPlayer.playing) {
            try {
                backgroundPlayer.pause();
            } catch {
                
            }
        }
    };

    return (
        <BackgroundMusicContext.Provider
            value={{
                playBackgroundTrack,
                stopBackgroundTrack,
            }}
        >
            {children}
        </BackgroundMusicContext.Provider>
    );
}