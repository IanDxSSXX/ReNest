import ReactUIBase from "../base/ReactUIBase";
import {createElement, ReactElement} from "react";
import {FragmentView} from "./ReactUIWrapper";
import {ReactUITheme} from "../theme/ReactUITheme";

// ---* condition
class Condition extends ReactUITheme {
    variable: any
    conditionMap: any

    constructor(variable: any, conditionMap: any) {
        super("");
        this.variable = variable
        this.conditionMap = conditionMap
    }

    asReactElement() {
        let Element = () => {
            let ruiElement = (this.conditionMap[this.variable] ??
                this.conditionMap["_"] ??
                FragmentView)()

            this.children = [ruiElement]
            this.passDownContext()
            this.passDownTheme()
            return ruiElement.asReactElement()
        }

        return createElement(
            Element
        )
    }
}

export const ConditionView = (variable: any, conditionMap: any) => new Condition(variable, conditionMap)

// ---* for each
export function ForEach<T=any>(arr: T[], callback: (item: T, idx: number) => ReactUIBase | ReactElement) {
    return arr.map((value, index) => callback(value as T, index))
}

