import AudioController from "@/components/AudioProvider/AudioController";
import { ReactNode, useState } from "react";
import { AudioContext } from "./AudioContext";

interface AudioProviderProps {
	children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
	const [backgroundVolume, setBackgroundVolume] = useState(1);
	const [soundEffectVolume, setSoundEffectVolume] = useState(1);

	const [backgroundMuted, setBackgroundMuted] = useState(false);
	const [soundEffectsMuted, setSoundEffectsMuted] = useState(false);

	const currentBackgroundVolume = backgroundMuted ? 0 : backgroundVolume;

	const currentSoundEffectVolume = soundEffectsMuted ? 0 : soundEffectVolume;

	return (
		<AudioContext.Provider
			value={{
				backgroundVolume,
				soundEffectVolume,
				backgroundMuted,
				soundEffectsMuted,
				currentBackgroundVolume,
				currentSoundEffectVolume,
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
