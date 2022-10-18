import {flattened, uid} from "../utils/Utils";
import RUIWithStyle from "../base/RUIWithStyle";
import Running from "../base/Running";

export class RUIContext extends RUIWithStyle {
    IAmRUIContext = true
    contextId?: string

    get contexts() {
        if (!this.contextId) return {}
        return Running.ContextStore[this.contextId] ?? {}
    }

    passDownContext() {
        if (!this.contextId) return
        this.forEachChild(child => {
            // ---- if encounter ContextProvider, stop nesting, which means only use inner ContextProvider's contexts
            if (child.IAMContextProvider) return false
            if (child.IAmRUIContext) {
                child.contextId = this.contextId
                child.willUseContext = true
            }
        }, true)
    }
}
