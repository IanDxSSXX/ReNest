import ReactUIBase from "../base/ReactUIBase";
import {createElement, memo, ReactElement, useCallback, useEffect, useMemo, useRef} from "react";
import {FragmentView} from "../utils/ReactUIWrapper";
import {ReactUITheme} from "../theme/ReactUITheme";
import lodash from "lodash";
import {filteredObject, uid} from "../utils/Utils";

// ---* condition
function ConditionWrapper({wrapper}: any) {
    // ---- very important, see notes
    const conditionIDs = useRef(null)
    if (conditionIDs.current !== null) wrapper.conditionIDs = conditionIDs.current
    useEffect(() => {
        conditionIDs.current = wrapper.conditionIDs
    },[])

    return wrapper.children[0].key(wrapper.conditionIDs[wrapper.variable]??"_").asReactElement()
}

const ConditionWrapperMemorized = memo(ConditionWrapper, (prev, curr) => {
    let preElement = prev.wrapper.children[0]
    let currElement = curr.wrapper.children[0]

    return preElement.IAMFragment || (preElement.IAmReactUIElement && preElement.equalTo(currElement))
})

class ConditionView extends ReactUITheme {
    variable: any
    conditionMap: any
    conditionIDs: any = {}

    constructor(variable: any, conditionMap: any) {
        super("");
        this.variable = variable
        this.conditionMap = conditionMap
        for (let key in this.conditionMap) {
            this.conditionIDs[key] = uid()
        }
    }

    registerView(view: ReactUIBase) {
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

    asReactElement() {
        let ruiElement = (this.conditionMap[this.variable] ??
            this.conditionMap["_"] ??
            FragmentView)()

        this.registerView(ruiElement)

        return createElement(
            ConditionWrapperMemorized,
            {wrapper:this}
        )
    }
}

export default (variable: any, conditionMap: any) => new ConditionView(variable, conditionMap)


