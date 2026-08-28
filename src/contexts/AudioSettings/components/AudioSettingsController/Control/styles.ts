import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
