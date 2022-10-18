import {StatusKey, StoreKey} from "./Decorator";

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
    let isFunc = StatusKey("CALLBACK", key)
    if (wrapper[storeKey] === true) {
        wrapper[storeKey] = wrapper[key]
        let props = wrapper[key]
        if (wrapper[isFunc] === true) props = props()
        wrapper[key] = spreadProps ? hook(...props) : hook(props)
    } else if (wrapper[statusKey]) {
        let props = wrapper[storeKey]
        if (wrapper[isFunc] === true) props = props()
        wrapper[key] = spreadProps ? hook(...props) : hook(props)
    }
}

export function ResolveContext(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "CONTEXT")) return callback()
    let key = getKeyFromStatus(statusKey, "CONTEXT")
    if (wrapper.contexts[key] === undefined) return callback()
    wrapper[key] = wrapper.contexts[key]
    if (wrapper.customProps.contextStore === undefined) wrapper.customProps.contextStore = {}
    wrapper.customProps.contextStore[key] = wrapper[key]
}

export function ResolveContexts(wrapper: any, statusKey: string, callback: ()=>any=()=>null) {
    if (!isStatusKey(statusKey, "CONTEXTS")) return callback()
    let key = getKeyFromStatus(statusKey, "CONTEXTS")
    wrapper[key] = wrapper.contexts
    wrapper.customProps.contextStore = wrapper.contexts
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
    if (wrapper.customProps.dotPropStore === undefined) wrapper.customProps.dotPropStore = {}
    wrapper.customProps.dotPropStore[key] = wrapper[key]
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
    hook(...props)
}