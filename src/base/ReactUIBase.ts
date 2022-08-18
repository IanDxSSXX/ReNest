import {
    ReactElement,
    ClassAttributes,
    CSSProperties,
    InputHTMLAttributes,
    MutableRefObject,
    createElement
} from "react";
import {isInstanceOf, uid} from "./Utils";

export default class ReactUIBase {
    protected elementTag: any = null
    elementProps: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any = {style: {}}
    customProps: any = {}
    children: any[]
    private _element: HTMLElement | undefined | null

    constructor(elementTag: any, ...children: any[]) {
        this.elementTag = elementTag
        this.children = children
        this.className(`RUI-${this.constructor.name}`)
    }

    asReactElement(): ReactElement<any> {
        this.beforeAsReactElement()

        let children = this.children.map((child) =>
            typeof child === "number" ? `${child}` :
            isInstanceOf(child, "ReactUIBase") ? child.asReactElement() :
            child instanceof Array ? child.map((c)=>isInstanceOf(c, "ReactUIBase") ? c.asReactElement() : c):
            child)

        return(
            createElement(
                this.elementTag,
                this.elementProps,
                ...children
            )
        )
    }

    // ---* set props
    setProps(value: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | any) {
        this.elementProps = {...this.elementProps, ...value}
        return this
    }

    setProp(key: keyof (InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>) | any, value: any) {
        this.elementProps[key] = value
        return this
    }

    setCustomProp(key: string, value: any) {
        this.customProps[key] = value
        return this
    }

    deleteProp(key: any) {
        delete this.elementProps[key]
        return this
    }

    uid() {
        return this.setCustomProp("uid", uid())
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

    style(value: CSSProperties | any) {
        this.elementProps.style = Object.assign(this.elementProps.style, value)
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

    // ---* element related
    setElementId() {
        this.elementProps.id = `${this.constructor.name}-${uid()}`
        return this
    }

    get element() {
        if (this._element == null) {
            this._element = document.getElementById(this.elementProps.id)
        }
        return this._element as HTMLElement
    }

    // ---- use for ReactUIElement
    registerBy(element: any) {
        element.registerView(this)
        return this
    }

    // ---- hook
    beforeAsReactElement() {}


}


