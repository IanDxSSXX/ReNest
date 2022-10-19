import {StatusKey, StoreKey} from "./Decorator";
import {useRef, useState} from "react";

function isStatusKey(statusKey: string, name: string) {
    return statusKey.startsWith("_STATUS_" + name + "_")
}

function getKeyFromStatus(statusKey: string, name: string) {
    return statusKey.replace("_STATUS_" + name + "_", "")
}
// ---- resolver
export function ResolveHook(wrapper: any, statusKey: string, hookName: string, spreadProps: boolean=false, callback: ()=>any=()=>null) {
    // ---0 _HN_STORE_ true (yes)
    //      _HN_key    true
    //      key        raw
    // ---> _HN_STORE_ <-- key
    // ---> key        <-- useHook(key)
    // ---1 _HN_STORE_ raw
    //      _HN_key    true (yes)
    //      key        useHook(key)
    // ---> key        <-- useHook(_HN_STORE_)
    if (!isStatusKey(statusKey, hookName)) return callback()
    let key = getKeyFromStatus(statusKey, hookName)
    let hook = wrapper[StoreKey(`_${hookName}_FUNC_`, key)]
    if (!hook) return
    let storeKey = StoreKey(hookName, key)
    let isDerived = StatusKey("DERIVED", key)
    let props
    if (wrapper[storeKey] === "__FIRST_IN__") {
        props = wrapper[key]
        wrapper[storeKey] = props
    } else if (wrapper[statusKey]) {
        props = wrapper[storeKey]
    }
    if (wrapper[isDerived] === true) props = props()
    wrapper[key] = spreadProps ? hook(...props) : hook(props)
}

export function ResolveContext(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "CONTEXT")) return callback()
    let key = getKeyFromStatus(statusKey, "CONTEXT")
    if (wrapper.contexts[key] === undefined) return
    wrapper[key] = wrapper.contexts[key]
    wrapper.customProps.contextNameStore.push(key)
}

export function ResolveState(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "STATE")) return callback()
    let key = getKeyFromStatus(statusKey, "STATE")
    let storeKey = StoreKey("STATE", key)
    let isDerived = StatusKey("DERIVED", key)

    let isFirstIn = wrapper[storeKey] === "__FIRST_IN__"
    let value
    if (isFirstIn) {
        value = wrapper[key]
        wrapper[storeKey] = value
    } else {
        value = wrapper[storeKey]
    }
    // ---- set new state when use callback
    if (wrapper[isDerived] === true) value = value()
    let [state, setState] = HookWrapper(useState, value)
    // ---- equivalent to getDerivedStateFromProps
    if (isFirstIn && state !== value) setState(value)

    let firstCapitalKey = key.replace(/^[a-z]/, l=>l.toUpperCase())
    // ---- access setValue by using this.setKey
    wrapper[`set${firstCapitalKey}`] = setState
    Object.defineProperty(wrapper, key, {
        get: () => state,
        set: (value: any) => {setState(value)}
    })
}

export function ResolveRef(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "REF")) return callback()
    let key = getKeyFromStatus(statusKey, "REF")
    let storeKey = StoreKey("REF", key)
    let isDerived = StatusKey("DERIVED", key)

    let isFirstIn = wrapper[storeKey] === "__FIRST_IN__"
    let value
    if (isFirstIn) {
        value = wrapper[key]
        wrapper[storeKey] = value
    } else {
        value = wrapper[storeKey]
    }
    // ---- set new state when use callback
    if (wrapper[isDerived] === true) value = value()
    let ref = HookWrapper(useRef, value)

    wrapper[`${key}Ref`] = ref

    Object.defineProperty(wrapper, key, {
        get: () => ref.current,
        set: (value: any) => {ref.current = value}
    })
}

export function ResolveContexts(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "CONTEXTS")) return callback()
    let key = getKeyFromStatus(statusKey, "CONTEXTS")
    wrapper[key] = wrapper.contexts
    wrapper.customProps.contextNameStore = Object.keys(wrapper.contexts)
}

export function ResolveProp(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "PROP")) return callback()
    let key = getKeyFromStatus(statusKey, "PROP")
    wrapper[key] = wrapper.props[key] ?? wrapper[key]
}

export function ResolveDotPropWrapper(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    // ---- call in init
    if (!isStatusKey(statusKey, "DOTPROP")) return callback()
    let key = getKeyFromStatus(statusKey, "DOTPROP")
    // --eg @DotProp dotProp = 1
    // ---0 default_dotProp = 1
    wrapper[StoreKey("DOTPROP_DEFAULT", key)] = wrapper[key]
    // ---1 dotProp = (props) => { setValue and return this }
    let dotPropFunc = wrapper[StoreKey("DOTPROP_FUNC", key)]
    // ---2 store_dotProp = props
    wrapper[key] = dotPropFunc(wrapper)
}

export function ResolveDotProp(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "DOTPROP")) return callback()
    let key = getKeyFromStatus(statusKey, "DOTPROP")
    // ---3 dotProp = props ?? default prop
    let wrapperValue = wrapper[StoreKey("DOTPROP", key)] ?? wrapper[StoreKey("DOTPROP_DEFAULT", key)]
    wrapper[key] = wrapperValue === "undefined" ? undefined : wrapperValue    // ---- when you do not want any parameter
    // ---4 add to customProps for memo refreshing
    wrapper.customProps.dotPropNameStore.push(key)
}

export function ResolveObserve(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "OBSERVE")) return callback()
    let key = getKeyFromStatus(statusKey, "OBSERVE")
    let stateKey = key.substr(1)
    if (!wrapper.hasOwnProperty(stateKey)) return
    wrapper.lifecycle.observe.push({func: wrapper[key], states: [(wrapper:any) => wrapper[stateKey]]})
}

// ---- decorator
// ---- react treat useXXX as a hook and Xxxx as a component,
//      can't use hook in a callback, so make react view it as a component
export function HookWrapper(hook: Function, ...props: any[]) {
    return hook(...props)
}