import {Fragment as ReactFragment, ReactElement} from "react";
import {RTElement} from "../view/RTElement";
import RTConfig from "../base/RTConfig";

export function TagView(element: any, propNames?: string[], dotPropNames?: string[]) {
    return (...children: any) => {
        let ruiElement = new RTElement(element, ...children).deleteProp("className")
        ruiElement.IAmTagView = true
        if (RTConfig.debug) {
            let err = new Error()
            let stack = err.stack!
            let stackList = stack.split("\n")
            ruiElement.fileName = stackList[2].replace(/.*\((https?:\/\/\S+)\)/, "$1")
        }

        if (!!propNames) {
            for (let [idx, propName] of propNames.entries()) {
                let value = children[idx]
                if (value !== undefined) ruiElement.setProp(propName, children[idx])
            }
        }

        if (!!dotPropNames) {
            let anyRuiElement = ruiElement as any
            for (let dotPropName of dotPropNames) {
                anyRuiElement[dotPropName] = (value: any) => {
                    anyRuiElement.elementProps[dotPropName] = value
                    return anyRuiElement
                }
            }
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
