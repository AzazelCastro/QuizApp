import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AudioSource, useAudioPlayer } from "expo-audio";

import { BackgroundMusicContext } from "./BackgroundMusicContext";
import { useAudioSettings } from "@/contexts/AudioSettings";

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

    const playBackgroundTrack = useCallback((source: AudioSource) => {
        if (currentTrackSource !== source) {
            setCurrentTrackSource(source);
        } else if (backgroundPlayer && !backgroundPlayer.playing) {
            backgroundPlayer.play();
        }
    }, [currentTrackSource, backgroundPlayer]);

    const stopBackgroundTrack = useCallback(() => {
        if (backgroundPlayer) {
            try {
                backgroundPlayer.pause();
            } catch {
                
            }
        }
    }, [backgroundPlayer]);

    const value = useMemo(
        () => ({
            playBackgroundTrack,
            stopBackgroundTrack,
        }),
        [playBackgroundTrack, stopBackgroundTrack]
    );

    return (
        <BackgroundMusicContext.Provider
            value={value}
        >
            {children}
        </BackgroundMusicContext.Provider>
    );
}