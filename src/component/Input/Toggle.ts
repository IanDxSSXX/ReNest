import {ReactUIElement, RUIProp} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import ZStack from "../Container/ZStack";
import AnimatedDiv from "../Other/Spring";
import {useSpring} from "@react-spring/web";
import {RUIState, useRUIState, useTrigger, useTriggerEffect} from "../../base/utils/Utils";
import {useEffect, useRef} from "react";
import ReactUIBase from "../../base/core/ReactUIBase";
import {MdCheck} from "react-icons/md";
import Paper from "../Displayer/Paper";
import {RUITag} from "../../base";


class Toggle extends ReactUIElement {
    defaultTheme = {
        bg: "#AA00AA",
        border: "#FFAAFF",
        fg: "#00AAFF"
    }

    Check = ({defaultValue}: any): ReactUIBase => {
        const toggleBack = Paper()
        const toggleFront = RUITag(MdCheck)()
        const toggle = ZStack(
            toggleBack,
            toggleFront
        ).registerBy(this)

        toggleBack
            .width(this.S.width ?? "40px")
            .height(this.S.height ?? "40px")

        toggleFront
            .fontSize(this.S.fontWeight ?? "15px")

        return toggle
    }

    Toggle = ({defaultValue}: any): any => {
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
            .backgroundColor(this.theme.bg)

        toggleFront
            .width("100%")
            .height(toggleBack.S.height)
            .borderRadius(`calc(${toggleBack.S.height} / 2)`)
            .backgroundColor(this.theme.bg)


        toggleButton
            .width(toggle.S.height)
            .height(toggle.S.height)
            .borderRadius(`calc(${toggle.S.height} / 2)`)
            .backgroundColor(toggleRef.current ? this.theme.bg :
                this.theme.bg)

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

        if (this.C.disable) {
            toggle.pointerEvents("none").opacity("0.5")
        }

        return toggle
    }

    Body = ({defaultValue}: any): any => {
        return (this.C.toggleType ?? "toggle") === "toggle" ? this.Toggle({defaultValue}) : this.Check({defaultValue})
    }

    @RUIProp
    disable(value: boolean=true) {return this}

    @RUIProp
    onChange(value: any) {return this}

    @RUIProp
    toggleType(value: "toggle"|"check") {return this}

}

export default function(defaultValue=false) {
    return new Toggle({defaultValue})
}