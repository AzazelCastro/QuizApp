import { ReactNode, useState } from "react";

import { Quiz, UserAnswer, AnswerId } from "../types/quiz";
import { QuizContext } from "./QuizContext";

interface QuizProviderProps {
	quiz: Quiz;
	children: ReactNode;
}

export function QuizProvider({ quiz, children }: QuizProviderProps) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

	const answerQuestion = (answerId: AnswerId) => {
		const question = quiz.questions[currentQuestion];

		const isCorrect = answerId === question.correctAnswer;

		const userAnswer: UserAnswer = {
			questionId: question.id,
			selectedAnswer: answerId,
			correct: isCorrect,
		};

		setUserAnswers((previousAnswers) => [...previousAnswers, userAnswer]);

		if (isCorrect) {
			setScore((previousScore) => previousScore + 1);
		}

		if (currentQuestion < quiz.questions.length - 1) {
			setCurrentQuestion((previousQuestion) => previousQuestion + 1);
		}
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setScore(0);
		setUserAnswers([]);
	};

	return (
		<QuizContext.Provider
			value={{
				quiz,
				currentQuestion,
				score,
				userAnswers,
				answerQuestion,
				resetQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}
