import {flattened} from "../utils/Utils";
import ReactUIWithStyle from "../base/ReactUIWithStyle";
import {ReactUIHelper} from "../utils/ReactUIHelper";
import ReactUIBase from "../base/ReactUIBase";

export class ReactUIContext extends ReactUIWithStyle {
    IAmReactUIContext = true
    ruiContext: {[key: string]: {[key: string]: any}} = {}
    ruiContextTag: string[] = ["default"]

    addContextTag(newTag: string) {
        this.ruiContextTag = [newTag, ...this.ruiContextTag]
        return this
    }

    // ---- add tag
    contextTag(value: string) {
        this.addContextTag(value)
        return this
    }

    passDownContext(view: ReactUIBase) {
        if (view.IAmReactUIContext && !view.IAMContextProvider) {
            (view as ReactUIContext).ruiContext = this.ruiContext
        }
    }

}
