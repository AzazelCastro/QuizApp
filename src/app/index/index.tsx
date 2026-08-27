import Button from "@/components/Button";
import Container from "@/components/Container";
import { useQuiz } from "@/contexts/Quiz/QuizContext";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { backgroundSoundSource } from "./audio";

export default function HomeScreen() {
	const { resetQuiz, quiz } = useQuiz();

	useBackgroundMusic(backgroundSoundSource);

	const router = useRouter();

	const startQuiz = () => {
		resetQuiz();
		router.push("/quiz");
	};

	return (
		<Container scrollable={false}>
			<Text style={styles.title}>Quiz:</Text>
			<Text style={styles.title}>{quiz.title}</Text>
			<Text style={styles.subtitle}>{quiz.subtitle}</Text>

			<Button
				title="Começar Quiz"
				onPress={startQuiz}
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
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
