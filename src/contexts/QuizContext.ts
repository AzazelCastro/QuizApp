import { createContext, useContext } from "react";

import { UserAnswer } from "../types/quiz";
import { AnswerId } from "../types/quiz";

interface QuizContextData {
	currentQuestion: number;
	score: number;
	userAnswers: UserAnswer[];

	answerQuestion: (answerId: AnswerId) => void;
	resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextData | undefined>(
	undefined,
);

export function useQuiz() {
	const context = useContext(QuizContext);

	if (!context) {
		throw new Error("useQuiz deve ser usado dentro de um QuizProvider");
	}

	return context;
}
