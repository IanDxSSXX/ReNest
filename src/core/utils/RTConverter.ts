import {TagView} from "./RTWrapper";

function Converter(tagMap: {[key:string]:any}, dotPropMap?: {[key:string]:string[]}) {
    let elementMap: any = {}
    for (let rtName in tagMap) {
        elementMap[rtName] = TagView(tagMap[rtName], (dotPropMap??{})[rtName])
    }

    return elementMap
}

export {Converter}