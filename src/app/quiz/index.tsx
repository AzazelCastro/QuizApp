import { Pressable, StyleSheet, Text, View } from "react-native";

import { useQuiz } from "@/contexts/QuizContext";
import { useRouter } from "expo-router";
import { preload, useAudioPlayer } from "expo-audio";
import { useState } from "react";
import { AnswerId } from "@/types/quiz";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { theme } from "@/theme";
import {
	correctSoundSource,
	incorrectSoundSource,
} from "./audio";

/*
const correctSound = useAudioPlayer(correctSoundSource, {
	keepAudioSessionActive: true,
});

const incorrectSound = useAudioPlayer(incorrectSoundSource, {
	keepAudioSessionActive: true,
});
*/

export default function Quiz() {
	const correctSound = useAudioPlayer(correctSoundSource);
	const incorrectSound = useAudioPlayer(incorrectSoundSource);

	const router = useRouter();

	const [selectedAnswer, setSelectedAnswer] = useState<AnswerId | null>(null);

	const {
		quiz,
		currentQuestion,
		currentQuestionAnswered,
		answerQuestion,
		nextQuestion,
	} = useQuiz();

	const questions = quiz.questions;

	const question = questions[currentQuestion];

	const isLastQuestion = currentQuestion === questions.length - 1;

	const isCurrentAnswerCorrect = selectedAnswer === question.correctAnswer;

	const playAnswerSound = (isCorrect: boolean) => {
		const sound = isCorrect
			? correctSound
			: incorrectSound;

		sound.seekTo(0);
		sound.play();
	};

	const handleSubmit = () => {
		if (!currentQuestionAnswered) {
			if (!selectedAnswer) return;

			answerQuestion(selectedAnswer);

			playAnswerSound(isCurrentAnswerCorrect);

			return;
		}

		if (isLastQuestion) {
			router.replace("/results");
			return;
		}

		setSelectedAnswer(null);
		nextQuestion();
	};

	return (
		<Container>
			{currentQuestionAnswered && (
				<Text
					style={[
						styles.questionAnsweredFeedback,
						isCurrentAnswerCorrect
							? styles.questionAnsweredFeedbackCorrect
							: styles.questionAnsweredFeedbackIncorrect,
					]}
				>
					{isCurrentAnswerCorrect
						? "✓ Correto"
						: "✗ Incorreto"}
				</Text>
			)}

			<Text style={styles.questionCount}>
				Questão {currentQuestion + 1}/{questions.length}
			</Text>
			<Text style={styles.question}>{question.question}</Text>

			<View style={styles.optionContainer}>
				{question.options.map((option) => (
					<Pressable
						key={option.id}
						disabled={currentQuestionAnswered}
						onPress={() => setSelectedAnswer(option.id)}
						style={[
							styles.option,

							!currentQuestionAnswered &&
								selectedAnswer === option.id &&
								styles.selectedOption,

							currentQuestionAnswered &&
								option.id === question.correctAnswer &&
								styles.correctOption,

							currentQuestionAnswered &&
								!isCurrentAnswerCorrect &&
								selectedAnswer === option.id &&
								styles.incorrectOption,
							// TODO: add animation "tremendo"
						]}
					>
						<Text style={styles.optionText}>{option.text}</Text>
					</Pressable>
				))}
			</View>

			<Button
				title={
					!currentQuestionAnswered
						? "Responder"
						: isLastQuestion
							? "Finalizar"
							: "Próxima"
				}
				onPress={handleSubmit}
				disabled={!currentQuestionAnswered && !selectedAnswer}
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	questionAnsweredFeedback: {
		fontSize: 32,
		marginBottom: 35,
		fontWeight: "bold",
	},
	questionAnsweredFeedbackCorrect: {
		color: theme.colors.success,
	},
	questionAnsweredFeedbackIncorrect: {
		color: theme.colors.error,
	},
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
		marginBottom: 30,
	},
	option: {
		backgroundColor: theme.colors.backgroundDark,
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
		width: "100%",
	},
	selectedOption: {
		borderWidth: 1,
		borderColor: theme.colors.accent,
		backgroundColor: theme.colors.accentDark,
	},
	optionText: {
		fontSize: 18,
		color: theme.colors.text,
	},
	correctOption: {
		borderWidth: 1,
		borderColor: theme.colors.success,
		backgroundColor: theme.colors.successDark,
	},
	incorrectOption: {
		borderWidth: 1,
		borderColor: theme.colors.error,
		backgroundColor: theme.colors.errorDark,
	},
});
