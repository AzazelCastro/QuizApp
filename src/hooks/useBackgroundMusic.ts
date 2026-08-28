import { AudioSource } from "expo-audio";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { useBackgroundMusicContext } from "@/contexts/BackgroundMusic";

export default function useBackgroundMusic(
	source: AudioSource,
	shouldPlay: boolean = true,
) {
	const { playBackgroundTrack, stopBackgroundTrack } =
		useBackgroundMusicContext();

	useFocusEffect(
		useCallback(() => {
			if (shouldPlay) {
				playBackgroundTrack(source);
			}

			return () => {
				stopBackgroundTrack();
			};
		}, [source, shouldPlay, playBackgroundTrack, stopBackgroundTrack]),
	);
}
