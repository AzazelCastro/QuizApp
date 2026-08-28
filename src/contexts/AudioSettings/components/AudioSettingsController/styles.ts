import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 50,
		right: 65,
		zIndex: 1000,
	},

	fab: {
		position: "absolute",
		width: 52,
		height: 52,
		borderRadius: 26,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.backgroundDark,
	},

	panel: {
		position: "absolute",
		top: 100,
		right: 15,
		marginTop: 10,
		width: 280,
		padding: 16,
		borderRadius: 12,
		backgroundColor: theme.colors.backgroundDark,
		zIndex: 1,
	},

	modal: {
		flex: 1,
		backgroundColor: "transparent",
	},

	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: theme.colors.text,
		marginBottom: 15,
	},
});
