import styled from '@emotion/styled';
import { Drawer, Paper } from '@mui/material';
import React from 'react';
import { IReactComponentcWithChild } from 'utils/typeUtils';
import { Box } from './Box';
import { Stack } from './Stack';

interface ResizableDrawerProps extends IReactComponentcWithChild {
  menu: React.ReactNode;
}

const defaultDrawerWidth = 240;
const minDrawerWidth = 150;
const maxDrawerWidth = 1000;

export const ResizableDrawer: React.FC<ResizableDrawerProps> = ({
  menu,
  children,
}) => {
  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

  const handleMouseDown = (e) => {
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseMove = React.useCallback((evt: MouseEvent) => {
    const newWidth = evt.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  return (
    <Root >
      <StyledLeftSide style={{ width: drawerWidth }}>
        <StyledDagger onMouseDown={(e) => handleMouseDown(e)} />
        {menu}
      </StyledLeftSide>
      <StyledContainer $width={drawerWidth}>{children}</StyledContainer>
    </Root>
  );
};

const Root = styled(Box)`
  display: flex;
  height: 100%;
`

const StyledContainer = styled(Box)<{ $width: number }>`
  width: ${(props) => `calc(100% - ${props.$width}px)`};
`;

const StyledLeftSide = styled(Paper)`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledDagger = styled.div`
  width: 5px;
  cursor: ew-resize;
  padding: 4px 0 0;
  border-top: 1px solid #ddd;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #f4f7f9;
`;
