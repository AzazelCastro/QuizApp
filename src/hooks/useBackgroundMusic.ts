import { useCallback } from "react";
import { AudioSource } from "expo-audio";
import { useFocusEffect } from "expo-router";

import { useBackgroundMusicContext } from "@/contexts/BackgroundMusic/BackgroundMusicContext";

export function useBackgroundMusic(source: AudioSource, shouldPlay: boolean = true) {
    const { playBackgroundTrack, stopBackgroundTrack } = useBackgroundMusicContext();

    useFocusEffect(
        useCallback(() => {
            if (shouldPlay) {
                playBackgroundTrack(source);
            }

            return () => {
                stopBackgroundTrack();
            };
        }, [source, shouldPlay, playBackgroundTrack, stopBackgroundTrack])
    );
}