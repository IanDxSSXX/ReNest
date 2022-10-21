import {RTTheme} from "../theme/RTTheme";
import RTBase from "../base/RTBase";
import {filteredObject} from "../utils/Utils";
import RTConfig from "../base/RTConfig";

export class RTElement extends RTTheme {
    _customProps = {contextNameStore: [], dotPropNameStore: []}
    dotPropNames: string[] = []
    IAmTagView = false

    registerView(view: RTBase) {
        // ---- react only use key in React.createElement, so no need for pass down
        // ---- and deleting className to avoid some confusion
        const newElementStyles = this._elementProps.style
        const newElementProps = filteredObject(this._elementProps, ["key", "className", "style"])
        view._elementProps.style = {...view._elementProps.style, ...newElementStyles}
        view._elementProps = {...view._elementProps, ...newElementProps}

        this._children = [view]
        this.passDownTheme()
        this.passDownContext()
        if (RTConfig.debug) view._parentNode = this

        return view
    }

    withDotProp(...dotPropNames: string[]) {
        for (let dotPropName of dotPropNames) {
            (this as any)[dotPropName] = (value: any) => {
                this._elementProps[dotPropName] = value
                return this
            }
        }
        return this as any
    }

}