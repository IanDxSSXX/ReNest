import RUIBase from "../base/RUIBase";
import {createElement, memo, ReactElement, useCallback, useEffect, useMemo, useRef} from "react";
import {FragmentView} from "../utils/RUIWrapper";
import {RUITheme} from "../theme/RUITheme";
import lodash from "lodash";
import {filteredObject, uid} from "../utils/Utils";
import {RUIElement} from "../element/RUIElement";

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

    return preElement.IAMFragment || (preElement.IAmRUIElement && preElement.equalTo(currElement))
})

class ConditionView extends RUIElement {
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

    asReactElement() {
        let ruiElement = (this.conditionMap[this.variable] ??
            this.conditionMap["_"] ??
            FragmentView)()

        this.registerView(ruiElement)

        return createElement(
            ConditionWrapperMemorized,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}

export default (variable: any, conditionMap: any) => new ConditionView(variable, conditionMap)


