import Slider, { SliderProps } from "@react-native-community/slider";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAudio } from "@/contexts/Audio/AudioContext";
import { theme } from "@/theme";

export default function AudioController() {
	const {
		backgroundVolume,
		soundEffectVolume,
		backgroundMuted,
		soundEffectsMuted,
		setBackgroundVolume,
		setSoundEffectVolume,
		setBackgroundMuted,
		setSoundEffectsMuted,
	} = useAudio();

	const [visible, setVisible] = useState(false);

	const backgroundCurrentVolume = backgroundMuted ? 0 : backgroundVolume;

	const soundEffectCurrentVolume = soundEffectsMuted ? 0 : soundEffectVolume;

	function getVolumeIcon(volume: number) {
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
						Math.max(backgroundCurrentVolume, soundEffectCurrentVolume),
					)}
					size={28}
					color={theme.colors.text}
				/>
			</Pressable>

			{visible && (
				<View style={styles.panel}>
					<Text style={styles.title}>Áudio</Text>

					<View style={styles.control}>
						<Pressable
							onPress={() => setBackgroundMuted(!backgroundMuted)}
							style={styles.iconButton}
						>
							<Ionicons
								name={getVolumeIcon(backgroundCurrentVolume)}
								size={24}
								color={theme.colors.text}
							/>
						</Pressable>

						<View style={styles.sliderContainer}>
							<Text style={styles.label}>Música</Text>

							<Slider
								minimumValue={0.0}
								maximumValue={1.0}
								step={0.1}
								value={backgroundVolume}
								onValueChange={setBackgroundVolume}
								style={styles.slider}
							/>

						</View>
					</View>

					<View style={styles.control}>
						<Pressable
							onPress={() => setSoundEffectsMuted(!soundEffectsMuted)}
							style={styles.iconButton}
						>
							<Ionicons
								name={getVolumeIcon(soundEffectCurrentVolume)}
								size={24}
								color={theme.colors.text}
							/>
						</Pressable>

						<View style={styles.sliderContainer}>
							<Text style={styles.label}>Efeitos</Text>

							<Slider
								minimumValue={0.0}
								maximumValue={1.0}
								value={soundEffectVolume}
								onValueChange={setSoundEffectVolume}
								style={styles.slider}
							/>
						</View>
					</View>
				</View>
			)}


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
        position: "relative",
		width: 52,
		height: 52,
		borderRadius: 26,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.backgroundDark,
	},

	panel: {
        position: "relative",
        top: 0,
        marginTop: 10,
        width: 280,
        padding: 16,
        borderRadius: 12,
        backgroundColor: theme.colors.backgroundDark,
	},

	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: 15,
	},

	control: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},

	iconButton: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},

	sliderContainer: {
		flex: 1,
		marginLeft: 8,
	},

	label: {
		color: theme.colors.text,
		marginBottom: 2,
	},

	slider: {
		width: "100%",
		height: 30,
	},
});
