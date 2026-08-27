import { theme } from "@/app/theme";
import Slider from "@react-native-community/slider";
import Ionicons, {
    type IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ControlProps {
	volume: number;
	setVolume: (volume: number) => void;

	currentVolume: number;

	muted: boolean;
	setMuted: (muted: boolean) => void;

	volumeIcon: IoniconsIconName;

	label: string;
}

export default function Control({
	volume,
	setVolume,
	muted,
	setMuted,
	currentVolume,
	volumeIcon,
	label,
}: ControlProps) {
	return (
		<View style={styles.control}>
			<Pressable
				onPress={() => setMuted(!muted)}
				style={styles.iconButton}
			>
				<Ionicons
					name={volumeIcon}
					size={24}
					color={theme.colors.text}
				/>
			</Pressable>

			<View style={styles.sliderContainer}>
				<Text style={styles.label}>
					{label}: {Math.round(currentVolume * 100)}%{" "}
				</Text>

				<Slider
					minimumValue={0.0}
					maximumValue={1.0}
					value={volume}
					onSlidingComplete={setVolume}
					style={styles.slider}
					thumbTintColor={muted ? theme.colors.muted : theme.colors.primary}
					minimumTrackTintColor={
						muted ? theme.colors.muted : theme.colors.primary
					}
					maximumTrackTintColor={theme.colors.surface}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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