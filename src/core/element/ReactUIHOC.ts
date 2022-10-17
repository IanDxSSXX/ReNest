import {ReactUIHelper} from "../utils/ReactUIHelper";
import {memo, useEffect} from "react";
import {HookWrapper, ResolveHook} from "./Decorator";


const ReactElementWrapper = ({wrapper}:any) => {
    // ---- decorators **so tricky**
    for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(wrapper))) {
        ResolveHook(wrapper, key, "HOOK", false, ()=>    // ---n any hook with single prop: @Hook(useRef)
        ResolveHook(wrapper, key, "SHOOK", true)     // ---n any hook with multiple props: @SHook(useTheme)
        )
    }
    // ---- call Body
    // ---- **dangerous when element type is different because directly call will lead to inconsistent hooks**
    // ---- see ConditionView
    const component = wrapper.Body(wrapper.props) as any
    // ---e
    if (!component) ReactUIHelper.error("ReactUIElement must have a proper return, current is null")
    // ---- lifecycle
    let didMount = wrapper.lifecycle.didMount
    let willUnmount = wrapper.lifecycle.willUnmount
    let didUpdate =wrapper.lifecycle.didUpdate
    // ---1 didMount and willUnmount
    useEffect(() => {
        !!didMount && didMount()
        return willUnmount
    }, []);
    // ---2 components update state
    (didUpdate ?? []).forEach(({func, states}: any)=>{
        HookWrapper(useEffect, () => {func()}, states)
    })

    // ---- register and turn into React Element
    let reactComponent = component.IAmReactUI ? wrapper.registerView(component).asReactElement() : component
    return reactComponent
}

export const ReactElementWrapperMemorized = memo(ReactElementWrapper, (prev, curr)=> {
    let preWrapper = prev.wrapper, currWrapper = curr.wrapper
    // ---- always re-render if not use memo
    if (!(currWrapper.customProps.useMemo??true)) return false
    return preWrapper.equalTo(currWrapper)
})


