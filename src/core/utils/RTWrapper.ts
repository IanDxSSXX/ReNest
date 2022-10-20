import {Fragment as ReactFragment, ReactElement} from "react";
import {RTElement} from "../element/RTElement";
import RTConfig from "../base/RTConfig";

export function TagView(element: any, dotPropNames?: string[]) {
    return (...children: any) => {
        let ruiElement = new RTElement(element, ...children).deleteProp("className")

        if (RTConfig.debug) {
            let err: any = {}
            Error.captureStackTrace(err)
            let stack = err.stack
            let stackList = stack.split("\n")
            ruiElement.fileName = stackList[2].replace(/.*\((https?:\/\/\S+)\)/, "$1")
        }

        if (!!dotPropNames) {
            return ruiElement.withDotProp(...dotPropNames)
        }
        return ruiElement
    }
}


export function ElementView(reactElement: ReactElement) {
    let ReactElementWrapper = ({reactElement}: any) => {
        return reactElement
    }
    return TagView(ReactElementWrapper)().setProps({reactElement})
}

export class Fragment extends RTElement {
    IAMFragment = true
    constructor(...children: any[]) {
        super(ReactFragment, ...children);
    }
    beforeAsReactElement() {
        super.beforeAsReactElement();

        if (!!this.elementProps && !!this.elementProps.key) {
            this.elementProps = {key: this.elementProps.key}
        } else {
            this.elementProps = undefined
        }
    }
}

export function FragmentView(...children: any[]) {
    return new Fragment(...children)
}
