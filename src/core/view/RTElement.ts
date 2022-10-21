import {RTTheme} from "../theme/RTTheme";
import RTBase from "../base/RTBase";
import {filteredObject} from "../utils/Utils";
import RTConfig from "../base/RTConfig";

export class RTElement extends RTTheme {
    __customProps: any = {contextNameStore: [], dotPropNameStore: []}
    dotPropNames: string[] = []
    IAmTagView = false

    registerView(view: RTBase) {
        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        const newElementStyles = this.__elementProps.style
        const newElementProps = filteredObject(this.__elementProps, ["key", "className", "style"])
        view.__elementProps.style = {...view.__elementProps.style, ...newElementStyles}
        view.__elementProps = {...view.__elementProps, ...newElementProps}

        this.__children = [view]
        this.passDownTheme()
        this.passDownContext()
        if (RTConfig.debug) view.__parentNode = this

        return view
    }

    withDotProp(...dotPropNames: string[]) {
        for (let dotPropName of dotPropNames) {
            (this as any)[dotPropName] = (value: any) => {
                this.__elementProps[dotPropName] = value
                return this
            }
        }
        return this as any
    }

}