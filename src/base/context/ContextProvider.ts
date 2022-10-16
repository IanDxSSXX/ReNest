import {C as RUIWrapperC} from "../utils/ReactUIWrapper";
import {uid} from "../utils/Utils";
import {ContextStore} from "./Store";


export namespace C {
    export class ContextProvider extends RUIWrapperC.RUIFragment {
        IAMContextProvider = true
        ruiContext: {[key:string]:{[key:string]: any}} = {}
        context(value: {[key:string]: any}, tag="default") {
            this.ruiContext[tag] = {...this.ruiContext[tag] ?? {}, ...value}
            this.willUseContext = true
            if (ContextStore[this.contextId] === undefined) ContextStore[this.contextId] = {}
            ContextStore[this.contextId][tag] = {...this.ruiContext[tag] ?? {}, ...value}
            this.passDownContext()

            return this
        }
    }
}


export function ContextProvider(...children: any[]) {
    return new C.ContextProvider(...children)
}

