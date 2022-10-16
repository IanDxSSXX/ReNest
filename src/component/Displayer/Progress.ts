import {useSpring} from "@react-spring/web";
import {ReactUIElement} from "../../base/element/ReactUIElement";
import ZStack from "../Container/ZStack"
import AnimatedDiv from "../Other/Spring";
import {RUIProp} from "../../base/element/Helpers";
import {Div} from "../../base/utils/HTMLTags"
import {useEffect, useRef} from "react";
import {useRUIState} from "../../base";
import {VStack} from "../index";
import {RUIColor} from "../../base/theme/Colors";


let themes = {
    primary: {
        fg: RUIColor.red.standard,
        bg: RUIColor.white.dark
    },
    secondary: {
        fg: RUIColor.green.standard,
        bg: RUIColor.white.dark
    },
    tertiary: {
        fg: RUIColor.blue.standard,
        bg: RUIColor.white.dark
    }
}
class Progress extends ReactUIElement {
    defaultTheme = {
        fg: RUIColor.blue.standard,
        bg: RUIColor.white.dark
    }

    LineVariant = (value:number) => {
        const duration = 150
        const progressFrontStyle = useSpring({
            width: `calc(${value > 1 ? 1 : value} * 100%)`,
            config: {duration},
        });

        return (
            ZStack(
                Div()
                    .width("100%")
                    .height("100%")
                    .backgroundColor(this.theme.bg)
                    .borderRadius("10px"),
                AnimatedDiv()
                    .height("100%")
                    .borderRadius("10px")
                    .backgroundColor(this.theme.fg)
                    .style(progressFrontStyle)
            )
                .alignmentH('leading')
                .width("250px")
                .height("10px")
        )
    }

    CircleVariant = (value:number) => {
        const valueState = useRUIState(value)
        const preValueRef = useRef(value)

        let delay = useRUIState("none")
        const duration = 5000

        const circleLeftStyle = useSpring({
            transform: `rotate(${valueState.value>0.5?valueState.value*360-180:0}deg)`,
            delay: delay.value  == "left" ? duration*(0.5-preValueRef.current) : 0,
            config: {
                duration: duration * (delay.value === "left" ?
                    valueState.value - 0.5 : (delay.value === "right" ?
                        preValueRef.current - 0.5:
                        Math.abs(preValueRef.current - valueState.value)))
            },
        });
        const circleRightStyle = useSpring({
            transform: `rotate(${valueState.value<0.5?valueState.value*360:180}deg)`,
            delay: delay.value == "right" ? duration*(preValueRef.current-0.5) : 0,
            config: {
                duration: duration * (delay.value === "right" ?
                    0.5 - valueState.value : (delay.value === "left" ?
                        0.5 - preValueRef.current :
                        Math.abs(valueState.value - preValueRef.current)))
            },
        });

        return (
            ZStack(
                Div(
                    AnimatedDiv()
                        .width('150px')
                        .height('150px')
                        .borderRadius('50%')
                        .backgroundColor(this.theme.bg)
                        .clipPath('inset(0px 0px 0px 75px)')
                        .style(circleRightStyle)
                ).clipPath('inset(0px 0px 0px 75px)')
                    .width('150px')
                    .height('150px'),
                Div(
                    AnimatedDiv()
                        .width('150px')
                        .height('150px')
                        .borderRadius('50%')
                        .backgroundColor(this.theme.bg)
                        .clipPath('inset(0px 75px 0px 0px)')
                        .style(circleLeftStyle)
                ).clipPath('inset(0px 75px 0px 0px)')
                    .width('150px')
                    .height('150px'),
                AnimatedDiv()
                    .width('130px')
                    .height('130px')
                    .borderRadius('50%')
                    .backgroundColor(this.theme.bg)
            )
                .width('150px')
                .height('150px')
                .borderRadius('50%')
                .backgroundColor(this.theme.fg)
                .didUpdate(() => {
                    if (valueState.value > 0.5 && value < 0.5) {
                        delay.value = "right"
                    } else if (valueState.value < 0.5 && value > 0.5) {
                        delay.value = "left"
                    } else {
                        delay.value = "none"
                    }
                    preValueRef.current = valueState.value
                    valueState.value = value
                }, [value])
        )
    }


    Body = ({value}:any):any => {
        const variant = this.C.variant??'line';

        let progress
        if(variant==='line'){
            progress = this.LineVariant(value)
        } else {
            progress = this.CircleVariant(value)
        }

        return progress
    }

    @RUIProp
    variant(value: string){return this}
    // 'line' 'circle'

    @RUIProp
    showNum(value: boolean){return this}

}


export default function(value: number) {
    return new Progress({value}).themes(themes)
}
