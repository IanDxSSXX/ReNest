import {View} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {uid} from "../../base";
import ReactUIBase from "../../base/base/ReactUIBase";
import VStack from "../Container/VStack";
import HStack from "../Container/HStack";
import {ForEach} from "../../base";
import {Div} from "../../base/utils/HTMLTags";
import {ReactElement} from "react";
import {RUIColor} from "../../base/theme/Colors";

class List extends View {
    defaultTheme = {
        divider: RUIColor.black.standard
    }

    Body = ({arrData, arrElem}:any): any => {
        const isHorizontal = (this.C.alignDirection ?? "vertical") === "horizontal"
        const Stack = isHorizontal ? HStack : VStack
        let listView

        const divider = this.C.divider ?? "none"
        if (divider === "none") {
            listView = Stack(ForEach(arrData, arrElem))
        } else {
            const newArrData: any[] = []
            let newDivider: () => any
            if (divider === "solid") {
                newDivider = () =>
                    Div()
                        .backgroundColor(this.theme.divider)
                        .width(isHorizontal ? "1px" : "calc(100% - 10px)")
                        .height(isHorizontal ? "calc(100% - 10px)" : "1px")
                        .margin(isHorizontal ? "5px 0" : "0 5px")
                        .key(uid())
            } else {
                newDivider = () => divider()
            }
            arrData.forEach((value:any, index:number) => {
                if (index !== 0) newArrData.push(newDivider)
                newArrData.push(value)
            })

            listView = Stack(
                ForEach(newArrData, (item, idx) =>
                    idx % 2 === 0 ? arrElem(item, idx / 2) : item()
                )
            )
        }

        return listView
            .alignment("center")
            .spacing(this.C.spacing ?? "0px")
    }

    @RUIProp
    alignDirection(value: "horizontal" | "vertical") { return this }

    horizontal() {
        return this.setCustomProp("alignDirection", "horizontal")
    }

    vertical() {
        return this.setCustomProp("alignDirection", "vertical")
    }

    @RUIProp
    divider(value: "none" | "solid" | ReactUIBase | ReactElement | any) { return this }

    @RUIProp
    alignment(value: "top" | "bottom" | "leading" | "tailing" | "center") { return this }

    @RUIProp
    spacing(value: string) { return this }
}


export default function<T=any>(arrData: T[] | Range, arrElem: (item: T, idx: number) => ReactUIBase | ReactElement) {
    return new List({arrData, arrElem})
}