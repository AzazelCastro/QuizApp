import theme from "@/theme";
import Slider from "@react-native-community/slider";
import Ionicons, {
	type IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

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
