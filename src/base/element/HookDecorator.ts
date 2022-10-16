import {useRUIState} from "../utils/Utils";
import {useRef} from "react";
import {useTheme} from "../theme/ThemeProvider";
import {ReactUIElement} from "./ReactUIElement";

// ---- resolver
export function ResoleHook(wrapper: any, statusKey: string, hookName: string, spreadProps?: boolean) {
    // ---0 _HN_STORE_ true (yes)
    //      _HN_key    true
    //      key        raw
    // ---> _HN_STORE_ <-- key
    // ---> key        <-- useHook(key)
    // ---1 _HN_STORE_ raw
    //      _HN_key    true (yes)
    //      key        useHook(key)
    // ---> key        <-- useHook(_HN_STORE_)
    if (!statusKey.startsWith("_"+hookName+"_")) return
    let key = statusKey.replace("_"+hookName+"_", "")
    if (!wrapper[statusKey]) return
    let hook = wrapper["_"+hookName+"_FUNC_"+key]
    if (!hook) return
    let storeKey = `_${hookName}_STORE_`+key
    let isFunc = `_ISCALLBACK_`+key
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

export function ResoleContext(wrapper: any, contextKey: string) {
    if (!contextKey.startsWith("_CONTEXT_")) return
    let key = contextKey.replace("_CONTEXT_", "")
    if (wrapper.contexts[key] === undefined) return
    wrapper[key] = wrapper.contexts[key]
    if (wrapper.customProps.contextStore === undefined) {
        wrapper.customProps.contextStore = {}
    }
    wrapper.customProps.contextStore[key] = wrapper[key]
}

export function ResoleDotProp(wrapper: any, key: string) {
    if (!wrapper["_DOTPROP_"+key]) return
    wrapper[key] = wrapper.C[key]
}


// ---- decorator
// ---- react treat useXXX as a hook and Xxxx as a component,
//      can't use hook in a callback, so make react view it as a component
export function HookWrapper(hook: Function, ...props: any[]) {
    hook(...props)
}

function createHookDecorator(target: any, propertyKey: string, hookName: string, hookFunc: Function) {
    Object.defineProperty(target, "_"+hookName+"_"+propertyKey, {
        value: true,
        writable: true
    })
    Object.defineProperty(target, "_"+hookName+"_STORE_" + propertyKey, {
        value: true,
        writable: true
    })
    Object.defineProperty(target, "_"+hookName+"_FUNC_" + propertyKey, {
        value: hookFunc
    })
}

export function Callback(target: any, propertyKey: string) {
    Object.defineProperty(target, "_ISCALLBACK_"+propertyKey, {
        value: true,
    })
}

export function Hook(hook: Function) {
    return function(target: any, propertyKey: string) {
        createHookDecorator(target, propertyKey, "HOOK", hook)
    }
}

export function SHook(hook: Function) {
    return function(target: any, propertyKey: string) {
        createHookDecorator(target, propertyKey, "SHOOK", hook)
    }
}

export const State = Hook(useRUIState)

export const Ref = Hook(useRef)

export const Theme = SHook(useTheme)

export function Context(target: any, propertyKey: string) {
    Object.defineProperty(target, "_CONTEXT_"+propertyKey, {
        value: true,
        writable: true
    })
}

export function DotProp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    descriptor.value = function(...args: any[]) {
        if (args.length === 0) {
            // ---- check if there's default value, use toString and regex to match the first default value
            let functionString = originalValue.toString()
            let regex = /arguments.length > 0 && arguments\[0] !== undefined \? arguments\[0] : ([\s\S]*?);/g
            let match = functionString.match(regex)
            if (match?.length === 1) {
                let defaultValue = match[0].replace(regex, "$1");
                (this as ReactUIElement).setCustomProp(propertyKey, eval("("+defaultValue+")"))
            }
        } else if(args.length === 1) {
            (this as ReactUIElement).setCustomProp(propertyKey, args[0])
        }
        return this
    }

    Object.defineProperty(target, "_DOTPROP_"+propertyKey, {
        value: true,
        writable: true
    })
}