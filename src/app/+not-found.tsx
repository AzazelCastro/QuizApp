import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Página não encontrada!" }} />
			<View style={styles.container}>
                <Text style={styles.title}>Página não encontrada!</Text>

				<Link
					href="/"
					style={styles.button}
				>
					<Text style={styles.buttonText}>Voltar para Home</Text>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#0d1529",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: "#eef2f6",
	},
	button: {
		backgroundColor: "#5325d0",
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 30,
	},
	buttonText: {
		color: "#eef2f6",
		fontSize: 18,
		fontWeight: "600",
	},
});
