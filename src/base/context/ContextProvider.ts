import {C as RUIWrapperC} from "../utils/ReactUIWrapper";
import {flattened} from "../utils/Utils";
import {useState} from "react";
import {ReactUIHelper} from "../utils/ReactUIHelper";

namespace C {
    export class ContextProvider extends RUIWrapperC.RUIFragment {
        context(value: {[key:string]: any}) {
            for (let child of this.children) {
                if ((child as any).IAmReactUI) {
                    child.themes(value, true)
                }
            }
        }
    }
}


export function ContextProvider(...children: any[]) {
    return new C.ContextProvider(...children)
}

