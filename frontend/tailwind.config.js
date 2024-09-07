import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"roboto" : ["Roboto", "system-ui"],
				"cabin" : ["Cabin","system-ui"]
			},
			colors: {
				"gr": "rgb(15, 255, 80)",
			}
		},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			"light",
			{
				black: {
					...daisyUIThemes["black"],
					primary: "rgb(6, 208, 1)",
					secondary: "rgb(15, 255, 80)",
				},
			},
		],
	},
};