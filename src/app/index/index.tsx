import Button from "@/components/Button";
import Container from "@/components/Container";
import { useAudio } from "@/contexts/Audio/AudioContext";
import { useQuiz } from "@/contexts/Quiz/QuizContext";
import { theme } from "@/theme";
import { useAudioPlayer } from "expo-audio";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { backgroundSoundSource } from "./audio";

export default function HomeScreen() {
	const { resetQuiz, quiz } = useQuiz();

	const backgroundSound = useAudioPlayer(backgroundSoundSource);

	useFocusEffect(
		useCallback(() => {
			backgroundSound.loop = true;
			backgroundSound.seekTo(0);
			backgroundSound.play();

			return () => {
				backgroundSound.pause();
			};
		}, [backgroundSound]),
	);

	const { currentBackgroundVolume } = useAudio();
	useEffect(() => {
		backgroundSound.volume = currentBackgroundVolume;
	}, [backgroundSound, currentBackgroundVolume]);

	const router = useRouter();

	const startQuiz = () => {
		resetQuiz();
		router.push("/quiz");
	};

	return (
		<Container>
			<Text style={styles.title}>Quiz:</Text>
			<Text style={styles.title}>{quiz.title}</Text>
			<Text style={styles.subtitle}>{quiz.subtitle}</Text>

			<Button
				title="Começar Quiz"
				onPress={startQuiz}
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: theme.colors.text,
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 40,
		textAlign: "center",
		color: theme.colors.text,
	},
});
