module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.md',
    './*.html',
    './*.md'
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1e40af',
        'brand-secondary': '#64748b',
        'brand-accent': '#3b82f6'
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'header': ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5' }],
        'sm': ['0.9375rem', { lineHeight: '1.6' }],
        'base': ['1.125rem', { lineHeight: '1.75' }],
        'lg': ['1.25rem', { lineHeight: '1.75' }],
        'xl': ['1.375rem', { lineHeight: '1.75' }],
        '2xl': ['1.625rem', { lineHeight: '1.6' }],
        '3xl': ['2rem', { lineHeight: '1.5' }],
        '4xl': ['2.5rem', { lineHeight: '1.4' }],
        '5xl': ['3.125rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75',
            color: theme('colors.gray.700'),
            maxWidth: '75ch',
            a: {
              color: theme('colors.brand-primary'),
              fontWeight: '500',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.brand-accent'),
              },
            },
            h1: {
              color: theme('colors.gray.900'),
              fontSize: '2.5rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontSize: '2rem',
              fontWeight: '700',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontSize: '1.625rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            h4: {
              color: theme('colors.gray.900'),
              fontSize: '1.375rem',
              fontWeight: '600',
              lineHeight: '1.5',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            code: {
              fontSize: '0.95em',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
