import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

interface AnswerItem {
	question: string;
	correct: boolean;
}

export default function Results() {
	const router = useRouter();
	const { score, answers } = useLocalSearchParams();
	const answerData: AnswerItem[] = JSON.parse(answers as string);
	const totalQuestions = answerData.length;
	const percentage = Math.round((Number(score) / totalQuestions) * 100);

	let message = "";
	if (percentage >= 90) message = "Excelente! 🎉";
	else if (percentage >= 70) message = "Bom trabalho! 👍";
	else if (percentage >= 50) message = "Nada mal! 😊";
	else message = "Há muito a aprender! 💪";

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Quiz Completo!</Text>
			<Text style={styles.score}>
				{score}/{totalQuestions}
			</Text>
			<Text style={styles.percentage}>{percentage}%</Text>
			<Text style={styles.message}>{message}</Text>

			<ScrollView style={styles.answersContainer}>
				<Text style={styles.answersTitle}>Suas respostas:</Text>
				{answerData.map((item, index) => (
					<View
						key={index}
						style={[
							styles.answerItem,
							item.correct ? styles.correctAnswer : styles.incorrectAnswer,
						]}
					>
						<Text style={styles.answerText}>
							Q{index + 1}: {item.question}
						</Text>
						<Text style={styles.answerStatus}>
							{item.correct ? "✓ Correto" : "✗ Incorreto"}
						</Text>
					</View>
				))}
			</ScrollView>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/quiz")}
			>
				<Text style={styles.buttonText}>Tentar novamente</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, styles.homeButton]}
				onPress={() => router.push("/")}
			>
				<Text style={styles.buttonText}>Voltar para home</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	score: {
		fontSize: 24,
		color: "#3498db",
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	percentage: {
		fontSize: 36,
		color: "#2ecc71",
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	message: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: "center",
	},
	answersContainer: {
		flex: 1,
		marginBottom: 20,
		width: "100%",
	},
	answersTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	answerItem: {
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
	},
	correctAnswer: {
		backgroundColor: "#e8f5e9",
		borderLeftWidth: 5,
		borderLeftColor: "#2ecc71",
	},
	incorrectAnswer: {
		backgroundColor: "#ffebee",
		borderLeftWidth: 5,
		borderLeftColor: "#e74c3c",
	},
	answerText: {
		fontSize: 16,
		marginBottom: 5,
	},
	answerStatus: {
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#3498db",
		padding: 15,
		borderRadius: 10,
		width: "100%",
		marginBottom: 15,
	},
	homeButton: {
		backgroundColor: "#e74c3c",
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "600",
	},
});
