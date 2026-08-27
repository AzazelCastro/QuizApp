import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	questionAnsweredFeedback: {
		fontSize: 32,
		marginBottom: 35,
		fontWeight: "bold",
	},
	questionAnsweredFeedbackCorrect: {
		color: theme.colors.success,
	},
	questionAnsweredFeedbackIncorrect: {
		color: theme.colors.error,
	},
	questionCount: {
		fontSize: 18,
		color: theme.colors.surface,
		marginBottom: 20,
		alignSelf: "flex-start",
	},
	question: {
		color: theme.colors.text,
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
	},
	optionContainer: {
		width: "100%",
		marginBottom: 30,
	},
});
