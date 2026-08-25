import { useEffect } from "react";
import { useAudioPlayer, AudioSource } from "expo-audio";
import { useAudio } from "@/contexts/Audio/AudioContext";

export function useSoundEffect(source: AudioSource) {
    const { currentSoundEffectVolume } = useAudio();
    const sound = useAudioPlayer(source, { downloadFirst: true });

    useEffect(() => {
        sound.volume = currentSoundEffectVolume;
    }, [sound, currentSoundEffectVolume]);

    const play = () => {
        sound.play();
        sound.seekTo(0);
    };

    return { play, sound };
}