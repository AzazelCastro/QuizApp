import AudioSettingsController from "@/app/components/AudioSettingsProvider/AudioSettingsController";
import { ReactNode, useState } from "react";
import { AudioSettingsContext } from "./AudioSettingsContext";

interface AudioSettingsProviderProps {
	children: ReactNode;
}

export function AudioSettingsProvider({ children }: AudioSettingsProviderProps) {
	const [backgroundVolume, setBackgroundVolume] = useState(1);
	const [soundEffectVolume, setSoundEffectVolume] = useState(1);

	const [backgroundMuted, setBackgroundMuted] = useState(false);
	const [soundEffectsMuted, setSoundEffectsMuted] = useState(false);

	const currentBackgroundVolume = backgroundMuted ? 0 : backgroundVolume;

	const currentSoundEffectVolume = soundEffectsMuted ? 0 : soundEffectVolume;

	return (
		<AudioSettingsContext.Provider
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
			<AudioSettingsController />
			{children}
		</AudioSettingsContext.Provider>
	);
}
