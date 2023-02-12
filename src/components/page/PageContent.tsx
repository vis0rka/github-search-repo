import styled from '@emotion/styled'
import { Box } from 'components/Box'
import React from 'react'

interface PageContentProps {
    children?:React.ReactNode
}

export const PageContent:React.FC<PageContentProps> = ({children}) => {
  return (
    <Root component='main'>
        {children}
    </Root>
  )
}

const Root = styled(Box)`
    display:flex;
    flex-direction: column;
    height: 100%;
`