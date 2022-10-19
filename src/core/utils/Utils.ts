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
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    })
}


