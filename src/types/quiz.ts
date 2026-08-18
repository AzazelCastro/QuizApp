export interface Quiz {
	id: number;
	title: string;
    subtitle: string;
	questions: Question[];
}

export interface Question {
	id: number;
	question: string;
	options: QuestionOption[];
	correctAnswer: AnswerId;
}

export type AnswerId = "a" | "b" | "c" | "d";

export interface QuestionOption {
	id: AnswerId;
	text: string;
}

export interface UserAnswer {
	questionId: number;
	selectedAnswer: AnswerId;
	correct:  boolean;
}
