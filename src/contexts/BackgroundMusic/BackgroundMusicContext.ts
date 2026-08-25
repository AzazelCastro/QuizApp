import { AudioSource } from "expo-audio";
import { createContext, useContext } from "react";

interface BackgroundMusicContextData {
	playBackgroundTrack: (source: AudioSource) => void;
	stopBackgroundTrack: () => void;
}

export const BackgroundMusicContext = createContext<
	BackgroundMusicContextData | undefined
>(undefined);

export function useBackgroundMusicContext() {
	const context = useContext(BackgroundMusicContext);

	if (!context) {
		throw new Error(
			"useBackgroundMusicContext deve ser usado dentro de um BackgroundMusicProvider",
		);
	}

	return context;
}
