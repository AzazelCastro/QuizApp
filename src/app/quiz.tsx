import {
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View
} from "react-native";

import { useQuiz } from "@/contexts/QuizContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { AnswerId } from "../types/quiz";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { theme } from "./theme";

export default function Quiz() {
	const router = useRouter();

	const [selectedAnswer, setSelectedAnswer] = useState<AnswerId | null>(null);

	const { currentQuestion, answerQuestion, quiz, resetQuiz } = useQuiz();

	const questions = quiz.questions;

	const question = questions[currentQuestion];

	const handleSubmit = () => {
		if (!selectedAnswer) return;

		answerQuestion(selectedAnswer);

		setSelectedAnswer(null);

		if (currentQuestion < questions.length - 1) {
			return;
		} else {
			router.replace("/results");
		}
	};

	return (
		<Container>
			<Text style={styles.questionCount}>
				Questão {currentQuestion + 1}/{questions.length}
			</Text>
			<Text style={styles.question}>{question.question}</Text>

			<View style={styles.optionContainer}>
				{question.options.map((option) => (
					<TouchableWithoutFeedback
					key={option.id}
					onPress={() => setSelectedAnswer(option.id)}
					>
						<View
							style={[
								styles.option,
								selectedAnswer === option.id && styles.selectedOption,
							]}
							>
							<Text style={styles.optionText}>{option.text}</Text>
						</View>
					</TouchableWithoutFeedback>
				))}
			</View>

			<Button
				title={currentQuestion < questions.length - 1 ? "Próxima" : "Finalizar"}
				onPress={handleSubmit}
				disabled={!selectedAnswer}
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	questionCount: {
		fontSize: 18,
		color: theme.colors.surface,
		marginBottom: 20,
		alignSelf: "flex-start",
	},
	question: {
		color: theme.colors.text,
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
	},
	optionContainer: {
		width: "100%",
		marginBottom: 30
	},
	option: {
		backgroundColor: theme.colors.backgroundDark,
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		width: "100%"
	},
	selectedOption: {
		backgroundColor: theme.colors.accentDark,
		borderWidth: 1,
		borderColor: theme.colors.accent,
	},
	optionText: {
		fontSize: 18,
		color: theme.colors.text
	},
});
