import { StyleSheet, Text, View } from "react-native";

import AnswerOption from "@/app/components/Quiz/AnswerOption/AnswerOption";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useAudio } from "@/contexts/Audio/AudioContext";
import { useQuiz } from "@/contexts/Quiz/QuizContext";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { theme } from "@/theme";
import { AnswerId } from "@/types/quiz";
import { useAudioPlayer } from "expo-audio";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	backgroundSoundSource,
	correctSoundSource,
	incorrectSoundSource,
} from "./audio";

export default function Quiz() {
	const {
		quiz,
		currentQuestion,
		currentQuestionAnswered,
		answerQuestion,
		nextQuestion,
	} = useQuiz();

	const { currentBackgroundVolume } = useAudio();

	const { play: playCorrectSound } = useSoundEffect(correctSoundSource);
	const { play: playIncorrectSound } = useSoundEffect(incorrectSoundSource);

	const backgroundSound = useAudioPlayer(backgroundSoundSource);
	useEffect(() => {
		backgroundSound.volume = currentBackgroundVolume;
	}, [backgroundSound, currentBackgroundVolume]);

	useFocusEffect(
		useCallback(() => {
			backgroundSound.loop = true;
			backgroundSound.seekTo(0);
			backgroundSound.play();
		}, [backgroundSound]),
	);

	const router = useRouter();

	const [selectedAnswer, setSelectedAnswer] = useState<AnswerId | null>(null);

	const questions = quiz.questions;

	const question = questions[currentQuestion];

	const isLastQuestion = currentQuestion === questions.length - 1;

	const isCurrentAnswerCorrect = selectedAnswer === question.correctAnswer;

	const playAnswerSound = (isCorrect: boolean) => {
		isCorrect ? playCorrectSound() : playIncorrectSound();
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
					{isCurrentAnswerCorrect ? "✓ Correto" : "✗ Incorreto"}
				</Text>
			)}

			<Text style={styles.questionCount}>
				Questão {currentQuestion + 1}/{questions.length}
			</Text>
			<Text style={styles.question}>{question.question}</Text>

			<View style={styles.optionContainer}>
				{question.options.map((option) => (
					<AnswerOption
						key={option.id}
						option={option}
						selected={selectedAnswer === option.id}
						answered={currentQuestionAnswered}
						correct={option.id === question.correctAnswer}
						onPress={() => setSelectedAnswer(option.id)}
					/>
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
});
