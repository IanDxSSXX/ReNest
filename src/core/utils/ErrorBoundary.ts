import {PureComponent} from "react"
import Running from "../base/Running";
import RTConfig from "../base/RTConfig";

interface ErrorBoundaryProp {
    wrapper: any,
    children: any
}

export interface ErrorBoundaryState {
    hasError: boolean
    error: any
}


if (RTConfig.suppressReactError) {
    // ---- error handling
    const consoleError = console.error
    console.error = (error) => {
        if (typeof error !== "string" || !error.startsWith("The above error occurred in the")) {
            // ---- suppress react error because it already piped into renest
            consoleError(error)
        }
    }

    window.addEventListener('error', function (event) {
        const {error} = event;
        // Skip the first error, it is always irrelevant in the DEV mode.
        if (error.stack?.indexOf('invokeGuardedCallbackDev') >= 0 && !error.alreadySeen) {
            error.alreadySeen = true;
            event.preventDefault();
            return;
        }
    }, {capture: true});
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
        let name = node.IAmTagView ?
            node.elementTag.name??node.elementTag : node.name??node.constructor.name

        return `\tat ${name} (${node.fileName??"http://"})\n`
    }

    render() {
        const { hasError, error } = this.state
        const { children, wrapper } = this.props

        if (hasError) {
            let traceMessages = this.getTraceMessage(wrapper)
            let node = wrapper
            while (!!node.parentNode) {
                traceMessages += this.getTraceMessage(node.parentNode)
                node = node.parentNode
            }

            if (!Running.DebugStore.alreadyLogged) {
                // ---- log error message, best practice with chrome
                // ---- if you want browser to automatically translate http://xx/js_bundle to the file you're writing now
                //      you have to follow the structure:
                //      Start with: "Error: xxx", each line with a "\s*at ", and most importantly can't end with a new line!
                let errorMessage = `Error: \n🪹 ReNest Error:\n\t${error.message}\n\n🛣 ReNest Element Trace:\n` + traceMessages.slice(0, -1)
                console.error(errorMessage)
                Running.DebugStore.alreadyLogged = true
            } else if (!wrapper.parentNode?.parentNode) {
                // ---- reset debug store after the outmost ErrorBoundary is called
                delete Running.DebugStore.alreadyLogged
            }

            let err = new Error("ReNest Error Boundary: ReNest Error is tagged with 🪹 and Element Trace with 🛣 ! Read them First!")
            err.stack = err.message     // remove useless trace
            throw err
        }
        return children
    }
}

