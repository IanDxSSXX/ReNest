import {RUIHelper} from "../utils/RUIHelper";
import {memo, useEffect, useRef} from "react";
import {HookWrapper, ResolveHook} from "./ResolveDecorator";


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
    if (!component) RUIHelper.error("RUIView must have a proper return, current is null")
    // ---- lifecycle
    let didMount = wrapper.lifecycle.didMount
    let willUnmount = wrapper.lifecycle.willUnmount
    let didUpdate =wrapper.lifecycle.didUpdate
    let observe =wrapper.lifecycle.observe

    // ---1 components update state
    let firstIn = useRef(true)
    didUpdate.forEach((func: any)=>{
        HookWrapper(useEffect, () => {
            if (!firstIn.current) func()
        })
    })
    observe.forEach(({func, states}: any)=>{
        HookWrapper(useEffect, () => {
            if (!firstIn.current) func()
        }, states.map((state:any)=>state(wrapper)))
    })

    // ---2 didMount and willUnmount
    useEffect(() => {
        firstIn.current = false
        didMount.map((func: any)=>func())
        return () => {
            willUnmount.map((func: any)=>func())
        }
    }, []);

    // ---- register and turn into React Element
    let reactComponent = component.IAmRUI ? wrapper.registerView(component).asReactElement() : component
    return reactComponent
}

export const ReactElementWrapperMemorized = memo(ReactElementWrapper, (prev, curr)=> {
    let preWrapper = prev.wrapper, currWrapper = curr.wrapper
    // ---- always re-render if not use memo
    if (!(currWrapper.customProps.useMemo??true)) return false
    return preWrapper.equalTo(currWrapper)
})


