import React from 'react'
import { ErrorMessage } from './ErrorMessage'

interface Props {
    silent?: boolean
    fallback?: React.ReactNode
    children?: React.ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo)

        if (error.name === 'ChunkLoadError') {
            window.location.reload()
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.silent) {
                return null
            }

            return this.props.fallback ?? <ErrorMessage />
        }

        return this.props.children || null
    }
}
