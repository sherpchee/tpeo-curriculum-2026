/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F3801A',
        page: '#101010',
        surface: '#191919',
        foreground: '#FFFFFF',
        muted: '#D7D7D7',
        border: '#444444',
        'logo-muted': '#CBD0D8',
        'brand-start': '#FB8C14',
        'brand-end': '#F6A606',
      },
      fontFamily: {
        heading: ['"DM Sans"', 'Arial', 'sans-serif'],
        body: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['64px', { lineHeight: 'normal', fontWeight: '700' }],
        section: ['48px', { lineHeight: '36px', fontWeight: '700' }],
        'card-title': ['32px', { lineHeight: '36px', fontWeight: '700' }],
        'item-title': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        body: ['24px', { lineHeight: '36px' }],
        'body-large': ['28px', { lineHeight: '36px' }],
        navigation: ['20px', { lineHeight: 'normal', fontWeight: '500' }],
        small: ['20px', { lineHeight: 'normal' }],
      },
      spacing: {
        section: '100px',
        'section-content': '80px',
        'feature-gap': '63px',
        'nav-gutter': '60px',
        'hero-gutter': '79px',
        'nav-gap': '35px',
        'card-top': '30px',
        'card-bottom': '50px',
        'nav-top': '42px',
      },
      maxWidth: {
        page: '1512px',
        features: '1326.798px',
        'hero-copy': '694px',
        'cta-panel': '1048px',
      },
      borderRadius: {
        control: '10px',
        card: '12px',
        panel: '24px',
        'footer-control': '13.782px',
      },
      boxShadow: {
        flat: 'none',
      },
    },
  },
  plugins: [],
}
