import { Stack } from "expo-router";

import { AudioSettingsProvider } from "@/contexts/AudioSettings/AudioProvider";
import { QuizProvider } from "@/contexts/Quiz/QuizProvider";
import { quiz } from "@/data/quizzes";
import { BackgroundMusicProvider } from "@/contexts/BackgroundMusic/BackgroundMusicProvider";

export default function RootLayout() {
	return (
		<QuizProvider quiz={quiz}>
			<AudioSettingsProvider>
				<BackgroundMusicProvider>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="index" />
						<Stack.Screen name="quiz" />
						<Stack.Screen name="results" />
					</Stack>
				</BackgroundMusicProvider>
			</AudioSettingsProvider>
		</QuizProvider>
	);
}
