import { useQuiz } from "@/contexts/QuizContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { quiz } from "../data/quizzes";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { theme } from "./theme";

export default function HomeScreen() {
	const { resetQuiz } = useQuiz();
	const router = useRouter();

	const startQuiz = () => {
		resetQuiz();
		router.push("/quiz");
	};

	return (
		<Container>
			<Text style={styles.title}>Quiz:</Text>
			<Text style={styles.title}>{quiz.title}</Text>
			<Text style={styles.subtitle}>{quiz.subtitle}</Text>

			<Button
				title="Começar Quiz"
				onPress={startQuiz}
			/>

			<View style={styles.test}>
				<Text style={{ color: theme.colors.text }}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				</Text>
				<Text style={{ color: theme.colors.text, fontWeight: 300 }}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
					magni quam dolores vel quasi. Aperiam ipsa quas voluptatibus nostrum
					et!
				</Text>
			</View>
			<View style={styles.test2}>
				<Text style={{ color: theme.colors.text }}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				</Text>
				<Text style={{ color: theme.colors.text, fontWeight: 300 }}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
					magni quam dolores vel quasi. Aperiam ipsa quas voluptatibus nostrum
					et!
				</Text>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	test: {
		marginTop: 20,
		width: "100%",
		height: 150,
		borderLeftColor: theme.colors.success,
		backgroundColor: theme.colors.successDark,
		borderLeftWidth: 5,
		padding: 15,
		borderRadius: 8,
	},
	test2: {
		marginTop: 20,
		width: "100%",
		height: 150,
		borderLeftColor: theme.colors.error,
		backgroundColor: theme.colors.errorDark,
		borderLeftWidth: 5,
		padding: 15,
		borderRadius: 8,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: theme.colors.text,
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 40,
		textAlign: "center",
		color: theme.colors.text,
	},
});
