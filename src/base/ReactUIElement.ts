import {filteredObject, isInstanceOf} from "./Utils";
import {createElement, CSSProperties, DOMAttributes, ReactElement} from "react";
import {ReactUIThemeBase} from "./ReactUITheme";
import ReactUIBase from "./ReactUIBase";


export function RUIProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        if (args.length === 1) {
            (this as ReactUIElement).setCustomProp(propertyKey, args[0])
        }
        return originalValue.apply(this, args);
    }
}


export class ReactUIElement extends ReactUIThemeBase {
    props: any
    Body?: (props: any) => ReactUIBase | ReactElement<any> | any
    ruiGene: boolean = false

    constructor(props?: any, body?: any) {
        super("")
        this.props = props ?? {}
        if (body) {
            this.Body = body
            this.ruiGene = true
        }
    }

    static ReactElementWrapper({wrapper, ruiGene}:any) {
        const component = wrapper.Body(wrapper.props)

        if (ruiGene && isInstanceOf(component, "ReactUIBase")) {
            component.registerBy(wrapper)
        }
        return component.asReactElement()
    }

    asReactElement(){
        let wrapperProps = {wrapper: this, ruiGene:this.ruiGene}
        if (this.P.key) {
            wrapperProps = {...wrapperProps, ...{key: this.P.key}}
        }
        return (
            createElement(
                ReactUIElement.ReactElementWrapper,
                wrapperProps
            )
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
        if (!this.ruiGene) {
            // ---- only pass classname and theme color when it's class defined
            view.className(this.P.className, true)
            if (isInstanceOf(view, "ReactUIThemeBase")) {
                (view as ReactUIThemeBase).themeColorMap = this.themeColorMap
            }
        }
        let newView = view as ReactUIThemeBase

        // ---- set view theme ** outside can't change inside if not default! **
        if (isInstanceOf(view, "ReactUIThemeBase")) {
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


export function RUI(body: any) {
    return (props?: any) => {
        return new ReactUIElement(props ?? {}, body)
    }
}
