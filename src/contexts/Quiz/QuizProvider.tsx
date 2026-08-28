import { ReactNode, useCallback, useMemo, useState } from "react";

import {
	AnswerId,
	PercentageCorrectAnswersLevel,
	Quiz,
	UserAnswer,
} from "@/types/quiz";
import { QuizContext } from "./QuizContext";

interface QuizProviderProps {
	quiz: Quiz;
	children: ReactNode;
}

const getPercentageLevel = (
	percentage: number,
): PercentageCorrectAnswersLevel =>
	percentage === 100
		? "excellent"
	: percentage >= 70
		? "high"
	: percentage >= 50
		? "medium"
	: "low";

export function QuizProvider({ quiz, children }: QuizProviderProps) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);

	const [score, setScore] = useState(0);

	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

	const [percentageCorrectAnswers, setPercentageCorrectAnswers] = useState(0);
	const [percentageCorrectAnswersLevel, setPercentageCorrectAnswersLevel] =
		useState<PercentageCorrectAnswersLevel | null>(null);

	const answerQuestion = useCallback(
        (answerId: AnswerId) => {
            const question = quiz.questions[currentQuestion];
            const isCorrect = answerId === question.correctAnswer;

            const userAnswer: UserAnswer = {
                questionId: question.id,
                selectedAnswer: answerId,
                correct: isCorrect,
            };

            setUserAnswers((previousAnswers) => [...previousAnswers, userAnswer]);

            const newScore = isCorrect ? score + 1 : score;
            setScore(newScore);

            setCurrentQuestionAnswered(true);

            if (currentQuestion === quiz.questions.length - 1) {
                const percentage = Math.round((newScore / quiz.questions.length) * 100);

                setPercentageCorrectAnswers(percentage);
                setPercentageCorrectAnswersLevel(getPercentageLevel(percentage));
            }
        },
        [quiz, currentQuestion, score]
    );

	const nextQuestion = useCallback(() => {
        setCurrentQuestionAnswered(false);
        setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    }, []);

	const resetQuiz = useCallback(() => {
        setCurrentQuestion(0);
        setCurrentQuestionAnswered(false);

        setScore(0);
        setUserAnswers([]);

        setPercentageCorrectAnswers(0);
        setPercentageCorrectAnswersLevel(null);
    }, []);

	const value = useMemo(
        () => ({
            quiz,
            currentQuestion,
            currentQuestionAnswered,
            score,
            userAnswers,
            answerQuestion,
            percentageCorrectAnswers,
            percentageCorrectAnswersLevel,
            resetQuiz,
            nextQuestion,
        }),
        [
            quiz,
            currentQuestion,
            currentQuestionAnswered,
            score,
            userAnswers,
            answerQuestion,
            percentageCorrectAnswers,
            percentageCorrectAnswersLevel,
            resetQuiz,
            nextQuestion,
        ]
    );

	return (
		<QuizContext.Provider
			value={value}
		>
			{children}
		</QuizContext.Provider>
	);
}
