import theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	scrollContent: {
		flexGrow: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	fixedContent: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});
