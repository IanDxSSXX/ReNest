import {flattened, uid} from "../utils/Utils";
import RUIWithStyle from "../base/RUIWithStyle";
import Running from "../base/Running";

export class RUIContext extends RUIWithStyle {
    IAmRUIContext = true
    contextIds: string[] = []

    get contexts() {
        let context = {}
        for (let contextId of this.contextIds) {
            context = {...context, ...Running.ContextStore[contextId]}
        }
        return context
    }

    passDownContext() {
        this.forEachChild(child => {
            // ---- if encounter ContextProvider, stop nesting, which means only use inner ContextProvider's contexts
            if (child.IAmRUIContext) {
                child.contextIds = [...new Set([...child.contextIds, ...this.contextIds])]
            }
        }, true)
    }
}
