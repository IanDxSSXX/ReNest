import {C as RUIWrapperC} from "../utils/ReactUIWrapper";
import {flattened} from "../utils/Utils";
import {useState} from "react";
import {ReactUIHelper} from "../utils/ReactUIHelper";
import ReactUIBase from "../core/ReactUIBase";

namespace C {
    export class ContextProvider extends RUIWrapperC.RUIFragment {
        context(value: {[key:string]: any}) {
            this.forEachChild((child: ReactUIBase) => {
                child.customProps.context = {...(child.customProps.context??{}), ...value}
            }, true)
            return this
        }
    }
}


export function ContextProvider(...children: any[]) {
    return new C.ContextProvider(...children)
}

