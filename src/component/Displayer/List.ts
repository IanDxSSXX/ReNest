import {ViewWrapper, View} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {ConditionView, uid} from "../../base";
import ReactUIBase from "../../base/base/ReactUIBase";
import VStack from "../Container/VStack";
import HStack from "../Container/HStack";
import {ForEach} from "../../base";
import {Div} from "../../base/utils/HTMLTags";
import {ReactElement} from "react";
import {RUIColor} from "../../base/theme/Colors";
import {DotProp, Prop} from "../../base/element/Decorator";

class List extends View {
    defaultTheme = {
        divider: RUIColor.white.dark
    }

    @Prop arrData: any
    @Prop arrElem: any
    @DotProp horizontal = false
    @DotProp vertical = false
    @DotProp divider: "none" | "solid" | ReactUIBase | ReactElement | any = "none"
    @DotProp spacing: string = "0px"
    @DotProp alignment: "top" | "bottom" | "leading" | "tailing" | "center" = "center"

    isHorizontal = () => !(this.vertical ?? true) && (this.horizontal ?? true)
    stack = () => this.isHorizontal() ? HStack : VStack

    Body = () =>
        ConditionView(this.divider,  {
            "none": () =>
                this.stack()(
                    ForEach(this.arrData, this.arrElem)
                ),
            ":": () =>
                this.stack()(
                    ForEach(Array(this.arrData.length*2-1).fill(0), (_, idx) =>
                        ConditionView(idx % 2, {
                            0: () => this.arrElem(this.arrData[idx / 2], idx / 2),
                            1: () =>
                                ConditionView(this.divider, {
                                    "solid": () =>
                                        Div()
                                            .backgroundColor(this.theme.divider)
                                            .width(this.isHorizontal() ? "1px" : "calc(100% - 10px)")
                                            .height(this.isHorizontal() ? "calc(100% - 10px)" : "1px")
                                            .margin(this.isHorizontal() ? "5px 0" : "0 5px"),
                                    ":": this.divider
                                }).key(uid())
                        })
                    )
                )
        })
            .spacing(this.spacing)
            .alignment(this.alignment)
}


export default function<T=any>(arrData: T[] | Range, arrElem: (item: T, idx: number) => ReactUIBase | ReactElement) {
    return ViewWrapper(List)({arrData, arrElem})
}