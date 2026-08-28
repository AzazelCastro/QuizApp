import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    answerItem: {
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
		borderLeftWidth: 5,
	},
	correctAnswer: {
		borderLeftColor: theme.colors.success,
		backgroundColor: theme.colors.successDark,
	},
	incorrectAnswer: {
		borderLeftColor: theme.colors.error,
		backgroundColor: theme.colors.errorDark,
	},
	questionTitle: {
		fontSize: 16,
		marginBottom: 5,
		color: theme.colors.text,
	},
	answerHeaderText: {
		color: theme.colors.text,
	},
	answerText: {
		color: theme.colors.text,
		fontWeight: "300",
	},
	answerStatus: {
		fontWeight: "bold",
		color: theme.colors.text,
		marginTop: 5,
	},
});