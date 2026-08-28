import { Stack } from "expo-router";

import { AudioSettingsProvider } from "@/contexts/AudioSettings";
import { BackgroundMusicProvider } from "@/contexts/BackgroundMusic";
import { QuizProvider } from "@/contexts/Quiz";
import { quiz } from "@/data/quizzes";

export default function RootLayout() {
	return (
		<QuizProvider quiz={quiz}>
			<AudioSettingsProvider>
				<BackgroundMusicProvider>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name="index" />
						<Stack.Screen name="quiz" />
						<Stack.Screen name="results" />
					</Stack>
				</BackgroundMusicProvider>
			</AudioSettingsProvider>
		</QuizProvider>
	);
}
