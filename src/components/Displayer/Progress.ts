import {animated} from "@react-spring/web";
import { Div } from "../../base/HTMLTags";
import {ReactUIElement} from "../../base/ReactUIElement";
import ZStack from "../Container/ZStack";
import {pixelToInt, RUIState} from "../../base/Utils";
import {useEffect} from "react";


class Progress extends ReactUIElement {
    Body = ({percentage}:any) => {
        const progressBack = Div().ruiClassName("progressBack")
        const progressFront = Div()

        const progress = ZStack(
            progressBack,
            progressFront
        ).registerBy(this)

        // this.mapViewStyles(progressBack,"height","width")

        const variant = this.C('variant')

        progress
            .alignmentH('leading')
            .width(progress.S.width??"100px")
            .height(progress.S.height??"10px")

        progressBack
            .width(progress.S.width)
            .height(progress.S.height)
            .border("1px solid")
            .backgroundColor("white")


        progressFront
            .width(`${pixelToInt(progress.S.width)*percentage.value}px`)
            .height(progress.S.height)
            .border("1px solid")
            .backgroundColor("gray")


        useEffect(() => {
            if(percentage.value>1){
                percentage.value=1
            } else if (percentage.value<0) {
                percentage.value=0
            }
        })
        return progress
    }
    variant(value: string){
        return this.setCustomProp("variant",value)
    }

}


export default function(percentage: RUIState) {
    return new Progress({percentage})
}