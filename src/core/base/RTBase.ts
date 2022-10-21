import {
    ReactElement,
    ClassAttributes,
    CSSProperties,
    InputHTMLAttributes,
    MutableRefObject,
    createElement
} from "react";
import {flattened} from "../utils/Utils";
import RTConfig from "./RTConfig";
import {ErrorBoundary} from "../utils/ErrorBoundary";


export default class RTBase {
    IAmRT = true

    protected elementTag: any
    children: any[]
    elementProps: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any = {style: {}}
    customProps: any = {}

    // ---- for error capturing
    parentNode: any = null
    fileName: string | undefined

    constructor(elementTag: any, ...children: any[]) {
        this.elementTag = elementTag
        this.children = children
        this.className(`RT-${this.constructor.name}`)
    }

    private passParentNode(child: RTBase) {
        if (RTConfig.debug) {
                child.parentNode = this
        }
    }
    asReactElement(): ReactElement {
        this.beforeAsReactElement()

        let children = this.children
            .map(child => {
                if (child?.IAmRT) {
                    this.passParentNode(child)
                    return child.asReactElement()
                }
                if (child instanceof Array) {
                    return child.map(c=> {
                        if (c?.IAmRT) {
                            this.passParentNode(c)
                            return c.asReactElement()
                        }
                        return c
                    })
                }
                return child
            })


        let element: any = createElement(this.elementTag, this.elementProps, ...children)
        if (RTConfig.debug) element = createElement(ErrorBoundary, {children: element, wrapper: this})
        return element
    }

    // ---* set props
    setProps(value: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any) {
        this.elementProps = {...this.elementProps, ...value}
        return this
    }

    setProp(key: keyof (InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>) | any, value: any, willSet=true) {
        if (willSet) this.elementProps[key] = value
        return this
    }

    setCustomProp(key: string, value: any, willSet=true) {
        if (willSet) this.customProps[key] = value
        return this
    }

    setStyle(key: string, value: any, willSet=true) {
        if (willSet) this.elementProps.style[key] = value
        return this
    }

    deleteProp(key: any) {
        delete this.elementProps[key]
        return this
    }

    id(value: string) {
        this.elementProps.id = value
        return this
    }

    className(value: string, override=false) {
        if (override || !this.elementProps.className) {
            this.elementProps.className = value
        } else {
            this.elementProps.className = `${this.elementProps.className} ${value}`
        }
        return this
    }

    ruiClassName(value: string) {
        this.elementProps.className = `FuncView-${value}`
        return this
    }

    key(value: string | number) {
        this.elementProps.key = `${value}`
        return this
    }

    style(value: CSSProperties | any, willSet=true) {
        if (willSet) this.elementProps.style = {...this.elementProps.style, ...value}
        return this
    }

    ref(value: MutableRefObject<any>) {
        this.elementProps.ref = value
        return this
    }

    // ---* shorthand
    get P() {
        return this.elementProps
    }

    get S() {
        return this.elementProps.style
    }


    // ---- utils
    forEachChild(func: (child: any)=>any, nested=false) {
        for (let child of flattened(this.children)) {
            if (child?.IAmRT) {
                let willNest = func(child) ?? true
                if (willNest && nested) {
                    child.forEachChild(func, nested)
                }
            }
        }
        return this
    }

    // ---- hook
    beforeAsReactElement() {}
}
