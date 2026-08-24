import { Stack } from "expo-router";

import { AudioProvider } from "@/contexts/Audio/AudioProvider";
import { QuizProvider } from "@/contexts/Quiz/QuizProvider";
import { quiz } from "@/data/quizzes";

export default function RootLayout() {
	return (
		<QuizProvider quiz={quiz}>
			<AudioProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="quiz" />
					<Stack.Screen name="results" />
				</Stack>
			</AudioProvider>
		</QuizProvider>
	);
}
