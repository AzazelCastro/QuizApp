import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

import { theme } from "@/theme";
import { QuestionOption } from "@/types/quiz";
import { useAudioPlayer } from "expo-audio";
import { selectedSoundSource } from "./audio";
import { useAudio } from "@/contexts/Audio/AudioContext";

interface AnswerOptionProps {
	option: QuestionOption;
	selected: boolean;
	answered: boolean;
	correct: boolean;
	onPress: () => void;
}

export default function AnswerOption({
	option,
	selected,
	answered,
	correct,
	onPress,
}: AnswerOptionProps) {
	const { currentSoundEffectVolume } = useAudio();
	
	const selectedSound = useAudioPlayer(selectedSoundSource);
	selectedSound.volume = currentSoundEffectVolume;

	const showCorrect = answered && correct;
	const showIncorrect = answered && selected && !correct;

	const incorrectAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!showIncorrect) return;

		Animated.sequence([
			Animated.timing(incorrectAnimation, {
				toValue: -8,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(incorrectAnimation, {
				toValue: 8,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(incorrectAnimation, {
				toValue: -6,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(incorrectAnimation, {
				toValue: 6,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(incorrectAnimation, {
				toValue: 0,
				duration: 50,
				useNativeDriver: true,
			}),
		]).start();
	}, [showIncorrect, incorrectAnimation]);

	const correctAnimation = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		if (!showCorrect) return;

		Animated.sequence([
			Animated.timing(correctAnimation, {
				toValue: 1.04,
				duration: 120,
				useNativeDriver: true,
			}),
			Animated.spring(correctAnimation, {
				toValue: 1,
				friction: 4,
				tension: 100,
				useNativeDriver: true,
			}),
		]).start();
	}, [showCorrect, correctAnimation]);

	const playSoundPressed = () => {
		selectedSound.seekTo(0);
		selectedSound.play();
	};

	return (
		<Animated.View
			style={{
				transform: [
					{
						translateX: incorrectAnimation,
					},
					{
						scale: correctAnimation,
					},
				],
			}}
		>
			<Pressable
				onPress={() => {
					playSoundPressed();
					onPress();
				}}
				disabled={answered}
				style={[
					styles.option,

					selected && styles.selectedOption,

					showCorrect && styles.correctOption,

					showIncorrect && styles.incorrectOption,
				]}
			>
				<Text style={styles.optionText}>{option.text}</Text>
			</Pressable>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
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

	optionText: {
		fontSize: 18,
		color: theme.colors.text,
	},
});
