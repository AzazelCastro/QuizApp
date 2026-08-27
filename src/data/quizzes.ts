import { Quiz } from "@/types/quiz";
import { questions } from "./questions";

export const quiz: Quiz = {
	id: 1,
	title: "ISTs — Prevenção e Saúde",
	subtitle: "Teste seus conhecimentos sobre IST's respondendo as questões!",
	questions: questions,
	messagesResult: {
		excellent: "Você é um expert sobre IST's! Busque compartilhar seus conhecimentos com as pessoas! 🎉",
		high: "Você está se tornando consciente sobre IST's, continue estudando! 👍",
		medium: "Você ainda é um aprendiz sobre IST's, continue estudando! 😊",
		low: "Você ainda é um leigo sobre IST's! Continue estudando, há muito a aprender! 💪",
	},
};
