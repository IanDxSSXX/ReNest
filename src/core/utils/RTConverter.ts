import {TagView} from "./RTWrapper";

function Converter(tagMap: {[key:string]:any}, propMap?: {[key:string]:string[]}, dotPropMap?: {[key:string]:string[]}) {
    let elementMap: any = {}
    for (let rtName in tagMap) {
        elementMap[rtName] = TagView(tagMap[rtName], (propMap??{})[rtName], (dotPropMap??{})[rtName])
    }

    return elementMap
}

export {Converter}