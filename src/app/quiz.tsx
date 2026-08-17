import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import { questions } from "./data/questions";

export default function Quiz() {
	const router = useRouter();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [userAnswers, setUserAnswers] = useState<
		{ question: string; correct: boolean }[]
	>([]);

	const handleSelect = (answer: string) => {
		setSelectedAnswer(answer);
	};

	const handleSubmit = () => {
		const isCorrect =
			selectedAnswer === questions[currentQuestion].correctAnswer;

		setUserAnswers([
			...userAnswers,
			{
				question: questions[currentQuestion].question,
				correct: isCorrect,
			},
		]);

		if (isCorrect) {
			setScore(score + 1);
		}

		setSelectedAnswer(null);

		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			router.push({
				pathname: "/results",
				params: {
					score: isCorrect ? score + 1 : score,
					answers: JSON.stringify(
						userAnswers.concat([
							{
								question: questions[currentQuestion].question,
								correct: isCorrect,
							},
						]),
					),
				},
			});
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.questionCount}>
				Questão {currentQuestion + 1}/{questions.length}
			</Text>
			<Text style={styles.question}>{questions[currentQuestion].question}</Text>

			{questions[currentQuestion].options.map((option, index) => (
				<TouchableOpacity
					key={index}
					style={[
						styles.option,
						selectedAnswer === option.id && styles.selectedOption,
					]}
					onPress={() => handleSelect(option.id)}
				>
					<Text style={styles.optionText}>{option.text}</Text>
				</TouchableOpacity>
			))}

			<TouchableOpacity
				style={[styles.submitButton, !selectedAnswer && styles.disabledButton]}
				onPress={handleSubmit}
				disabled={!selectedAnswer}
			>
				<Text style={styles.submitButtonText}>
					{currentQuestion < questions.length - 1 ? "Próxima" : "Finalizar"}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	questionCount: {
		fontSize: 18,
		color: "#666",
		marginBottom: 20,
	},
	question: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
	},
	option: {
		backgroundColor: "#f0f0f0",
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
	},
	selectedOption: {
		backgroundColor: "#d4e6ff",
		borderWidth: 1,
		borderColor: "#3498db",
	},
	optionText: {
		fontSize: 18,
	},
	submitButton: {
		backgroundColor: "#3498db",
		padding: 15,
		borderRadius: 10,
		marginTop: 20,
		alignItems: "center",
	},
	disabledButton: {
		backgroundColor: "#cccccc",
	},
	submitButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
});
