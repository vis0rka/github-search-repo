import { createTheme } from '@mui/material/styles';

const spacing = {
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 0.75,
  4: 1,
  5: 1.25,
  6: 1.5,
  7: 1.75,
  8: 2,
  9: 2.5,
  10: 3,
  11: 4,
  12: 5,
  13: 6,
};

export const theme = createTheme({
  spacing: (factor: number) => `${spacing[factor as keyof typeof spacing]}rem`,
  palette: {
    background: {
      default: '#f5f5fb',
    },
    primary: {
      main: '#2878f0',
    },
    text: {
      disabled: '#a2a2a3',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 700, lineHeight: 1.235 },
  },
});

export default theme;
