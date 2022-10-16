function StatusKey(name: string, key: string) {
    return "_STATUS_" + name + "_" + key
}

function StoreKey(name: string, key: string) {
    return "_STORE_" + name + "_" + key
}

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


// ---- decorator
// ---- react treat useXXX as a hook and Xxxx as a component,
//      can't use hook in a callback, so make react view it as a component
export function HookWrapper(hook: Function, ...props: any[]) {
    hook(...props)
}

function createHookDecorator(target: any, propertyKey: string, hookName: string, hookFunc: Function) {
    Object.defineProperty(target, StatusKey(hookName, propertyKey), {
        value: true,
        writable: true
    })
    Object.defineProperty(target, StoreKey(hookName, propertyKey), {
        value: true,
        writable: true
    })
    Object.defineProperty(target, StoreKey(`_${hookName}_FUNC_`, propertyKey), {
        value: hookFunc
    })
}

// ---- in this situation:
// --eg @State first = 1
// --no @State second = this.first.value      (because it will treat this.first as 1)
// -yes @Callback@State second = () => this.first.value
export function Callback(decorator: Function) {
    return function(target: any, propertyKey: string) {
        decorator(target, propertyKey)
        Object.defineProperty(target, StatusKey("CALLBACK", propertyKey), {
            value: true,
        })
    }
}

export const Hook = (hook: Function) => {
    return function(target: any, propertyKey: string) {
        createHookDecorator(target, propertyKey, "HOOK", hook)
    }
}

export const SHook = (hook: Function) => {
    return function(target: any, propertyKey: string) {
        createHookDecorator(target, propertyKey, "SHOOK", hook)
    }
}


export const Context = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("CONTEXT", propertyKey), {
        value: true,
    })
}

export const Prop = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("PROP", propertyKey), {
        value: true,
    })
}

export const DotProp = (target: any, propertyKey: string) => {
    Object.defineProperty(target, StatusKey("DOTPROP", propertyKey), {
        value: true,
        writable: true
    })

    Object.defineProperty(target, StoreKey("DOTPROP_FUNC", propertyKey), {
        value: (ruiElement: any) => (props: any) => {
            ruiElement[StoreKey("DOTPROP", propertyKey)] = props ?? "undefined"
            return ruiElement
        }
    })
}