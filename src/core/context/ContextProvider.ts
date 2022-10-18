import {Fragment, FragmentView} from "../utils/RUIWrapper";
import {createElement, memo, useEffect, useRef} from "react";
import {RUITheme} from "../theme/RUITheme";
import {filteredObject, uid} from "../utils/Utils";
import RUIBase from "../base/RUIBase";
import lodash from "lodash";
import Running from "../base/Running";
import {RUIElement} from "../element/RUIElement";

// ---* condition
function ContextWrapper({wrapper}: any) {
    // ---- make sure contextId won't change
    const contextId = useRef(null)
    if (contextId.current !== null) wrapper.contextId = contextId.current
    useEffect(() => {
        contextId.current = wrapper.contextId
        return () => {
            delete Running.ContextStore[wrapper.contextId]
        }
    },[])

    Running.ContextStore[wrapper.contextId] = wrapper.contextStoreValue
    let element = wrapper.children[0]

    return wrapper.registerView(element).asReactElement()
}

const ContextWrapperMemorized = memo(ContextWrapper, (prev, curr) => {
    let preElement = prev.wrapper.children[0]
    let currElement = curr.wrapper.children[0]

    let contextEqual = lodash.isEqual(prev.wrapper.contextStoreValue, curr.wrapper.contextStoreValue)
    return contextEqual && (preElement.IAmRUIElement && preElement.equalTo(currElement))
})

class ContextProvider extends RUIElement {
    IAMContextProvider = true
    contextStoreValue = {}
    contextId = uid()

    constructor(...children: any) {
        super("", ...children);
    }

    context(value: {[key:string]: any}) {
        this.contextStoreValue = {...this.contextStoreValue, ...value}
        return this
    }

    asReactElement() {
        // ---- wrap children
        this.children = [FragmentView(...this.children)]

        return createElement(
            ContextWrapperMemorized,
            {wrapper:this, ...!!this.P.key?{key: this.P.key}:{} }
        )
    }
}

export default (...children: any[]) => new ContextProvider(...children)

