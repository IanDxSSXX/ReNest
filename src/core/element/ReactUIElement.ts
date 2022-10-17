import {filteredObject} from "../utils/Utils";
import {createElement, ReactElement} from "react";
import {ReactUITheme} from "../theme/ReactUITheme";
import ReactUIBase from "../base/ReactUIBase";
import {ReactElementWrapperMemorized} from "./ReactUIHOC";
import {ResolveContext, ResolveContexts, ResolveDotProp, ResolveDotPropWrapper, ResolveProp} from "./Decorator";
import lodash from "lodash";
import * as cluster from "cluster";

export abstract class ReactUIElementAbstract<T=any> extends ReactUITheme {
    props: T
    abstract Body: (props: T) => ReactUIBase | ReactElement
    funcGene: boolean = false
    IAmReactUIElement = true

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
            { wrapper: this, ...!!this.P.key ? {key: this.P.key} : {} }
        )
    }
    
    registerView(view: ReactUIBase) {
        // ---- only pass classname when it's class defined
        if (!this.funcGene) view.className(this.P.className, true)

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
        didUpdate?: {func:()=>any, states?: any[]}[],
        willUnmount?: ()=>any,
        shouldUpdate?: (preProps: T, currProps: T) => boolean
    } = {}

    didMount(value: ()=>any) {
        this.lifecycle.didMount = value
        return this
    }

    didUpdate(value: ()=>any, states?: any[]) {
        this.lifecycle.didUpdate = [...this.lifecycle.didUpdate??[], {func: value, states}]
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

    equalTo(another: ReactUIElementAbstract) {
        // ---- check if another's prop is equal to this props
        // ---- useful for memo equal check
        // ---- styles and custom props
        // ---1 element props, update on change by default using deep equal
        if (!lodash.isEqual(this.elementProps, another.elementProps)) return false

        // ---2 themes, update on change by default using deep equal
        if (!lodash.isEqual(this.theme, another.theme)) return false

        // -4.5 custom and input props with shouldUpdate hook
        if (!!this.lifecycle.shouldUpdate) {
            // ---- props and contexts and dotProps
            return this.lifecycle.shouldUpdate(
                {...this.props, ...this.customProps.contextStore, ...this.customProps.dotPropStore},
                {...another.props, ...another.customProps.contextStore, ...another.customProps.dotPropStore})
        }

        // ---4 custom props, update on change by default using deep equal, contains dot prop and context
        //      no function hooks
        if (!lodash.isEqual(this.customProps, another.customProps)) return false

        // ---5 input props
        if (!lodash.isEqual(this.props, another.props)) return false

        return true
    }
}

// ---- FuncView to write like react function
export class ReactUIElement<T> extends ReactUIElementAbstract {
    Body
    constructor(body: (props: T) => any, props?: T) {
        super(props);
        this.Body = body
        this.funcGene = true
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

