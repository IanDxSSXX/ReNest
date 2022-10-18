import {createElement, ReactElement} from "react";
import RUIBase from "../base/RUIBase";
import {ReactElementWrapperMemorized} from "./RUIHOC";
import lodash from "lodash";
import {
    ResolveContext,
    ResolveContexts,
    ResolveDotProp,
    ResolveDotPropWrapper,
    ResolveObserve,
    ResolveProp
} from "./ResolveDecorator";
import {RUIElement} from "./RUIElement";
import Running from "../base/Running";
import {uid} from "../utils/Utils";

export abstract class View<T=any> extends RUIElement {
    props: T
    abstract Body: (props: T) => RUIBase | ReactElement
    funcGene: boolean = false
    IAmRUIElement = true
    // ---- lifecycle
    lifecycle: {
        didMount: (()=>any)[],
        didUpdate: (()=>any)[],
        willUnmount: (()=>any)[],
        shouldUpdate: ((prevProps: T, currProps: T) => boolean)[]
        observe: {func:()=>any, states: any[]}[]
    } = { didMount: [], didUpdate: [], willUnmount: [], shouldUpdate: [], observe: []}

    didMount: any
    didUpdate: any
    willUnmount: any
    shouldUpdate: any
    observe: any

    uid = uid()

    constructor(props: any={}) {
        super("")
        this.props = props
    }

    init() {
        for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            ResolveDotPropWrapper(this, key, () =>
            ResolveObserve(this, key)
            )
        }
        
        // ---- lifecycle
        if (!!this.didMount) this.lifecycle.didMount.push(this.didMount)
        this.didMount = (value: ()=>any) => {
            this.lifecycle.didMount.push(value)
            return this
        }

        if (!!this.didUpdate) this.lifecycle.didUpdate.push(this.didUpdate)
        this.didUpdate = (value: ()=>any, states?: any[]) => {
            if (states === undefined) {
                this.lifecycle.didUpdate.push(value)
            } else {
                this.lifecycle.observe.push({func: value, states: states.map(state=>()=>state)})
            }
            return this
        }


        if (!!this.willUnmount) this.lifecycle.willUnmount = this.willUnmount
        this.willUnmount = (value: ()=>any) => {
            this.lifecycle.willUnmount.push(value)
            return this
        }

        if (!!this.shouldUpdate) this.lifecycle.shouldUpdate = this.shouldUpdate
        this.shouldUpdate = (value: (prevProps: T, currProps: T) => boolean) => {
            this.lifecycle.shouldUpdate.push(value)
            return this
        }
        return this
    }

    asReactElement() {
        this.beforeAsReactElement()
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
    
    registerView(view: RUIBase) {
        // ---- only pass classname when it's class defined
        if (!this.funcGene) view.className(this.P.className, true)
        return super.registerView(view)
    }


    equalTo(another: View) {
        // ---- check if another's prop is equal to this props
        // ---- useful for memo equal check
        // ---- styles and custom props
        // ---1 element props, update on change by default using deep equal
        if (!lodash.isEqual(this.elementProps, another.elementProps)) return false

        // ---2 themes, update on change by default using deep equal
        if (!lodash.isEqual(this.theme, another.theme)) return false

        // ---- all props
        let thisAllProps: any = {...this.props}
        let anotherAllProps: any = {...another.props}

        // ---- all context
        for (let key of this.customProps.contextNameStore) {
            let value = (this as any)[key]
            if(value !== undefined) thisAllProps[key] = value
        }
        for (let key of another.customProps.contextNameStore) {
            let value = (another as any)[key]
            if(value !== undefined) anotherAllProps[key] = value
        }
        // ---- all dot props
        for (let key of this.customProps.dotPropNameStore) {
            let value = (this as any)[key]
            if(value !== undefined) thisAllProps[key] = value
        }
        for (let key of another.customProps.dotPropNameStore) {
            let value = (another as any)[key]
            if(value !== undefined) anotherAllProps[key] = value
        }
        // console.log(thisAllProps, anotherAllProps)
        // -4.5 custom and input props with shouldUpdate hook
        if (this.lifecycle.shouldUpdate.length > 0) {
            // ---- props and contexts and dotProps
            //      if has one false, return false, re-render
            return !this.lifecycle.shouldUpdate.map(func => func(thisAllProps, anotherAllProps)).includes(false)
        }

       return lodash.isEqual(thisAllProps, anotherAllProps)
    }
}

// ---- FuncView to write like react function
export class RUIView<T> extends View {
    Body
    constructor(body: (props: T) => any, props?: T) {
        super(props);
        this.Body = body
        this.funcGene = true
    }
}
export function FuncView<T extends Object>(body: (props:T) => any) {
    return (props?: T) => new RUIView<T>(body, props)
}


export function ViewWrapper<T extends Object>(RUIClass: any) {
    return (props?: T) => new RUIClass(props).init()
}

