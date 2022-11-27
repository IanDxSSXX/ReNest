import {RTHelper} from "../utils/RTHelper";
import {createElement, memo, useEffect, useRef} from "react";
import {HookWrapper, ResolvePreset, ResolveHook, ResolveRef, ResolveState} from "./ResolveDecorator";
import {TagView} from "../utils/RTWrapper";
import {ErrorBoundary} from "../utils/ErrorBoundary";
import RTConfig from "../base/RTConfig";

const ReactElementWrapper = ({wrapper}:any) => {
    // ---- decorators **so tricky**
    for (let key of wrapper._propertyNamesTillRTView) {
        ResolveHook(wrapper, key, "HOOK", false, ()=>    // ---n any hook with single prop: @Hook(useRef)
        ResolveHook(wrapper, key, "SHOOK", true, () =>     // ---n any hook with multiple props: @SHook(useTheme)
        ResolveState(wrapper, key, () =>
        ResolveRef(wrapper, key, () =>
        ResolvePreset(wrapper, key)
        ))))
    }
    // ---- call Body
    // ---- **dangerous when view type is different because directly call will lead to inconsistent hooks**
    // ---- see ConditionView
    wrapper.Preset()
    let component = wrapper.Body(wrapper.props) as any
    // ---e
    if (!component) RTHelper.throw("RTView must have a proper return, current is null")
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

    const uid = useRef(null)
    if (uid.current !== null) wrapper.uid = uid.current

    // ---2 didMount and willUnmount
    useEffect(() => {
        firstIn.current = false
        didMount.map((func: any)=>func())

        uid.current = wrapper.uid

        return () => {
            willUnmount.map((func: any)=>func())
        }
    }, []);


    // ---- register and turn into React Element
    let newComponent = component
    if (component.IAmRT) {
        component = wrapper.registerView(component).key(wrapper.uid)
        newComponent = component.asReactElement()
        // ---- debug
        if (RTConfig.debug) {
            newComponent = createElement(ErrorBoundary, {children: newComponent, wrapper: component})
        }
    }

    return newComponent
}

export const ReactElementWrapperMemorized = memo(ReactElementWrapper, (prev, curr)=> {
    let preWrapper = prev.wrapper, currWrapper = curr.wrapper
    return preWrapper.equalTo(currWrapper)
})

