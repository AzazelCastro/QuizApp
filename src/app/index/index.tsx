import { useQuiz } from "@/contexts/QuizContext";
import { useFocusEffect, useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { theme } from "@/theme";
import { useAudioPlayer } from "expo-audio";
import { backgroundSoundSource } from "./audio";
import { useCallback } from "react";

export default function HomeScreen() {
	const { resetQuiz, quiz } = useQuiz();

	const backgroundSound = useAudioPlayer(backgroundSoundSource);
	
	useFocusEffect(
		useCallback(() => {
			backgroundSound.play();
			backgroundSound.seekTo(0);

			return () => {
				backgroundSound.pause();
		};
	}, [backgroundSound])
);

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
