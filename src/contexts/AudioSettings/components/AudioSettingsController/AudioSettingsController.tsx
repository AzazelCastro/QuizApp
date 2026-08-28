import Ionicons, {
	type IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { useAudioSettings } from "../../AudioSettingsContext";
import theme from "@/theme";
import Control from "./Control";
import { styles } from "./styles";

export default function AudioSettingsController() {
	const {
		backgroundVolume,
		soundEffectVolume,
		backgroundMuted,
		soundEffectsMuted,
		setBackgroundVolume,
		setSoundEffectVolume,
		setBackgroundMuted,
		setSoundEffectsMuted,
		currentBackgroundVolume,
		currentSoundEffectVolume,
	} = useAudioSettings();

	const [visible, setVisible] = useState(false);

	const getVolumeIcon = (volume: number): IoniconsIconName =>
		volume === 0
			? "volume-mute"
			: volume <= 0.33
				? "volume-low"
				: volume <= 0.66
					? "volume-medium"
					: "volume-high";

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => setVisible(!visible)}
				style={styles.fab}
			>
				<Ionicons
					name={getVolumeIcon(
						Math.max(currentBackgroundVolume, currentSoundEffectVolume),
					)}
					size={28}
					color={theme.colors.text}
				/>
			</Pressable>

			<Modal
				visible={visible}
				onRequestClose={() => setVisible(!visible)}
				transparent
				animationType="fade"
			>
				<Pressable
					style={styles.modal}
					onPress={() => setVisible(!visible)}
				>
					<Pressable
						style={styles.panel}
						onPress={(event) => event.stopPropagation()}
					>
						<Text style={styles.title}>Áudio</Text>

						<Control
							volume={backgroundVolume}
							setVolume={setBackgroundVolume}
							currentVolume={currentBackgroundVolume}
							muted={backgroundMuted}
							setMuted={setBackgroundMuted}
							volumeIcon={getVolumeIcon(currentBackgroundVolume)}
							label="Música"
						/>

						<Control
							volume={soundEffectVolume}
							setVolume={setSoundEffectVolume}
							currentVolume={currentSoundEffectVolume}
							muted={soundEffectsMuted}
							setMuted={setSoundEffectsMuted}
							volumeIcon={getVolumeIcon(currentSoundEffectVolume)}
							label="Efeitos"
						/>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
}
