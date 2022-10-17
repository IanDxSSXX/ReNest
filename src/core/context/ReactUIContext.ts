import {flattened, uid} from "../utils/Utils";
import ReactUIWithStyle from "../base/ReactUIWithStyle";
import {ContextStore} from "./Store";

export class ReactUIContext extends ReactUIWithStyle {
    IAmReactUIContext = true
    contextId: string = uid()
    willUseContext = false

    get contexts() {
        return ContextStore[this.contextId] ?? {}
    }

    passDownContext() {
        if (!this.willUseContext) return
        this.forEachChild(child => {
            // ---- if encounter ContextProvider, stop nesting, which means only use inner ContextProvider's contexts
            if (child.IAMContextProvider) return false
            if (child.IAmReactUIContext) {
                child.contextId = this.contextId
                child.willUseContext = true
            }
        }, true)
    }
}
