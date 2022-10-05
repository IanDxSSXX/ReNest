import {useSpring} from "@react-spring/web";
import {ReactUIElement} from "../../base/element/ReactUIElement";
import ZStack from "../Container/ZStack"
import AnimatedDiv from "../Other/Spring";
import {RUIProp} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags"
import {useEffect, useRef} from "react";
import {useRUIState} from "../../base";
import {VStack} from "../index";


const LineVariant = (value:number, wrapper: any) => {
    const progressBack = Div()
    const progressFront = AnimatedDiv()
    const progress = ZStack(
        progressBack,
        progressFront
    ).registerBy(wrapper)
    progress
        .alignmentH('leading')
        .width(progress.S.width ?? "250px")
        .height(progress.S.height ?? "10px")

    progressBack
        .width(progress.S.width)
        .height(progress.S.height)
        .backgroundColor(wrapper.themeColor.second.dark!)
        .borderRadius("10px")

    progressFront
        .height(progress.S.height)
        .borderRadius("10px")
        .backgroundColor(wrapper.themeColor.first.standard!)

    const duration = 150
    const progressFrontStyle = useSpring({
        width: `calc(${value > 1 ? 1 : value} * ${progress.S.width})`,
        config: {duration},
    });
    progressFront.style(progressFrontStyle)

    return progress
}

const CircleVariant = (value:number, wrapper:any) => {
    const circleLeft = AnimatedDiv()
    const circleRight = AnimatedDiv()
    const progressBackLeft = Div(
        circleLeft
    ).clipPath('inset(0px 0px 0px 75px)')
        .width('150px')
        .height('150px')
    const progressBackRight = Div(
        circleRight
    ).clipPath('inset(0px 75px 0px 0px)')
        .width('150px')
        .height('150px')
    const progressFront = AnimatedDiv()

    const valueState = useRUIState(value)
    const preValueRef = useRef(value)

    const progress = ZStack(
        progressBackLeft,
        progressBackRight,
        progressFront
    ).registerBy(wrapper)

    // this.mapViewStyles(progressBack,"height","width")
    progress
        .width('150px')
        .height('150px')
        .borderRadius('50%')
        .backgroundColor(wrapper.themeColor.second.dark!)

    circleRight
        .width('150px')
        .height('150px')
        .borderRadius('50%')
        .backgroundColor(wrapper.themeColor.first.standard!)
        .clipPath('inset(0px 0px 0px 75px)')
    // .transform(`rotate(${value>0.5?value*360-180:0}deg)`)

    circleLeft
        .width('150px')
        .height('150px')
        .borderRadius('50%')
        .backgroundColor(wrapper.themeColor.first.standard!)
        .clipPath('inset(0px 75px 0px 0px)')
    // .transform(`rotate(${value<0.5?value*360:180}deg)`)

    progressFront
        .width('130px')
        .height('130px')
        .borderRadius('50%')
        .backgroundColor(wrapper.themeColor.second.light!)

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
    circleRight.style(circleLeftStyle)
    circleLeft.style(circleRightStyle)

    useEffect(() => {
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

    return progress
}
class Progress extends ReactUIElement {

    Body = ({value}:any):any => {


        const variant = this.C.variant??'line';

        let progress
        if(variant==='line'){
            progress = LineVariant(value, this)
        } else {
            progress = CircleVariant(value, this)
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
    return new Progress({value})
}
