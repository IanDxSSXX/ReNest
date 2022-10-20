import {createElement, memo, useEffect, useRef} from "react";
import {FragmentView} from "../utils/RUIWrapper";
import {uid} from "../utils/Utils";
import {RUIElement} from "../element/RUIElement";
import {RUIHelper} from "../utils/RUIHelper";

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
        try {
            let ruiElement = (this.conditionMap[this.variable] ??
                this.conditionMap["_"] ??
                FragmentView)()
            this.registerView(ruiElement)

            return createElement(
                ConditionWrapperMemorized,
                {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
            )
        } catch (e) {
            RUIHelper.throw("ConditionView must have 2 props, the first one is a variable, the second one is a map of functions, each of which returns a reactui element")
            return null as any
        }


    }
}

export default (variable: any, conditionMap: any) => new ConditionView(variable, conditionMap)


