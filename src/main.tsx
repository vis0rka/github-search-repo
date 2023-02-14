import { TopLevelErrorBoundary } from 'components/TopLevelErrorBoundary';
import { ThemeProvider } from 'lib/theme/ThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TopLevelErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TopLevelErrorBoundary>
  </React.StrictMode>
);
