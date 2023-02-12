import { MainLayout } from 'components/layout/MainLayout';
import { FilterContextProvider } from 'features/github-search/context/FiltersContext';
import HistoryPage from 'pages/history/HistoryPage';
import SearchPage from 'pages/search/SearchPage';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <FilterContextProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/search" replace />} />

              {mainRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              ))}
            </Route>
          </Routes>
        </FilterContextProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

interface RouteDefiniation {
  path: string;
  element: React.ReactNode;
  label: string;
}

export const mainRoutes: RouteDefiniation[] = [
  {
    path: '/search',
    element: <SearchPage />,
    label: 'Search',
  },
  {
    path: '/history',
    element: <HistoryPage />,
    label: 'History',
  },
];
