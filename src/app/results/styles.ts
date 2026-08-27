import { PercentageCorrectAnswersLevel } from "@/types/quiz";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: theme.colors.text,
	},
	score: {
		fontSize: 24,
		color: theme.colors.info,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	percentage: {
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	percentageLow: {
		color: theme.colors.error,
	},
	percentageMedium: {
		color: theme.colors.warning,
	},
	percentageHigh: {
		color: theme.colors.success,
	},
	message: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: "center",
		color: theme.colors.text,
	},
	answersContainer: {
		flex: 1,
		marginBottom: 20,
		width: "100%",
	},
	answersTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: theme.colors.text,
	},
	containerActions: {
		flexDirection: "row",
		gap: 10,
	},
	action: {
		flex: 1,
	},
});

export const percentageStyles: Record<PercentageCorrectAnswersLevel, object> = {
	excellent: styles.percentageHigh,
	high: styles.percentageHigh,
	medium: styles.percentageMedium,
	low: styles.percentageLow,
};
