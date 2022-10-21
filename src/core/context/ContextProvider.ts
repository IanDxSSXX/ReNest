import {FragmentView} from "../utils/RTWrapper";
import {createElement, memo, useEffect, useRef} from "react";
import {uid} from "../utils/Utils";
import isEqual from "lodash.isequal";
import Running from "../base/Running";
import {RTElement} from "../view/RTElement";

// ---* condition
function ContextWrapper({wrapper}: any) {
    // ---- make sure contextId won't change
    //      contextId is current ContextProvider's id, contextIds are nested ContextProvider's ids
    const contextId = useRef(null)
    const contextIds = useRef<any>(null)
    if (contextId.current !== null) {
        wrapper.contextId = contextId.current
        wrapper.contextIds = contextIds.current
    } else {
        wrapper.contextIds = [...wrapper.contextIds, wrapper.contextId]
    }
    useEffect(() => {
        contextId.current = wrapper.contextId
        contextIds.current = wrapper.contextIds
        return () => {
            delete Running.ContextStore[wrapper.contextId]
        }
    },[])

    Running.ContextStore[wrapper.contextId] = wrapper.contextStoreValue
    let element = wrapper.__children[0]

    return wrapper.key(wrapper.contextId).registerView(element).asReactElement()
}

const ContextWrapperMemorized = memo(ContextWrapper, (prev, curr) => {
    let preElement = prev.wrapper.__children[0]
    let currElement = curr.wrapper.__children[0]

    let contextEqual = isEqual(prev.wrapper.contextStoreValue, curr.wrapper.contextStoreValue)
    return contextEqual && (preElement.IAmRTElement && preElement.equalTo(currElement))
})

class ContextProvider extends RTElement {
    contextStoreValue = {}
    contextId = uid()
    name = "ContextProvider"

    constructor(...__children: any) {
        super("", ...__children);
    }

    context(value: {[key:string]: any}) {
        this.contextStoreValue = {...this.contextStoreValue, ...value}
        return this
    }

    asReactElement() {
        // ---- wrap __children
        this.__children = [FragmentView(...this.__children)]

        return createElement(
            ContextWrapperMemorized,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}

export default (...__children: any[]) => new ContextProvider(...__children)

