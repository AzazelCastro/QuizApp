import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

import { theme } from "@/theme";
import { QuestionOption } from "@/types/quiz";
import { useAudioPlayer } from "expo-audio";
import { selectedSoundSource } from "./audio";

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
	const selectedSound = useAudioPlayer(selectedSoundSource);

	const shakeAnimation = useRef(new Animated.Value(0)).current;

	const showCorrect = answered && correct;

	const showIncorrect = answered && selected && !correct;

	useEffect(() => {
		if (!showIncorrect) return;

		Animated.sequence([
			Animated.timing(shakeAnimation, {
				toValue: -8,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(shakeAnimation, {
				toValue: 8,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(shakeAnimation, {
				toValue: -6,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(shakeAnimation, {
				toValue: 6,
				duration: 50,
				useNativeDriver: true,
			}),

			Animated.timing(shakeAnimation, {
				toValue: 0,
				duration: 50,
				useNativeDriver: true,
			}),
		]).start();
	}, [showIncorrect, shakeAnimation]);

	const playSoundPressed = () => {
		selectedSound.seekTo(0);
		selectedSound.play();
	};

	return (
		<Animated.View
			style={{
				transform: [
					{
						translateX: shakeAnimation,
					},
				],
			}}
		>
			<Pressable
				onPress={() => {
					onPress();
					playSoundPressed();
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
