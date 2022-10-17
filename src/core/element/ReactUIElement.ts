import {filteredObject} from "../utils/Utils";
import {createElement, ReactElement} from "react";
import {ReactUITheme} from "../theme/ReactUITheme";
import ReactUIBase from "../base/ReactUIBase";
import {ReactElementWrapperMemorized} from "./ReactUIHOC";
import {ResolveContext, ResolveContexts, ResolveDotProp, ResolveDotPropWrapper, ResolveProp} from "./Decorator";

export abstract class ReactUIElementAbstract<T=any> extends ReactUITheme {
    props: T
    abstract Body: (props: T) => ReactUIBase | ReactElement
    ruiGene: boolean = false

    constructor(props: any={}) {
        super("")
        this.props = props
    }

    init() {
        for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            ResolveDotPropWrapper(this, key)
        }
        return this
    }

    setBody(body: any) {
        this.Body = body
        this.ruiGene = true
    }

    asReactElement() {
        for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            ResolveContext(this, key, () =>
            ResolveContexts(this, key, () =>
            ResolveProp(this, key, () =>
            ResolveDotProp(this, key)
            )))
        }

        return createElement(
            ReactElementWrapperMemorized,
            {wrapper: this, ...!!this.P.key ? {key: this.P.key} : {} }
        )
    }
    
    registerView(view: ReactUIBase) {
        // ---- only pass classname when it's class defined
        if (!this.ruiGene) view.className(this.P.className, true)

        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        // const newElementStyles = filteredObject(this.elementProps.style, [])
        const newElementStyles = this.elementProps.style
        const newElementProps = filteredObject(this.elementProps, ["key", "className", "style"])
        view.elementProps.style = {...view.elementProps.style, ...newElementStyles}
        view.elementProps = {...view.elementProps, ...newElementProps}

        this.children = [view]
        this.passDownTheme()
        this.passDownContext()

        return view
    }

    // ---- lifecycle
    lifecycle: {
        didMount?: ()=>any,
        didUpdate: {func:()=>any, states?: any[]}[],
        willUnmount?: ()=>any,
        shouldUpdate?: (preProps: T, currProps: T) => boolean
    } = {didUpdate: []}

    didMount(value: ()=>any) {
        this.lifecycle.didMount = value
        return this
    }

    didUpdate(value: ()=>any, states?: any[]) {
        this.lifecycle.didUpdate = [...this.lifecycle.didUpdate, {func: value, states}]
        return this
    }

    willUnmount(value: ()=>any) {
        this.lifecycle.willUnmount = value
        return this
    }

    // ---- memo
    useMemo(value: boolean=true) {
        return this.setCustomProp("useMemo", value)
    }

    shouldUpdate(value: (preProps: T, currProps: T) => boolean) {
        this.lifecycle.shouldUpdate = value
        return this
    }
}

// ---- FuncView to write like react function
export class ReactUIElement<T> extends ReactUIElementAbstract {
    Body
    constructor(body: (props: T) => any, props?: T) {
        super(props);
        this.Body = body
    }
}
export function FuncView<T extends Object>(body: (props:T) => any) {
    return (props?: T) => new ReactUIElement<T>(body, props)
}

// ---- View to write like swiftUI
export const View = ReactUIElementAbstract
export function ViewWrapper<T extends Object>(RUIClass: any) {
    return (props?: T) => new RUIClass(props).init()
}

