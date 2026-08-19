import { useQuiz } from "@/contexts/QuizContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { theme } from "./theme";

export default function Results() {
	const router = useRouter();

	const { quiz, score, userAnswers, resetQuiz } = useQuiz();

	const questions = quiz.questions;

	const totalQuestions = questions.length;
	const percentage = Math.round((Number(score) / totalQuestions) * 100);

	let message = "";
	if (percentage >= 100)
		message =
			"Você é um expert sobre IST's! Busque compartilhar seus conhecimentos com as pessoas! 🎉";
	else if (percentage >= 70)
		message =
			"Você está se tornando consciente sobre IST's, continue estudando! 👍";
	else if (percentage >= 50)
		message = "Você ainda é um aprendiz sobre IST's, continue estudando! 😊";
	else
		message =
			"Você ainda é um leigo sobre IST's! Continue estudando, há muito a aprender! 💪";

	return (
		<Container>
			<Text style={styles.title}>Quiz Completo!</Text>
			<Text style={styles.score}>
				{score}/{totalQuestions}
			</Text>
			<Text style={styles.percentage}>{percentage}%</Text>
			<Text style={styles.message}>{message}</Text>

			<ScrollView style={styles.answersContainer}>
				<Text style={styles.answersTitle}>Suas respostas:</Text>

				{userAnswers.map((answer, index) => {
					const question = questions.find(
						(question) => question.id === answer.questionId,
					);

					if (!question) return null;

					const selectedOption = question.options.find(
						(option) => option.id === answer.selectedAnswer,
					);

					const correctOption = question.options.find(
						(option) => option.id === question.correctAnswer,
					);

					return (
						<View
							key={answer.questionId}
							style={[
								styles.answerItem,
								answer.correct ? styles.correctAnswer : styles.incorrectAnswer,
							]}
						>
							<Text style={styles.questionTitle}>
								Q{index + 1}: {question.question}
							</Text>

							<View>
								<Text style={styles.answerHeaderText}>Sua resposta: </Text>
								<Text style={styles.answerText}>
									{selectedOption
										? `${selectedOption.id} — ${selectedOption.text}`
										: "Não respondido"}
								</Text>
							</View>

							{!answer.correct && (
								<View>
									<Text style={styles.answerHeaderText}>Resposta correta: </Text>
									<Text style={styles.answerText}>
										{correctOption?.id} — {correctOption?.text}
									</Text>
								</View>
							)}

							<Text style={styles.answerStatus}>
								{answer.correct ? "✓ Correto" : "✗ Incorreto"}
							</Text>
						</View>
					);
				})}
			</ScrollView>
			
			<View style={[
				{flex: 0.1, flexDirection: "row", gap: "1"}
			]}>
				<Button
					onPress={() => {
						resetQuiz();
						router.replace("/quiz");
					}}
					title="Tentar novamente"
					/>

				<Button
					onPress={() => {
						resetQuiz();
						router.dismissTo("/");
					}}
					title="Voltar para home"
					style={{ marginTop: 10, width: "50%" }}
				/>
			</View>

			{/* <TouchableOpacity
				style={styles.button}
				onPress={() => {
					resetQuiz();
					router.replace("/quiz");
				}}
			>
				<Text style={styles.buttonText}>Tentar novamente</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, styles.homeButton]}
				onPress={() => {
					resetQuiz();
					router.dismissTo("/");
				}}
			>
				<Text style={styles.buttonText}>Voltar para home</Text>
			</TouchableOpacity> */}
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: theme.colors.text,
	},
	score: {
		fontSize: 24,
		color: "#3498db",
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	percentage: {
		fontSize: 36,
		color: "#2ecc71",
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	message: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: "center",
		color: theme.colors.text,
	},
	answersContainer: {
		flex: 1,
		marginBottom: 20,
		width: "100%",
	},
	answersTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: theme.colors.text,
	},
	answerItem: {
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
	},
	correctAnswer: {
		borderLeftWidth: 5,
		borderLeftColor: theme.colors.success,
		backgroundColor: theme.colors.successDark,
	},
	incorrectAnswer: {
		borderLeftWidth: 5,
		borderLeftColor: theme.colors.error,
		backgroundColor: theme.colors.errorDark,
	},
	questionTitle: {
		fontSize: 16,
		marginBottom: 5,
		color: theme.colors.text,
	},
	answerHeaderText: {
		color: theme.colors.text,
	},
	answerText: {
		color: theme.colors.text,
		fontWeight: 300,
	},
	answerStatus: {
		fontWeight: "bold",
		color: theme.colors.text,
		marginTop: 5,
	},
});
