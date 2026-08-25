import { useQuiz } from "@/contexts/Quiz/QuizContext";
import { useFocusEffect, useRouter, type RelativePathString } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import AnswerResult from "@/components/Results/AnswerResult";

import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback, useEffect } from "react";
import {
	backgroundSoundSource,
	badResultSoundSource,
	goodResultSoundSource,
} from "./audio";
import { percentageStyles, styles } from "./styles";
import { useAudio } from "@/contexts/Audio/AudioContext";

export default function Results() {
	const {
		quiz,
		score,
		userAnswers,
		resetQuiz,
		percentageCorrectAnswers,
		percentageCorrectAnswersLevel,
	} = useQuiz();

	const { currentBackgroundVolume, currentSoundEffectVolume } = useAudio();

	const badResultSound = useAudioPlayer(badResultSoundSource);
	badResultSound.volume = currentSoundEffectVolume;

	const goodResultSound = useAudioPlayer(goodResultSoundSource);
	goodResultSound.volume = currentSoundEffectVolume;

	const resultSound =
		percentageCorrectAnswersLevel === "excellent" ||
		percentageCorrectAnswersLevel === "high"
			? goodResultSound
			: badResultSound;

	const resultSoundStatus = useAudioPlayerStatus(resultSound);

	const backgroundSound = useAudioPlayer(backgroundSoundSource);
	backgroundSound.volume = currentBackgroundVolume;

	useEffect(() => {
		if (!percentageCorrectAnswersLevel) return;

		resultSound.play();
		resultSound.seekTo(0);
	}, [percentageCorrectAnswersLevel, resultSound]);

	useFocusEffect(
		useCallback(() => {
			if (!resultSoundStatus.didJustFinish) return;

			backgroundSound.loop = true;
			backgroundSound.seekTo(0);
			backgroundSound.play();
		}, [resultSoundStatus.didJustFinish]),
	);

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
						router.dismissTo("/" as RelativePathString);
					}}
					title="Voltar para home"
					style={styles.action}
					size="md"
				/>
			</View>
		</Container>
	);
}
