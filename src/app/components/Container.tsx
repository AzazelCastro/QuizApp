import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";

interface props {
	children: ReactNode;
}

export default function Container({ children }: props) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: theme.colors.background,
		color: theme.colors.text,
	},
});
