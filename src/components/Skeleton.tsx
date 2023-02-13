import {
	Skeleton as MuiSkeleton,
	SkeletonProps as MuiSkeletonProps,
} from '@mui/material'
import React from 'react'

export interface SkeletonProps extends MuiSkeletonProps {}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
	return <MuiSkeleton {...props} />
}
