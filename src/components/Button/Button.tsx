import { theme, ThemeColor } from "@/theme";
import { Text, TouchableHighlight, ViewStyle } from "react-native";
import { buttonSizeStyles, styles, textSizeStyles } from "./styles";

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
