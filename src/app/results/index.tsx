import { useQuiz } from "@/contexts/QuizContext";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Button from "../components/Button";
import Container from "../components/Container";
import AnswerResult from "../components/Results/AnswerResult";

import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect } from "react";
import { backgroundSoundSource, badResultSoundSource, goodResultSoundSource } from "./audio";
import { percentageStyles, styles } from "./styles";

export default function Results() {
	const {
		quiz,
		score,
		userAnswers,
		resetQuiz,
		percentageCorrectAnswers,
		percentageCorrectAnswersLevel,
	} = useQuiz();

	const badResultSound = useAudioPlayer(badResultSoundSource);
	const goodResultSound = useAudioPlayer(goodResultSoundSource);

	const resultSound =
		percentageCorrectAnswersLevel === "excellent" ||
		percentageCorrectAnswersLevel === "high"
			? goodResultSound
			: badResultSound;

	const resultSoundStatus = useAudioPlayerStatus(resultSound);

	const backgroundSound = useAudioPlayer(backgroundSoundSource);

	useEffect(() => {
		if (!percentageCorrectAnswersLevel) return;
		
		resultSound.seekTo(0);
		resultSound.play();
	}, [percentageCorrectAnswersLevel, resultSound]);
	
	useEffect(() => {
		if (!resultSoundStatus.didJustFinish) return;

		backgroundSound.seekTo(0);
		backgroundSound.play();
	}, [resultSoundStatus.didJustFinish]);
	
	const router = useRouter();

	const questions = quiz.questions;
	const totalQuestions = questions.length;

	const messageResult = percentageCorrectAnswersLevel
		? quiz.messagesResult[percentageCorrectAnswersLevel]
		: null;

	return (
		<Container>
			<Text style={styles.title}>Quiz Completo!</Text>
			<Text style={styles.score}>
				{score}/{totalQuestions}
			</Text>
			<Text
				style={[
					styles.percentage,
					percentageCorrectAnswersLevel &&
						percentageStyles[percentageCorrectAnswersLevel],
				]}
			>
				{percentageCorrectAnswers}%
			</Text>
			<Text style={styles.message}>{messageResult}</Text>

			<ScrollView style={styles.answersContainer}>
				<Text style={styles.answersTitle}>Suas respostas:</Text>

				{userAnswers.map((answer, index) => (
					<AnswerResult
						answer={answer}
						index={index}
						key={answer.questionId}
					/>
				))}
			</ScrollView>

			<View style={styles.containerActions}>
				<Button
					onPress={() => {
						resetQuiz();
						router.replace("/quiz");
					}}
					title="Tentar novamente"
					style={styles.action}
					size="md"
				/>

				<Button
					onPress={() => {
						resetQuiz();
						router.dismissTo("/");
					}}
					title="Voltar para home"
					style={styles.action}
					size="md"
				/>
			</View>
		</Container>
	);
}
