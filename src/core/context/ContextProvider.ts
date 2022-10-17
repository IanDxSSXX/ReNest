import {Fragment} from "../utils/ReactUIWrapper";
import {ContextStore} from "./Store";


export namespace C {
    export class ContextProvider extends Fragment {
        IAMContextProvider = true

        context(value: {[key:string]: any}) {
            this.willUseContext = true
            if (ContextStore[this.contextId] === undefined) ContextStore[this.contextId] = {}
            ContextStore[this.contextId] = {...value}
            this.passDownContext()

            return this
        }
    }
}


export function ContextProvider(...children: any[]) {
    return new C.ContextProvider(...children)
}

