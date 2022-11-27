import RTBase from "../base/RTBase";
import {filteredObject} from "../utils/Utils";
import RTConfig from "../base/RTConfig";
import {RTContext} from "../context/RTContext";

export class RTElement extends RTContext {
    customProps: any = {contextNameStore: [], dotPropNameStore: []}
    dotPropNames: string[] = []
    IAmTagView = false

    registerView(view: RTBase) {
        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        const newElementStyles = this.elementProps.style
        const newElementProps = filteredObject(this.elementProps, ["key", "className", "style"])
        view.elementProps.style = {...view.elementProps.style, ...newElementStyles}
        view.elementProps = {...view.elementProps, ...newElementProps}

        this.elementChildren = [view]
        this.passDownContext()
        if (RTConfig.debug) view.parentNode = this

        return view
    }


}