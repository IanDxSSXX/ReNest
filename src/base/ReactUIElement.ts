import {filteredObject} from "./Utils";
import {createElement, CSSProperties, DOMAttributes, ReactElement} from "react";
import {ReactUIThemeBase} from "./ReactUITheme";
import ReactUIBase from "./ReactUIBase";
import {isFragment, RUITag} from "./ReactUIWrapper";
import {ErrorBoundary} from 'react-error-boundary'
import {ReactUIHelper} from "./ReactUIHelper";


export function RUIProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        if (args.length === 1) {
            (this as ReactUIElement).setCustomProp(propertyKey, args[0], args[1]??true)
        }
        return originalValue.apply(this, args);
    }
}

export class ReactUIElement extends ReactUIThemeBase {
    props: any
    Body?: (...props: any[]) => ReactUIBase | ReactElement
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
        const component = wrapper.Body!(wrapper.props) as any

        if (!component) {
            ReactUIHelper.error("ReactUIElement must have a proper return, current is null")
        }

        if (wrapper.ruiGene && (component.IAmReactUI??false)) {
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
            (component.IAmReactUI??false) ? component.asReactElement() : component
        )
    }


    asReactElement(){
        let wrapperProps = {wrapper: this, ruiGene:this.ruiGene}
        if (this.P.key) {
            wrapperProps = {...wrapperProps, ...{key: this.P.key}}
        }

        return createElement(
                ReactUIElement.ReactElementWrapper,
                wrapperProps
            )
    }

    // ---- register
    registerViewStyles(view: ReactUIBase, ...styleNames: (keyof CSSProperties)[]) {
        for (let styleName of styleNames) {
            if (this.elementProps.style[styleName]) {
                view.elementProps.style[styleName] = this.elementProps.style[styleName]
            }
        }
        return this
    }

    registerViewProps(view: ReactUIBase, ...propNames: (keyof DOMAttributes<any>)[]) {
        for (let propName of propNames) {
            if (this.elementProps[propName]) {
                view.elementProps[propName] = this.elementProps[propName]
            }
        }
        return this
    }
    
    registerView(view: ReactUIBase) {
        if(isFragment(view)) return this
        if (!this.ruiGene) {
            // ---- only pass classname and theme color when it's class defined
            view.className(this.P.className, true)
            if ((view as any).IAmReactUIThemeBase??false) {
                (view as ReactUIThemeBase).themeColorMap = this.themeColorMap
            }
        }
        // ---- set view theme ** outside can't change inside if not default! **
        if ((view as any).IAmReactUIThemeBase??false) {
            let newView = view as ReactUIThemeBase
            newView.themeTag(this.reactUIThemeTag)
            newView.themes(this.reactUIThemes)
        }

        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        // const newElementStyles = filteredObject(this.elementProps.style, [])
        const newElementStyles = this.elementProps.style
        const newElementProps = filteredObject(this.elementProps, ["key", "className"])
        view.elementProps.style = {...newElementStyles, ...view.elementProps.style}
        view.elementProps = {...newElementProps, ...view.elementProps}
    }
}

export function RUI<T extends Object>(body: (props:T) => any) {
    return function(props?: T) {
        let ruiElement = new ReactUIElement(props)
        ruiElement.setBody(body)
        return ruiElement
    }
}
