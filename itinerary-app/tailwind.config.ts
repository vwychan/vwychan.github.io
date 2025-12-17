import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'paper-light': 'var(--paper-light)',
                'paper-cream': 'var(--paper-cream)',
                'ink-dark': 'var(--ink-dark)',
                'ink-medium': 'var(--ink-medium)',
                'ink-light': 'var(--ink-light)',
                'accent-red': 'var(--accent-red)',
                'accent-gold': 'var(--accent-gold)',
                'accent-blue': 'var(--accent-blue)',
            },
            fontFamily: {
                sans: ['var(--font-noto-sans)', 'sans-serif'],
                serif: ['var(--font-noto-serif)', 'serif'],
                crimson: ['var(--font-crimson)', 'serif'],
            }
        },
    },
    plugins: [],
}
export default config
