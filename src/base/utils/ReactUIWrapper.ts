import {Fragment, ReactElement} from "react";
import {ReactUITheme} from "../theme/ReactUITheme";
import ReactUIWithStyle from "../core/ReactUIWithStyle";


export function RUITag(element: any) {
    return (...children: any) => new ReactUITheme(element, ...children).deleteProp("className")
}


export function RUIElement(reactElement: ReactElement) {
    let ReactElementWrapper = ({reactElement}: any) => {
        return reactElement
    }
    return RUITag(ReactElementWrapper)().setProps({reactElement})
}

// ----
export namespace C {
    export class RUIFragment extends ReactUITheme {
        constructor(...children: any[]) {
            super(Fragment, ...children);
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
}

export function RUIFragment(...children: any[]) {
    return new C.RUIFragment(...children)
}
