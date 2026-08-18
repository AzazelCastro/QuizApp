import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { quiz } from "../data/quizzes";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Quiz:</Text>
			<Text style={styles.title}>{quiz.title}</Text>
			<Text style={styles.subtitle}>{quiz.subtitle}</Text>

			<Link
				href="/quiz"
				asChild
			>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Começar Quiz</Text>
				</TouchableOpacity>
			</Link>
		</View>
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
	subtitle: {
		fontSize: 18,
		marginBottom: 40,
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
