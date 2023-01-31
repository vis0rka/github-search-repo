import { Page } from 'components/page/Page';
import { PageHeader } from 'components/page/PageHeader';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { PageContent } from 'components/page/PageContent';

export const MainLayout = () => {
  return (
    <Page>
      <PageHeader />
      <PageContent>
        <Outlet />
      </PageContent>
    </Page>
  );
};
