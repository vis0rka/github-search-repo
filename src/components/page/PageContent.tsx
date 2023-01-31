import styled from '@emotion/styled'
import { Box } from 'components/Box'
import React from 'react'

interface PageContentProps {
    children?:React.ReactNode
}

export const PageContent:React.FC<PageContentProps> = ({children}) => {
  return (
    <Root>
        {children}
    </Root>
  )
}

const Root = styled(Box)`
    padding: ${(props) => props.theme.spacing(4)};
`