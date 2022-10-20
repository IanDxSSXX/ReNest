import {useEffect, useRef, useState as useReactState} from "react";

export function IsFirstRender() {
    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
}

// ---* State
export class RTState<T> {
    private readonly _value: T
    private readonly setProp: any
    set value(newProp: any) {
        this.setProp(newProp)
    }
    get value() {
        return this._value
    }
    setValue(func: (prev: T)=>T) {
        this.setProp(func)
    }
    constructor(prop: T, setProp: any) {
        this.setProp = setProp
        this._value = prop
    }
}

export function useState<T>(value: T) {
    let [prop, setProp] = useReactState<T>(value)
    return new RTState<T>(prop, setProp)
}


// ---- trigger
export class Trigger {
    private readonly _value: boolean
    private readonly setProp: any
    private _props = useRef()

    get value() {
        return this._value
    }

    trigger(props?: any) {
        this._props.current = props
        this.setProp(!this._value)
    }

    get props() {
        return this._props.current
    }

    constructor(prop: boolean, setProp: any) {
        this.setProp = setProp
        this._value = prop
    }
}

export function useTrigger() {
    const [triggerValue, setTriggerValue] = useReactState(false)
    return new Trigger(triggerValue, setTriggerValue)
}

export function useTriggerEffect(trigger: Trigger, triggerEvent: ()=>any) {
    const isFirstRender = IsFirstRender()
    const triggerValue = !trigger ? null : trigger.value
    useEffect(() => {
        if (triggerValue !== null && !isFirstRender) {
            return triggerEvent()
        }
    }, [triggerValue])
}