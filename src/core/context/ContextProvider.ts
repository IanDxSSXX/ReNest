import {Fragment} from "../utils/ReactUIWrapper";
import {ContextStore} from "./Store";


class ContextProvider extends Fragment {
    IAMContextProvider = true

    context(value: {[key:string]: any}) {
        this.willUseContext = true
        if (ContextStore[this.contextId] === undefined) ContextStore[this.contextId] = {}
        ContextStore[this.contextId] = {...value}
        this.passDownContext()

        return this
    }
}


export default (...children: any[]) => new ContextProvider(...children)

