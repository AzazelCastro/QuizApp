import { Text, View } from "react-native";

import Button from "@/components/Button";
import Container from "@/components/Container";
import AnswerOption from "./components/AnswerOption";
import { useQuiz } from "@/contexts/Quiz";
import useBackgroundMusic from "@/hooks/useBackgroundMusic";
import useSoundEffect from "@/hooks/useSoundEffect";
import { AnswerId } from "@/types/quiz";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    backgroundSoundSource,
    correctSoundSource,
    incorrectSoundSource,
} from "./audio";
import { styles } from "./styles";

export default function Quiz() {
	const {
		quiz,
		currentQuestion,
		currentQuestionAnswered,
		answerQuestion,
		nextQuestion,
	} = useQuiz();

	useBackgroundMusic(backgroundSoundSource);

	const { play: playCorrectSound } = useSoundEffect(correctSoundSource);
	const { play: playIncorrectSound } = useSoundEffect(incorrectSoundSource);

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
