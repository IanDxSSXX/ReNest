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
    __children: any[]
    __elementProps: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any = {style: {}}
    __customProps: any = {}

    // ---- for error capturing
    __parentNode: any = null
    __fileName: string | undefined

    constructor(elementTag: any, ...__children: any[]) {
        this.elementTag = elementTag
        this.__children = __children
        this.className(`RT-${this.constructor.name}`)
    }

    private passParentNode(child: RTBase) {
        if (RTConfig.debug) {
                child.__parentNode = this
        }
    }
    asReactElement(): ReactElement {
        this.beforeAsReactElement()

        let __children = this.__children
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


        let element: any = createElement(this.elementTag, this.__elementProps, ...__children)
        if (RTConfig.debug) element = createElement(ErrorBoundary, {children: element, wrapper: this})
        return element
    }

    // ---* set props
    setProps(value: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any) {
        this.__elementProps = {...this.__elementProps, ...value}
        return this
    }

    setProp(key: keyof (InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>) | any, value: any, willSet=true) {
        if (willSet) this.__elementProps[key] = value
        return this
    }

    setCustomProp(key: string, value: any, willSet=true) {
        if (willSet) this.__customProps[key] = value
        return this
    }

    setStyle(key: string, value: any, willSet=true) {
        if (willSet) this.__elementProps.style[key] = value
        return this
    }

    deleteProp(key: any) {
        delete this.__elementProps[key]
        return this
    }

    id(value: string) {
        this.__elementProps.id = value
        return this
    }

    className(value: string, override=false) {
        if (override || !this.__elementProps.className) {
            this.__elementProps.className = value
        } else {
            this.__elementProps.className = `${this.__elementProps.className} ${value}`
        }
        return this
    }

    ruiClassName(value: string) {
        this.__elementProps.className = `FuncView-${value}`
        return this
    }

    key(value: string | number) {
        this.__elementProps.key = `${value}`
        return this
    }

    style(value: CSSProperties | any, willSet=true) {
        if (willSet) this.__elementProps.style = {...this.__elementProps.style, ...value}
        return this
    }

    ref(value: MutableRefObject<any>) {
        this.__elementProps.ref = value
        return this
    }

    // ---* shorthand
    get P() {
        return this.__elementProps
    }

    get S() {
        return this.__elementProps.style
    }


    // ---- utils
    forEachChild(func: (child: any)=>any, nested=false) {
        for (let child of flattened(this.__children)) {
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
