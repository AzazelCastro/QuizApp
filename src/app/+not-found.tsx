import { RelativePathString, router, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import Button from "./components/Button";
import Container from "./components/Container";
import { theme } from "./theme";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Página não encontrada!" }} />
			<Container>
				<Text style={styles.title}>Página não encontrada!</Text>

				<Button
					title="Voltar para home"
					onPress={() => router.dismissTo("/" as RelativePathString)}
				/>
			</Container>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: theme.colors.background,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 40,
		textAlign: "center",
		color: theme.colors.text,
	},
});
