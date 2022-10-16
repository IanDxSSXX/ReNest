import {flattened, uid} from "../utils/Utils";
import ReactUIWithStyle from "../base/ReactUIWithStyle";
import {ContextStore} from "./Store";
// import {C} from "./ContextProvider";

export class ReactUIContext extends ReactUIWithStyle {
    IAmReactUIContext = true
    ruiContextTag: string[] = ["default"]
    contextId: string = uid()
    willUseContext = false

    get contexts() {
        if (!this.willUseContext) return {}
        let context = {}
        for (let tag of [...new Set(this.ruiContextTag)]) {
            context = {...context, ...(ContextStore[this.contextId][tag] ?? {})}
        }

        return context
    }

    // ---- add tag
    addContextTag(newTag: string) {
        this.ruiContextTag = [newTag, ...this.ruiContextTag]
        return this
    }

    contextTag(value: string) {
        this.addContextTag(value)
        return this
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
