import {RTTheme} from "../theme/RTTheme";
import RTBase from "../base/RTBase";
import {filteredObject} from "../utils/Utils";
import RTConfig from "../base/RTConfig";

export class RTElement extends RTTheme {
    customProps: any = {contextNameStore: [], dotPropNameStore: []}
    dotPropNames: string[] = []

    registerView(view: RTBase) {
        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        const newElementStyles = this.elementProps.style
        const newElementProps = filteredObject(this.elementProps, ["key", "className", "style"])
        view.elementProps.style = {...view.elementProps.style, ...newElementStyles}
        view.elementProps = {...view.elementProps, ...newElementProps}

        this.children = [view]
        this.passDownTheme()
        this.passDownContext()
        if (RTConfig.debug) view.parentNode = this

        return view
    }

    withDotProp(...dotPropNames: string[]) {
        for (let dotPropName of dotPropNames) {
            (this as any)[dotPropName] = (value: any) => {
                this.elementProps[dotPropName] = value
                return this
            }
        }
        return this as any
    }

}