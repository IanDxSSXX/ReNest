import {ReactUIElement, RUIProp} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import ZStack from "../Container/ZStack";
import AnimatedDiv from "../Other/Spring";
import {useSpring} from "@react-spring/web";
import {RUIState, useRUIState, useTrigger, useTriggerEffect} from "../../base/Utils";
import {ReactUIThemeColorMap} from "../../base/Interfaces";
import {useEffect, useRef} from "react";


class Toggle extends ReactUIElement {
    themeColorMap: ReactUIThemeColorMap = {
        first: "secondary",
        second: "foreground"
    }
    Body = ({defaultValue}: any): any => {
        const toggleBack = Div()
        const toggleFront = AnimatedDiv()
        const toggleButton = AnimatedDiv()
        const toggleRef = useRef(defaultValue)
        const toggleTrigger = useTrigger()

        useTriggerEffect(toggleTrigger, () => {
            !!this.C.onChange && this.C.onChange(toggleRef.current)
        })

        const toggle = ZStack(
            ZStack(toggleBack, toggleFront).alignmentH("leading"),
            toggleButton
        ).registerBy(this)


        toggle
            .width(toggle.S.width ?? "40px")
            .height(toggle.S.height ?? "24px")
            .cursor("pointer")
            .onClick(() => {
                toggleRef.current = !toggleRef.current
                toggleTrigger.trigger()
            })

        toggleBack
            .width(toggle.S.width)
            .height(`calc(${toggle.S.height} * 3 / 5)`)
            .borderRadius(`calc(${toggleBack.S.height} / 2)`)
            .backgroundColor(toggle.themeColor.second.standard!)

        toggleFront
            .width("100%")
            .height(toggleBack.S.height)
            .borderRadius(`calc(${toggleBack.S.height} / 2)`)
            .backgroundColor(toggle.themeColor.first.light!)


        toggleButton
            .width(toggle.S.height)
            .height(toggle.S.height)
            .borderRadius(`calc(${toggle.S.height} / 2)`)
            .backgroundColor(toggleRef.current ? toggle.themeColor.first!.standard! :
                toggle.themeColor.second.dark!)

        const duration = 150
        const buttonStyles = useSpring({
            translateX: toggleRef.current ?
                `calc((${toggle.S.width} - ${toggleButton.S.width}) / 2)` :
                `calc((${toggleButton.S.width} - ${toggle.S.width}) / 2)`,
            config: { duration },
        })
        const frontStyles = useSpring({
            width: toggleRef.current ? toggle.S.width : toggleButton.S.height,
            config: { duration },
        })

        toggleButton
            .style(buttonStyles)

        toggleFront
            .style(frontStyles)

        if (this.C.disable ?? false) {
            toggle.pointerEvents("none").opacity("0.5")
        }

        return toggle
    }

    @RUIProp
    disable(value: boolean=true) {return this}

    @RUIProp
    onChange(value: any) {return this}

}

export default function(defaultValue=false) {
    return new Toggle({defaultValue})
}