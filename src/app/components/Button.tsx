import { StyleSheet, Text, TouchableHighlight, ViewStyle } from "react-native";
import { theme, ThemeColor } from "../theme";

interface props {
	onPress: () => void;
	title: string;
	color?: ThemeColor;
	underlayColor?: ThemeColor;
	textColor?: ThemeColor;
	disabled?: boolean;
    style?: ViewStyle;
}
// todo: add size "xl", "md"
export function Button({
	onPress,
	title,
	color = "primary",
	underlayColor = "primaryDark",
	textColor = "text",
	disabled = false,
    style 
}: props) {
	return (
		<TouchableHighlight
			style={[
				styles.button,
				{ backgroundColor: theme.colors[color] },
				disabled && styles.disabled,
                style
			]}
			onPress={onPress}
			disabled={disabled}
			underlayColor={theme.colors[underlayColor]}
		>
			<Text style={[styles.text, { color: theme.colors[textColor] }]}>
				{title}
			</Text>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 30,
	},
	text: {
		color: "#eef2f6",
		fontSize: 18,
		fontWeight: "600",
        textAlign: "center"
	},
	disabled: {
		backgroundColor: theme.colors.muted,
	},
});
