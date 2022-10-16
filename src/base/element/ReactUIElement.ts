import {filteredObject} from "../utils/Utils";
import {createElement, ReactElement} from "react";
import {ReactUITheme} from "../theme/ReactUITheme";
import ReactUIBase from "../base/ReactUIBase";
import {ReactElementWrapperMemorized, RUIProp} from "./Helpers";
import {ResolveDotPropWrapper} from "./Decorator";

export class ReactUIElement<T=any> extends ReactUITheme {
    props: T
    Body?: (props: T) => ReactUIBase | ReactElement
    ruiGene: boolean = false
    fuck:any

    constructor(props?: any) {
        super("")
        this.props = props ?? {}
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

    // lifecycle
    @RUIProp
    didMount(value: ()=>any) { return this }

    didUpdate(value: ()=>any, states?: any[]) {
        return this.setCustomProp("didUpdate", [...this.C.didUpdate??[], {func: value, states: states}])
    }

    @RUIProp
    willUnmount(value: ()=>any) { return this }

    // ---- memo
    @RUIProp
    useMemo(value: boolean=true) { return this }

    @RUIProp
    shouldUpdate(value: (preProps: T, currProps: T) => boolean) { return this }
}

export function FuncView<T extends Object>(body: (props:T) => any) {
    return function(props?: T) {
        let ruiElement = new ReactUIElement<T>(props)
        ruiElement.setBody(body)
        return ruiElement
    }
}

export const View = ReactUIElement

export function ViewWrapper<T extends Object>(RUIClass: any) {
    return (props?: T) => new RUIClass(props).init()
}

