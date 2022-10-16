import {Range} from "./Utils";
import ReactUIBase from "../base/ReactUIBase";
import {ReactElement} from "react";
import ReactUIWithStyle from "../base/ReactUIWithStyle";
import {FragmentView} from "./ReactUIWrapper";

// ---* condition
export function ConditionView<T=any>(variable: T, conditionMap: any): any {
    let newViewFunc = conditionMap[variable]
    if (!newViewFunc) {
        newViewFunc = conditionMap[":"]
        if (!newViewFunc) {
            return FragmentView()
        }
    }
    return newViewFunc(variable)
}

// ---* for each
export function ForEach<T=any>(arr: T[], callback: (item: T, idx: number) => ReactUIBase | ReactElement) {
    return arr.map((value, index) => callback(value as T, index))
}

