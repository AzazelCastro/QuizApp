import AudioSettingsController from "./components/AudioSettingsController";
import { ReactNode, useMemo, useState } from "react";
import { AudioSettingsContext } from "./AudioSettingsContext";

interface AudioSettingsProviderProps {
	children: ReactNode;
}

export function AudioSettingsProvider({
	children,
}: AudioSettingsProviderProps) {
	const [backgroundVolume, setBackgroundVolume] = useState(1);
	const [soundEffectVolume, setSoundEffectVolume] = useState(1);

	const [backgroundMuted, setBackgroundMuted] = useState(false);
	const [soundEffectsMuted, setSoundEffectsMuted] = useState(false);

	const currentBackgroundVolume = backgroundMuted ? 0 : backgroundVolume;

	const currentSoundEffectVolume = soundEffectsMuted ? 0 : soundEffectVolume;

	const value = useMemo(
		() => ({
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
		}),
		[
			backgroundVolume,
			soundEffectVolume,
			backgroundMuted,
			soundEffectsMuted,
			currentBackgroundVolume,
			currentSoundEffectVolume,
		],
	);

	return (
		<AudioSettingsContext.Provider value={value}>
			<AudioSettingsController />
			{children}
		</AudioSettingsContext.Provider>
	);
}
