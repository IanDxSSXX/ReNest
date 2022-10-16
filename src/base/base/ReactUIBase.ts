import {
    ReactElement,
    ClassAttributes,
    CSSProperties,
    InputHTMLAttributes,
    MutableRefObject,
    createElement
} from "react";
import {flattened, uid} from "../utils/Utils";

export default class ReactUIBase {
    IAmReactUI = true
    // IAmReactUITheme = false
    // IAmReactUIElement = false
    // IAmReactUIWithStyle = false
    // IAmReactUIContext = false
    // IAMContextProvider = false
    // IAMThemeProvider = false

    protected elementTag: any
    children: any[]
    elementProps: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any = {style: {}}
    customProps: any = {}

    constructor(elementTag: any, ...children: any[]) {
        this.elementTag = elementTag
        this.children = children
        this.className(`RUI-${this.constructor.name}`)
    }

    asReactElement(): ReactElement {
        this.beforeAsReactElement()

        let children = this.children
            .map((child) =>
                child.IAmReactUI ? child.asReactElement() :
                child instanceof Array ? child.map((c)=>c.IAmReactUI ? c.asReactElement() : c):
                child)

        return createElement(
                this.elementTag,
                this.elementProps,
                ...children
            )
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
        this.elementProps.className = `RUI-${value}`
        return this
    }

    key(value: string | number) {
        this.elementProps.key = `${value}`
        return this
    }

    style(value: CSSProperties | any, willSet=true) {
        if (willSet) this.elementProps.style = Object.assign(this.elementProps.style, value)
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

    get C() {
        return this.customProps
    }

    // ---- utils
    forEachChild(func: (child: any)=>any, nested=false) {
        for (let child of flattened(this.children)) {
            if (child.IAmReactUI) {
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
