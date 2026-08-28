import { useQuiz } from "@/contexts/Quiz";
import { UserAnswer } from "@/types/quiz";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface props {
	answer: UserAnswer;
	index: number;
}

export default function AnswerResult({ answer, index }: props) {
	const { quiz } = useQuiz();

	const question = quiz.questions.find(
		(question) => question.id === answer.questionId,
	);

	if (!question) return null;

	const selectedOption = question.options.find(
		(option) => option.id === answer.selectedAnswer,
	);

	const correctOption = question.options.find(
		(option) => option.id === question.correctAnswer,
	);

	if (!correctOption) return null;

	return (
		<View
			style={[
				styles.answerItem,
				answer.correct ? styles.correctAnswer : styles.incorrectAnswer,
			]}
		>
			<Text style={styles.questionTitle}>
				Q{index + 1}: {question.question}
			</Text>

			<View>
				<Text style={styles.answerHeaderText}>Sua resposta:</Text>

				<Text style={styles.answerText}>
					{selectedOption
						? `${selectedOption.id} — ${selectedOption.text}`
						: "Não respondido"}
				</Text>
			</View>

			{!answer.correct && (
				<View>
					<Text style={styles.answerHeaderText}>Resposta correta:</Text>

					<Text style={styles.answerText}>
						{correctOption.id} — {correctOption.text}
					</Text>
				</View>
			)}

			<Text style={styles.answerStatus}>
				{answer.correct ? "✓ Correto" : "✗ Incorreto"}
			</Text>
		</View>
	);
}
