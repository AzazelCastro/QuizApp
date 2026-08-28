import { Animated, Pressable, Text } from "react-native";

import useSoundEffect from "@/hooks/useSoundEffect";
import { QuestionOption } from "@/types/quiz";
import { selectedSoundSource } from "./audio";
import { styles } from "./styles";
import useAnswerAnimation from "./useAnswerAnimation";

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
	const { play: playSelectedSound } = useSoundEffect(selectedSoundSource);

	const showCorrect = answered && correct;
	const showIncorrect = answered && selected && !correct;

	const { animatedStyle } = useAnswerAnimation({
		showCorrect,
		showIncorrect,
	});

	return (
		<Animated.View style={animatedStyle}>
			<Pressable
				onPress={() => {
					playSelectedSound();
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
