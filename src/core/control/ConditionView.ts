import {createElement, memo, useEffect, useRef} from "react";
import {FragmentView} from "../utils/RTWrapper";
import {uid} from "../utils/Utils";
import {RTElement} from "../element/RTElement";
import {RTHelper} from "../utils/RTHelper";

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

    return preElement.IAMFragment || (preElement.IAmRTElement && preElement.equalTo(currElement))
})

class ConditionView extends RTElement {
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
            RTHelper.throw("ConditionView must have 2 props, the first one is a variable, the second one is a map of functions, each of which returns a renest element")
            return null as any
        }


    }
}

export default (variable: any, conditionMap: any) => new ConditionView(variable, conditionMap)


