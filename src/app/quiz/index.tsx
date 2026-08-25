import { StyleSheet, Text, View } from "react-native";

import AnswerOption from "@/app/components/Quiz/AnswerOption/AnswerOption";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useQuiz } from "@/contexts/Quiz/QuizContext";
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
import { useAudio } from "@/contexts/Audio/AudioContext";

export default function Quiz() {
	const {
		quiz,
		currentQuestion,
		currentQuestionAnswered,
		answerQuestion,
		nextQuestion,
	} = useQuiz();

	const { currentBackgroundVolume, currentSoundEffectVolume } = useAudio();

	const correctSound = useAudioPlayer(correctSoundSource, {
		downloadFirst: true,
	});
	correctSound.volume = currentSoundEffectVolume;

	const incorrectSound = useAudioPlayer(incorrectSoundSource, {
		downloadFirst: true,
	});
	incorrectSound.volume = currentSoundEffectVolume;

	const backgroundSound = useAudioPlayer(backgroundSoundSource);
	backgroundSound.volume = currentBackgroundVolume;

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
		const sound = isCorrect ? correctSound : incorrectSound;

		sound.play();
		sound.seekTo(0);
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
