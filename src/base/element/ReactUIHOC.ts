import {ReactUIHelper} from "../utils/ReactUIHelper";
import {memo, useEffect} from "react";
import lodash from "lodash"
import {HookWrapper, ResolveHook} from "./Decorator";


const ReactElementWrapper = ({wrapper}:any) => {
    // ---- decorators **so tricky**
    for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(wrapper))) {
        ResolveHook(wrapper, key, "HOOK", false, ()=>    // ---n any hook with single prop: @Hook(useRef)
        ResolveHook(wrapper, key, "SHOOK", true)     // ---n any hook with multiple props: @Hook(useTheme)
        )
    }

    // ---- call Body
    const component = wrapper.Body!(wrapper.props) as any
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
    didUpdate.forEach(({func, states}: any)=>{
        HookWrapper(useEffect, () => {func()}, states)
    })

    // ---- register and turn into React Element
    let reactComponent = component.IAmReactUI ? wrapper.registerView(component).asReactElement() : component
    return reactComponent
}

export const ReactElementWrapperMemorized = memo(ReactElementWrapper, (pre, curr)=> {
    let preWrapper = pre.wrapper, currWrapper = curr.wrapper
    // ---- always re-render if not use memo
    let useMemo = currWrapper.customProps.useMemo??true
    if (!useMemo) return false

    // ---- styles and custom props
    // ---1 element props, update on change by default using deep equal
    if (!lodash.isEqual(preWrapper.elementProps, currWrapper.elementProps)) return false

    // ---2 themes, update on change by default using deep equal
    if (!lodash.isEqual(preWrapper.theme, currWrapper.theme)) return false

    // -4.5 custom and input props with shouldUpdate hook
    if (!!currWrapper.lifecycle.shouldUpdate) {
        // ---- props and contexts and dotProps
        return currWrapper.lifecycle.shouldUpdate(
            {...preWrapper.props, ...preWrapper.customProps.contextStore, ...preWrapper.customProps.dotPropStore},
            {...currWrapper.props, ...currWrapper.customProps.contextStore, ...currWrapper.customProps.dotPropStore})
    }

    // ---4 custom props, update on change by default using deep equal, contains dot prop and context
    //      no function hooks
    if (!lodash.isEqual(preWrapper.customProps, currWrapper.customProps)) return false

    // ---5 input props
    if (!lodash.isEqual(preWrapper.props, currWrapper.props)) return false

    return true
})

