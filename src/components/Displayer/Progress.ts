import {animated, useSpring} from "@react-spring/web";
import {RUIState, useRUIState} from "base/Utils";
import {ReactUIElement} from "base/ReactUIElement";
import ZStack from "components/Container/ZStack"
import AnimatedDiv from "components/Other/Spring";
import {ReactUIThemeColorMap} from "base/Interfaces";
import {reactUIProp} from "base/ReactUIElement";
import {useEffect} from "react";
import {Div} from "base/HTMLTags"


class Progress extends ReactUIElement {
    themeColorMap: ReactUIThemeColorMap = {
        first: "tertiary",
        second: "foreground",
    }

    Body = ({value}:any) => {
        const progressBack = Div().ruiClassName("progressBack")
        const progressFront = AnimatedDiv()

        const progress = ZStack(
            progressBack,
            progressFront
        ).registerBy(this)

        // this.mapViewStyles(progressBack,"height","width")

        const variant = this.C.variant

        progress
            .alignmentH('leading')
            .width(progress.S.width??"250px")
            .height(progress.S.height??"10px")

        progressBack
            .width(progress.S.width)
            .height(progress.S.height)
            .backgroundColor(this.themeColor.second.dark!)
            .borderRadius("10px")

        progressFront
            .height(progress.S.height)
            .borderRadius("10px")
            .backgroundColor(this.themeColor.first.standard!)

        const duration = 150
        const progressFrontStyle = useSpring({
            width: `calc(${value>1?1:value} * ${progress.S.width})`,
            config: { duration },
        })
        progressFront.style(progressFrontStyle)

        return progress
    }

    @reactUIProp
    variant(value: string){return this}

}


export default function(value: number) {
    return new Progress({value})
}
