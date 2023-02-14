import { Page } from 'components/page/Page';
import { PageHeader } from 'components/page/PageHeader';
import { Outlet } from 'react-router-dom';
import { PageContent } from 'components/page/PageContent';
import { ErrorBoundary } from 'components/ErrorBoundary';

export const MainLayout = () => {
  return (
    <Page>
      <PageHeader />
      <PageContent>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </PageContent>
    </Page>
  );
};
