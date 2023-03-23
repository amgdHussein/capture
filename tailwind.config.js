/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			...colors,
		},
		extend: {},
	},
	plugins: [],
};
