import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";

interface props {
	children: ReactNode;
	scrollable?: boolean;
}

export default function Container({ children, scrollable = true }: props) {
	return (
		<SafeAreaView style={styles.container}>
			{scrollable ? (
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={true}
				>
					{children}
				</ScrollView>
			) : (
				<View style={styles.fixedContent}>{children}</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
