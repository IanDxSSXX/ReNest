import {filteredObject} from "../utils/Utils";
import {createElement, ReactElement} from "react";
import {ReactUITheme} from "../theme/ReactUITheme";
import ReactUIBase from "../core/ReactUIBase";
import {RUITag} from "../utils/ReactUIWrapper";
import {ErrorBoundary} from 'react-error-boundary'
import {ReactUIHelper} from "../utils/ReactUIHelper";


export function RUIProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        if (args.length === 1) {
            (this as ReactUIElement).setCustomProp(propertyKey, args[0], args[1]??true)
        }
        return originalValue.apply(this, args);
    }
}

export class ReactUIElement extends ReactUITheme {
    props: any
    Body?: (props: any, context: any) => ReactUIBase | ReactElement
    ruiGene: boolean = false

    constructor(props?: any) {
        super("")
        this.props = props ?? {}
    }

    setBody(body: any) {
        this.Body = body
        this.ruiGene = true
    }

    static ReactElementWrapper({wrapper}: { wrapper: ReactUIElement }) {
        if (!wrapper.Body) {
            ReactUIHelper.error("ReactUIElement must have a Body property, which returns the main")
        }
        const component = wrapper.Body!(wrapper.props, wrapper.customProps.context ?? {}) as any

        if (!component) {
            ReactUIHelper.error("ReactUIElement must have a proper return, current is null")
        }

        if (component.IAmReactUI) {
            component.registerBy(wrapper)
        }

        const ErrorFallBack = ({error}: { error: Error }) => {
            let message
            if (wrapper.constructor.name === "ReactUIElement") {
                message = `in a RUI wrapper\n ${error.message}`
            } else {
                message = `in react ui component ${wrapper.constructor.name}\n ${error.message}`
            }
            ReactUIHelper.error(message)
            return RUITag("")
        }

        return  createElement(
            ErrorBoundary,
            {FallbackComponent: ErrorFallBack} as any,
            (component.IAmReactUI) ? component.asReactElement() : component
        )
    }

    asReactElement(){
        let wrapperProps = {wrapper: this}
        if (this.P.key) {
            wrapperProps = {...wrapperProps, ...{key: this.P.key}}
        }

        return createElement(
                ReactUIElement.ReactElementWrapper,
                wrapperProps
            )
    }
    
    registerView(view: ReactUIBase) {
        if (!this.ruiGene) {
            // ---- only pass classname when it's class defined
            view.className(this.P.className, true)
        }
        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        // const newElementStyles = filteredObject(this.elementProps.style, [])
        const newElementStyles = this.elementProps.style
        const newElementProps = filteredObject(this.elementProps, ["key", "className", "style"])
        view.elementProps.style = {...view.elementProps.style, ...newElementStyles}
        view.elementProps = {...view.elementProps, ...newElementProps}
    }

    protected registerAsChild(view: ReactUIBase) {
        // ---- set view theme ** outside can't change inside if not default! **
        if ((view as any).IAmReactUITheme) {
            this.passDownTheme(view as ReactUITheme)
        }
        view.customProps.context = this.customProps.context
    }
}

export function RUI<T extends Object>(body: (props:T, context: any) => any) {
    return function(props?: T) {
        let ruiElement = new ReactUIElement(props)
        ruiElement.setBody(body)
        return ruiElement
    }
}
