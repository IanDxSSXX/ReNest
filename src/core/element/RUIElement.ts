import {RUITheme} from "../theme/RUITheme";
import RUIBase from "../base/RUIBase";
import {filteredObject} from "../utils/Utils";

export class RUIElement extends RUITheme {
    customProps: any = {contextNameStore: [], dotPropNameStore: []}

    registerView(view: RUIBase) {
        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        const newElementStyles = this.elementProps.style
        const newElementProps = filteredObject(this.elementProps, ["key", "className", "style"])
        view.elementProps.style = {...view.elementProps.style, ...newElementStyles}
        view.elementProps = {...view.elementProps, ...newElementProps}

        this.children = [view]
        this.passDownTheme()
        this.passDownContext()

        return view
    }
}