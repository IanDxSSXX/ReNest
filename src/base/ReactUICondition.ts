import {Range} from "./Utils";
import ReactUIBase from "./ReactUIBase";
import {ReactElement} from "react";

// ---* If
class IfClass {
    condition: boolean
    constructor(condition: boolean) {
        this.condition = condition
    }

    Then(element: ReactUIBase) {
        if (this.condition) {
            return element
        } else {
            return this
        }
    }

    Else(element: ReactUIBase) {
        return element
    }

    ElseIf(condition: boolean) {
        this.condition = condition
        return this
    }
}

export function If(condition: boolean) {
    return new IfClass(condition)
}


// ---* condition
export function ConditionView(variable: any, conditionMap: any) {
    return conditionMap[variable] ?? ""
}

// ---* for each
export function ForEach(arr: any[] | Range, callback: (item: any, idx: number) => ReactUIBase | ReactElement) {
    let array = arr instanceof Array ? arr: arr.asArray()
    return array.map((value, index) => callback(value, index))
}

