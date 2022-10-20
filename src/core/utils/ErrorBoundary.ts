import {PureComponent} from "react"
import Running from "../base/Running";

interface ErrorBoundaryProp {
    wrapper: any,
    children: any
}

export interface ErrorBoundaryState {
    hasError: boolean
    error: any
}

export class ErrorBoundary extends PureComponent<ErrorBoundaryProp, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProp) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    getTraceMessage(node: any) {
        let name = node.parentNode.constructor.name
        if (name === "RUIElement")  {
            name = node.parentNode.elementTag.name??node.parentNode.elementTag
        }
        if (node.fileName !== undefined) {
            return `\tat ${name} (${node.fileName})\n`
        } else {
            return `\tat ${name}\n`
        }
    }


    render() {
        const { hasError, error } = this.state
        const { children, wrapper } = this.props

        if (hasError) {
            let wrapperName = wrapper.constructor.name
            if (wrapperName === "RUIElement")  {
                wrapperName = wrapper.elementTag.name??wrapper.elementTag
            }
            let traceMessages = `\tat ${wrapperName}\n`
            let node = wrapper
            while (!!node.parentNode) {
                traceMessages += this.getTraceMessage(node)
                node = node.parentNode
            }
            let errorMessage = `\nReact UI Error:\n\t${error.message}\n\nReact UI Trace:\n`

            if (!Running.DebugStore.alreadyLogged) {
                // ---- log error message
                console.error('\x1b[35m%s\x1b[0m', errorMessage + traceMessages)
                Running.DebugStore.alreadyLogged = true
            } else if (!wrapper.parentNode?.parentNode) {
                // ---- reset debug store after the outmost ErrorBoundary is called
                delete Running.DebugStore.alreadyLogged
            }
            let err = new Error("ReactUI Error Boundary: ReactUI Element Trace is in Purple! Read it First!")
            throw err
        }
        return children
    }
}

