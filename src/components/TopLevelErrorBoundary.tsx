import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { css, Global } from '@emotion/react';
import { IReactComponentcWithChild } from 'utils/typeUtils';

export const globalStyles = css`
  body {
    background: #fff;
    color: #000;
    font-family: sans-serif;
  }
`;

export const TopLevelErrorBoundary: React.FC<IReactComponentcWithChild> = ({
  children,
}) => {
  return <ErrorBoundary fallback={<Fallback />}>{children}</ErrorBoundary>;
};
const Fallback: React.FC = () => {
  return (
    <>
      <Global styles={{ ...globalStyles }} />
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <p style={{ marginTop: 16 }}>Sorry something went wrong ...</p>
        <button
          style={{
            color: '#fff',
            background: '#2878f0',
            border: 'none',
            padding: '12px 20px',
            cursor: 'pointer',
            borderRadius: 10,
            fontWeight: 600,
            marginTop: 4,
          }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
      </div>
    </>
  );
};
