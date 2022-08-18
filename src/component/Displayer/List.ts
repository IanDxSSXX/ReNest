import {animated} from "@react-spring/web";
import {ReactUIElement} from "../../base/ReactUIElement";
import {isInstanceOf, Range, uid} from "../../base/Utils";
import ReactUIBase from "../../base/ReactUIBase";
import VStack from "../Container/VStack";
import HStack from "../Container/HStack";
import {ForEach} from "../../base/ReactUICondition";
import Text from "./Text"
import {Div} from "../../base/HTMLTags";
import {ReactElement} from "react";

class List extends ReactUIElement {
    Body = ({arrData, arrElem}:any): any => {
        const isHorizontal = (this.C.alignDirection ?? "vertical") === "horizontal"
        const stack = isHorizontal ? HStack : VStack
        let listView
        this.setColor("foreground")

        const divider = this.C.divider ?? "none"
        if (divider === "none") {
            listView = stack(ForEach(arrData, arrElem)).registerBy(this)
        } else {
            const newArrData: any[] = []
            let newDivider: () => any
            if (divider === "solid") {
                newDivider = () =>
                    Div()
                        .backgroundColor(this.themeColor.first.dark!)
                        .width(isHorizontal ? "1px" : "calc(100% - 10px)")
                        .height(isHorizontal ? "calc(100% - 10px)" : "1px")
                        .margin(isHorizontal ? "5px 0" : "0 5px")
                        .key(uid())

            } else {
                newDivider = () => divider()
            }
            arrData.forEach((value:any, index:number) => {
                if (index !== 0) {
                    newArrData.push(newDivider)
                }
                newArrData.push(value)
            })

            listView = stack(
                ForEach(newArrData, (item, idx) =>
                    idx % 2 === 0 ? arrElem(item, idx % 2) : item()
                )
            ).registerBy(this)
        }



        return listView.alignment(this.C.alignment ?? "center").spacing(this.C.spacing ?? "0px")

    }

    alignDirection(value: "horizontal" | "vertical") {
        return this.setCustomProp("alignDirection", value)
    }

    horizontal() {
        return this.setCustomProp("alignDirection", "horizontal")
    }

    vertical() {
        return this.setCustomProp("alignDirection", "vertical")
    }

    divider(value: "none" | "solid" | ReactUIBase | ReactElement) {
        return this.setCustomProp("divider", value)
    }

    alignment(value: "top" | "bottom" | "leading" | "tailing" | "center") {
        return this.setCustomProp("alignment", value)
    }

    spacing(value: string) {
        return this.setCustomProp("spacing", value)
    }


}


export default function(arrData: any[] | Range, arrElem: (item: any, idx: number) => ReactUIBase | ReactElement) {
    return new List({arrData, arrElem})
}