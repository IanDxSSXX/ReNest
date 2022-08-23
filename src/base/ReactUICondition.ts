import {Range} from "./Utils";
import ReactUIBase from "./ReactUIBase";
import {ReactElement} from "react";

// ---* condition
export function ConditionView(variable: any, conditionMap: any) {
    return conditionMap[variable] ?? (conditionMap["[default]"] ?? "")
}

// ---* for each
export function ForEach(arr: any[] | Range, callback: (item: any, idx: number) => ReactUIBase | ReactElement) {
    let array = arr instanceof Array ? arr: arr.asArray()
    return array.map((value, index) => callback(value, index))
}

