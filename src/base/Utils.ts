import {CSSProperties, useEffect, useRef, useState} from "react";
import * as uuid from "uuid";

export function IsFirstRender() {
    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
}

// ---* State
export class RUIState {
    private readonly _value: any
    private readonly setProp: any
    set value(newProp: any) {
        this.setProp(newProp)
    }
    get value() {
        return this._value
    }

    setState(value: any, callback: ()=>any) {
        this.setProp(value, callback)
    }
    constructor(prop: any, setProp: any) {
        this.setProp = setProp
        this._value = prop
    }
}

export function useRUIState(value: any) {
    let [prop, setProp] = useState(value)
    return new RUIState(prop, setProp)
}

// ---* Range
export class Range {
    startNum: number
    endNum: number
    constructor(first: number, second?: number) {
        if (second) {
            this.startNum = first
            this.endNum = second
        } else {
            this.startNum = 0
            this.endNum = first
        }
    }
    asArray() {
        return Array.from({length: (this.endNum - this.startNum)}, (v, k) => k + this.startNum)
    }
}
export function range(first: number, second?: number) {
    return new Range(first, second)
}

// ---* class type
export function isInstanceOf(obj: any, typeName: string) {
    const protoTypeNameChain = []
    let protoType = Object.getPrototypeOf(obj)
    while (protoType) {
        protoTypeNameChain.push(protoType.constructor.name)
        protoType = protoType.__proto__
    }
    return protoTypeNameChain.includes(typeName)
}


export interface StyleSheet {
    [key: string]: CSSProperties
}

// ---* color utils
export function rgbToHex(value: string) {
    let rgb = value.replace("rgb", "").replace("(", "").replace(")", "").split(",")
    let r = +rgb[0], g = +rgb[1], b = +rgb[2]
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function colorEqual(color1: string, color2: string) {
    if (color1.startsWith("rgb")) {
        color1 = rgbToHex(color1).toLocaleUpperCase()
    }
    if (color2.startsWith("rgb")) {
        color2 = rgbToHex(color2).toLocaleUpperCase()
    }
    return color1.toLocaleUpperCase() === color2.toLocaleUpperCase()
}


export function getComputedStyle(el: Element, styleProp: string): string {
    const defaultView = el.ownerDocument.defaultView;
    if (defaultView && defaultView.getComputedStyle) {
        styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    }

    return '';
}


export function pixelToInt(value: string) {
    return +value.replace("px", "")
}


export function flattened(array: any[]) {
    return array.reduce((accumulator:any, value:any) => accumulator.concat(value), [])
}


export function filteredObject(obj: any, deletedKeys: string[]) {
    const filteredKeys = Object.keys(obj).filter(key => !deletedKeys.includes(key))
    return filteredKeys.reduce((newObj:any, key:any) => (newObj[key] = (obj as any)[key], newObj), {});
}

export function uid() {
    return uuid.v4()
}

export function objectEquals(obj1: any, obj2: any) {
    const equals = (a:any, b:any) => JSON.stringify(a) === JSON.stringify(b);

    const obj1Key = Object.keys(obj1).sort()
    const obj2Key = Object.keys(obj2).sort()

    if (!equals(obj1Key, obj2Key)) {
        return false
    }
    const results = obj1Key.map((item) => obj1[item] === obj2[item])
    return !results.includes(false)
}


// ---- trigger
export class Trigger {
    private readonly _value: boolean
    private readonly setProp: any

    get value() {
        return this._value
    }

    trigger() {
        this.setProp(!this._value)
    }

    constructor(prop: boolean, setProp: any) {
        this.setProp = setProp
        this._value = prop
    }
}

export function useTrigger() {
    const [triggerValue, setTriggerValue] = useState(false)
    return new Trigger(triggerValue, setTriggerValue)
}

export function useTriggerEvent(trigger: Trigger, triggerEvent: (()=>any)) {
    const isFirstRender = IsFirstRender()
    const triggerValue = (trigger === null || trigger === undefined) ? null : trigger.value
    useEffect(() => {
        if (triggerValue !== null && !isFirstRender) {
            triggerEvent()
        }
    }, [triggerValue])
}