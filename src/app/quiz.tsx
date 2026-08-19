import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import { AnswerId } from "../types/quiz";
import { useQuiz } from "@/contexts/QuizContext";

export default function Quiz() {
	const router = useRouter();
	
	const [selectedAnswer, setSelectedAnswer] = useState<AnswerId | null>(null);
	
	const {
		currentQuestion,
		answerQuestion,
		quiz, resetQuiz
	} = useQuiz();
	
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
		<View style={styles.container}>
			<Text style={styles.questionCount}>
				Questão {currentQuestion + 1}/{questions.length}
			</Text>
			<Text style={styles.question}>{question.question}</Text>

			{question.options.map((option) => (
				<TouchableOpacity
					key={option.id}
					style={[
						styles.option,
						selectedAnswer === option.id && styles.selectedOption,
					]}
					onPress={() => setSelectedAnswer(option.id)}
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
