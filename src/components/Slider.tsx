import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';
import React from 'react';

export interface SliderProps extends MuiSliderProps {}

export const Slider: React.FC<SliderProps> = (props) => {
  return <MuiSlider {...props} />;
};
