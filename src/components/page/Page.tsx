import styled from '@emotion/styled'
import React from 'react'

interface PageProps {
	children?: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children }) => {
	return <Root>{children}</Root>
}

const Root = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  height: 100vh;
`
