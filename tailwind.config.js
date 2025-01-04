import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			animation:{
				flip: "flip 6s infinite steps(2, end)",
				kitrotate: "kitrotate 3s linear infinite both",
				shine: "shine 2s linear infinite",
				slide: "slide 40s linear infinite",
				spotlight: "spotlight 2s ease .75s 1 forwards",
				"border-width": "border-width 3s infinite alternate",
				"text-gradient": "text-gradient 2s linear infinite",
				"text-shake": "text-shake 1s ease 1",
				"text-glitch-to": "text-glitch-to 0.6s ease-in-out infinite",
				"text-glitch-from": "text-glitch-from 0.6s ease-in-out infinite",
				"text-scale": "text-scale 1s linear infinite forwards",
				spin: "spin 2s linear infinite",
		
				// From UI-Snippets : https://ui.ibelick.com
				// 'text-gradient': 'text-gradient 1.5s linear infinite',
				"background-shine": "background-shine 2s linear infinite",
				"pulse-slow": "pulse 6s infinite cubic-bezier(0.4, 0, 0.6, 1)",
		
				// Magic UI
				// 'ripple': 'ripple 3400ms ease infinite',  // Previous
				ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite", // New
				"spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
				magicslide: "magicslide var(--speed) ease-in-out infinite alternate",
				shimmer: "shimmer 8s infinite",
				gradient: "gradient 8s linear infinite",
				orbit: "orbit calc(var(--duration)*1s) linear infinite",
				marquee: "marquee var(--duration) linear infinite",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
				grid: "grid 15s linear infinite",
				meteor: "meteor 5s linear infinite",
				"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
				rippling: "rippling 0.6s ease-out",
				rainbow: "rainbow var(--speed, 2s) infinite linear",
		
				// Lukacho UI Effects
				moveUp: "moveUp 1.4s ease forwards",
				appear: "appear 1s 1s forwards",
		
				// Syntax UI
				"skew-scroll": "skew-scroll 20s linear infinite",
				pulse: "pulse var(--duration) ease-out infinite",
		
				// Aceternity Ui
				move: "move 5s linear infinite",
				smoothTranslate:
				  "smoothTranslate var(--animation-duration) var(--animation-delay) infinite",
				ty: "ty 1s  var(--animation-delay)",
			},
			keyframes: {
				meteor: {
					"0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
					"70%": { opacity: 1 },
					"100%": {
					transform: "rotate(215deg) translateX(-500px)",
					opacity: 0,
					},
				},
			},
		}
	},
};

export default config;
