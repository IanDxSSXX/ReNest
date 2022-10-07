import {C as RUIWrapperC} from "../utils/ReactUIWrapper";
import {flattened} from "../utils/Utils";
import {useState} from "react";
import {ReactUIHelper} from "../utils/ReactUIHelper";
import ReactUIBase from "../core/ReactUIBase";
import {ReactUIElement} from "../element/ReactUIElement";
import {ReactUIContext} from "./ReactUIContext";

namespace C {
    export class ContextProvider extends RUIWrapperC.RUIFragment {
        IAMContextProvider = true
        private contexts: {[key:string]:{[key:string]: any}} = {}
        context(value: {[key:string]: any}, tag="default") {
            this.contexts[tag] = {...this.contexts[tag] ?? {}, ...value}
            this.forEachChild((child: ReactUIBase) => {
                if (child.IAmReactUIContext && !child.IAMContextProvider) {
                    (child as ReactUIContext).ruiContext = this.contexts
                }
            }, true)
            return this
        }
    }
}


export function ContextProvider(...children: any[]) {
    return new C.ContextProvider(...children)
}

