import {Range} from "./Utils";
import ReactUIBase from "../core/ReactUIBase";
import {ReactElement} from "react";
import ReactUIWithStyle from "../core/ReactUIWithStyle";
import {RUIFragment} from "./ReactUIWrapper";

// ---* condition
export function ConditionView<T=any>(variable: T, conditionMap: any): ReactUIWithStyle {
    let newViewFunc = conditionMap[variable]
    if (!newViewFunc) {
        newViewFunc = conditionMap[":"]
        if (!newViewFunc) {
            newViewFunc = RUIFragment
        }
    }
    return newViewFunc(variable)
}

// ---* for each
export function ForEach<T=any>(arr: T[], callback: (item: T, idx: number) => ReactUIBase | ReactElement) {
    return arr.map((value, index) => callback(value as T, index))
}

