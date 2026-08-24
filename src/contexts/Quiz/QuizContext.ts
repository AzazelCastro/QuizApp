import { createContext, useContext } from "react";

import { PercentageCorrectAnswersLevel, Quiz, UserAnswer } from "@/types/quiz";
import { AnswerId } from "@/types/quiz";

interface QuizContextData {
	quiz: Quiz;

	currentQuestion: number;
	currentQuestionAnswered: boolean;

	score: number;
	userAnswers: UserAnswer[];

	percentageCorrectAnswers: number | null;
	percentageCorrectAnswersLevel: PercentageCorrectAnswersLevel | null;

	answerQuestion: (answerId: AnswerId) => void;
	nextQuestion: () => void;
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
