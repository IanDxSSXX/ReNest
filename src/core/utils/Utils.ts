export function flattened(array: any[]) {
    return array.reduce((accumulator:any, value:any) => accumulator.concat(value), [])
}


export function filteredObject(obj: any, deletedKeys: string[]) {
    const filteredKeys = Object.keys(obj).filter(key => !deletedKeys.includes(key))
    return filteredKeys.reduce((newObj:any, key:any) => (newObj[key] = (obj as any)[key], newObj), {});
}


export function uid() {
    let d = new Date().getTime();  //Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;  //random number between 0 and 16
        if (d > 0) {  //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {  //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    })
}


export const required = "__REQUIRED__" as any
