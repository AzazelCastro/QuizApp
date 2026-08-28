export type ThemeColor = keyof typeof theme.colors;

export const theme = {
	colors: {
		background: "#0d1529",
		backgroundDark: "#010515",
		surface: "#787f89",
		surfaceSecondary: "#a4adba",

		primary: "#7007e7",
		primaryDark: "#2e0c67",
		accent: "#a683ff",
		accentDark: "#131837",

		text: "#F2F2F7",
		muted: "#626267",
		border: "#2C2C3E",

		error: "#ea003e",
		errorDark: "#2f010d93",
		success: "#00a43b",
		successDark: "#003213ab",
		info: "#135bf9",
		warning: "#df6f00",
	},
};

export default theme;
