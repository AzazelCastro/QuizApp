import Ionicons, {
	type IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useAudioSettings } from "@/contexts/AudioSettings/AudioSettingsContext";
import { theme } from "@/theme";
import Control from "./Control";

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

	function getVolumeIcon(volume: number): IoniconsIconName {
		if (volume === 0) {
			return "volume-mute";
		}

		if (volume <= 0.33) {
			return "volume-low";
		}

		if (volume <= 0.66) {
			return "volume-medium";
		}

		return "volume-high";
	}

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

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 50,
		left: 15,
		zIndex: 1000,
	},

	fab: {
		position: "absolute",
		width: 52,
		height: 52,
		borderRadius: 26,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.backgroundDark,
	},

	panel: {
		position: "absolute",
		top: 100,
		left: 15,
		marginTop: 10,
		width: 280,
		padding: 16,
		borderRadius: 12,
		backgroundColor: theme.colors.backgroundDark,
		zIndex: 1,
	},

	modal: {
		flex: 1,
		backgroundColor: "transparent",
	},

	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: 15,
	},
});
