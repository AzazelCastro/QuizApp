import { Stack } from "expo-router";


import { quiz } from "../data/quizzes";
import { QuizProvider } from "../contexts/QuizProvider";

export default function RootLayout() {
	return (
		<QuizProvider quiz={quiz}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="quiz" />
				<Stack.Screen name="results" />
			</Stack>
		</QuizProvider>
	);
}
