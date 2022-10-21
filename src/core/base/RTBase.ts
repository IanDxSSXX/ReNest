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
    _children: any[]
    _elementProps: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any = {style: {}}
    _customProps: any = {}

    // ---- for error capturing
    _parentNode: any = null
    _fileName: string | undefined

    constructor(elementTag: any, ..._children: any[]) {
        this.elementTag = elementTag
        this._children = _children
        this.className(`RT-${this.constructor.name}`)
    }

    private passParentNode(child: RTBase) {
        if (RTConfig.debug) {
                child._parentNode = this
        }
    }
    asReactElement(): ReactElement {
        this.beforeAsReactElement()

        let children = this._children
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


        let element: any = createElement(this.elementTag, this._elementProps, ...children)
        if (RTConfig.debug) element = createElement(ErrorBoundary, {children: element, wrapper: this})
        return element
    }

    // ---* set props
    setProps(value: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any) {
        this._elementProps = {...this._elementProps, ...value}
        return this
    }

    setProp(key: keyof (InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>) | any, value: any, willSet=true) {
        if (willSet) this._elementProps[key] = value
        return this
    }

    setCustomProp(key: string, value: any, willSet=true) {
        if (willSet) this._customProps[key] = value
        return this
    }

    setStyle(key: string, value: any, willSet=true) {
        if (willSet) this._elementProps.style[key] = value
        return this
    }

    deleteProp(key: any) {
        delete this._elementProps[key]
        return this
    }

    id(value: string) {
        this._elementProps.id = value
        return this
    }

    className(value: string, override=false) {
        if (override || !this._elementProps.className) {
            this._elementProps.className = value
        } else {
            this._elementProps.className = `${this._elementProps.className} ${value}`
        }
        return this
    }

    ruiClassName(value: string) {
        this._elementProps.className = `FuncView-${value}`
        return this
    }

    key(value: string | number) {
        this._elementProps.key = `${value}`
        return this
    }

    style(value: CSSProperties | any, willSet=true) {
        if (willSet) this._elementProps.style = {...this._elementProps.style, ...value}
        return this
    }

    ref(value: MutableRefObject<any>) {
        this._elementProps.ref = value
        return this
    }

    // ---* shorthand
    get P() {
        return this._elementProps
    }

    get S() {
        return this._elementProps.style
    }


    // ---- utils
    forEachChild(func: (child: any)=>any, nested=false) {
        for (let child of flattened(this._children)) {
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
