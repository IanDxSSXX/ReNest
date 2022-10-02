import React, {ReactElement} from "react";
import {ReactUIThemeBase} from "./ReactUITheme";
import ReactUIWithStyle from "./ReactUIWithStyle";

export function ReactElementWrapper({reactElement}: any) {
    return reactElement
}

export function RUIElement(reactElement: ReactElement) {
    return RUITag(ReactElementWrapper)().setProps({reactElement})
}

// ----
export function RUITag(element: any) {
    return (...children: any) => new ReactUIThemeBase(element, ...children).deleteProp("className")
}

// ----
namespace C {
    export class Fragment extends ReactUIWithStyle {
        beforeAsReactElement() {
            if (!!this.elementProps && !!this.elementProps.key) {
                this.elementProps = {key: this.elementProps.key}
            } else {
                this.elementProps = undefined
            }
        }
    }
}

export function RUIFragment(...children: any[]) {
    return new C.Fragment(React.Fragment, ...children)
}

export function isFragment(reactUIView: any) {
    return (reactUIView.IAmReactUI??false) && reactUIView.constructor.name === "Fragment"
}
