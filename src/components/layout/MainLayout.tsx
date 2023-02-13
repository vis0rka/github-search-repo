import { Page } from 'components/page/Page'
import { PageHeader } from 'components/page/PageHeader'
import { Outlet } from 'react-router-dom'
import { PageContent } from 'components/page/PageContent'
import { FilterContextProvider } from 'features/github-search/context/FiltersContext'

export const MainLayout = () => {
	return (
		<Page>
			<PageHeader />
			<PageContent>
				<Outlet />
			</PageContent>
		</Page>
	)
}
