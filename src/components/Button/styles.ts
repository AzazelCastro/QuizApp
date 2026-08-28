import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

export const buttonSizeStyles = {
	xl: styles.buttonXl,
	md: styles.buttonMd,
	xs: styles.buttonXs,
};

export const textSizeStyles = {
	xl: styles.textXl,
	md: styles.textMd,
	xs: styles.textXs,
};
