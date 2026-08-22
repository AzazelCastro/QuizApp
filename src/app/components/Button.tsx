import { StyleSheet, Text, TouchableHighlight, ViewStyle } from "react-native";
import { theme, ThemeColor } from "../theme";

type SizeTypes = "xl" | "md" | "xs";

interface props {
	onPress: () => void;
	title: string;
	color?: ThemeColor;
	underlayColor?: ThemeColor;
	textColor?: ThemeColor;
	disabled?: boolean;
	style?: ViewStyle;
	size?: SizeTypes;
}

export default function Button({
	onPress,
	title,
	color = "primary",
	underlayColor = "primaryDark",
	textColor = "text",
	disabled = false,
	style,
	size = "xl",
}: props) {
	return (
		<TouchableHighlight
			style={[
				style,
				{ backgroundColor: theme.colors[color] },
				disabled && styles.disabled,
				styles.button,
				buttonSizeStyles[size],
			]}
			onPress={onPress}
			disabled={disabled}
			underlayColor={theme.colors[underlayColor]}
		>
			<Text
				style={[
					styles.text,
					{ color: theme.colors[textColor] },
					textSizeStyles[size],
				]}
			>
				{title}
			</Text>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 30,
	},
	buttonXl: {
		paddingHorizontal: 30,
		paddingVertical: 15,
	},
	buttonMd: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	buttonXs: {
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	text: {
		color: theme.colors.text,
		fontWeight: "600",
		textAlign: "center",
	},
	textXl: {
		fontSize: 18,
	},
	textMd: {
		fontSize: 16,
	},
	textXs: {
		fontSize: 14,
	},
	disabled: {
		backgroundColor: theme.colors.muted,
	},
});

const buttonSizeStyles = {
	xl: styles.buttonXl,
	md: styles.buttonMd,
	xs: styles.buttonXs,
};

const textSizeStyles = {
	xl: styles.textXl,
	md: styles.textMd,
	xs: styles.textXs,
};