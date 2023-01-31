import { MainLayout } from 'components/layout/MainLayout';
import HistoryPage from 'pages/history/HistoryPage';
import SearchPage from 'pages/search/SearchPage';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/search" replace />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
