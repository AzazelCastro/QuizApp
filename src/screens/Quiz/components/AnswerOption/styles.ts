import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	option: {
		backgroundColor: theme.colors.backgroundDark,
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		width: "100%",
	},

	selectedOption: {
		borderWidth: 1,
		borderColor: theme.colors.accent,
		backgroundColor: theme.colors.accentDark,
	},

	correctOption: {
		borderWidth: 1,
		borderColor: theme.colors.success,
		backgroundColor: theme.colors.successDark,
	},

	incorrectOption: {
		borderWidth: 1,
		borderColor: theme.colors.error,
		backgroundColor: theme.colors.errorDark,
	},

	optionText: {
		fontSize: 18,
		color: theme.colors.text,
	},
});
