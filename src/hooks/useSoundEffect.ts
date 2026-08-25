import { useAudioSettings } from "@/contexts/AudioSettings/AudioSettingsContext";
import { AudioSource, useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

export function useSoundEffect(source: AudioSource) {
	const { currentSoundEffectVolume } = useAudioSettings();
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
