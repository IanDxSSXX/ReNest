import {useSpring} from "@react-spring/web";
import {ReactUIElement} from "../../base/ReactUIElement";
import ZStack from "../Container/ZStack"
import AnimatedDiv from "../Other/Spring";
import {ReactUIThemeColorMap} from "../../base/Interfaces";
import {RUIProp} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags"
import {useEffect, useRef} from "react";
import {useRUIState} from "../../base";


class Progress extends ReactUIElement {
    themeColorMap: ReactUIThemeColorMap = {
        first: "tertiary",
        second: "foreground",
    }

    // private lineVariant(progress: any, progressBack: any, progressFront: any, value: any) {
    //     progress
    //         .alignmentH('leading')
    //         .width(progress.S.width??"250px")
    //         .height(progress.S.height??"10px")
    //
    //     progressBack
    //         .width(progress.S.width)
    //         .height(progress.S.height)
    //         .backgroundColor(this.themeColor.second.dark!)
    //         .borderRadius("10px")
    //
    //     progressFront
    //         .height(progress.S.height)
    //         .borderRadius("10px")
    //         .backgroundColor(this.themeColor.first.standard!)
    //
    //     const duration = 150
    //     const progressFrontStyle = useSpring({
    //         width: `calc(${value>1?1:value} * ${progress.S.width})`,
    //         config: { duration },
    //     });
    //     progressFront.style(progressFrontStyle)
    // }

    // private circleVariant(value: number,progress: any, progressBackLeft: any, progressBackRight:any, progressFront: any) {
    //     progress
    //         .width('150px')
    //         .height('150px')
    //         .borderRadius('50%')
    //         .backgroundColor(this.themeColor.first.standard!)
    //
    //     progressBackRight
    //         .width('150px')
    //         .height('150px')
    //         .borderRadius('50%')
    //         .backgroundColor(this.themeColor.second.dark!)
    //         .clipPath('inset(0px 0px 0px 75px)')
    //         .animation('fill ease-in-out 3s')
    //         .transform('rotate(0deg)')
    //
    //     progressBackLeft
    //         .width('150px')
    //         .height('150px')
    //         .borderRadius('50%')
    //         .backgroundColor(this.themeColor.second.dark!)
    //         .clipPath('inset(0px 75px 0px 0px)')
    //         .animation('fill ease-in-out 3s')
    //         .transform('rotate(0deg)')
    //
    //     progressFront
    //         .width('130px')
    //         .height('130px')
    //         .borderRadius('50%')
    //         .backgroundColor(this.themeColor.second.light!)
    //     console.log(value)
    //
    //     const duration = 150
    //     const progressBackRightStyle = useSpring({
    //         transform: `rotate(calc(${value>1?1:value} * 180)deg)`,
    //         config: { duration },
    //     });
    //     const progressBackLeftStyle = useSpring({
    //         transform: `rotate(calc(${value>1?1:value} * 360)deg)`,
    //         config: { duration },
    //     });
    //     progressBackRight.style(progressBackRightStyle)
    //     progressBackLeft.style(progressBackLeftStyle)
    // }


    Body = ({value}:any):any => {
        const progressBack = Div().ruiClassName("progressBack")
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

        const valueRef = useRUIState(value)
        const progress = ZStack(
            progressBackLeft,
            progressBackRight,
            progressFront
        ).registerBy(this)

        // this.mapViewStyles(progressBack,"height","width")
        progress
            .width('150px')
            .height('150px')
            .borderRadius('50%')
            .backgroundColor(this.themeColor.second.dark!)

        circleRight
            .width('150px')
            .height('150px')
            .borderRadius('50%')
            .backgroundColor(this.themeColor.first.standard!)
            .clipPath('inset(0px 0px 0px 75px)')
            // .transform(`rotate(${value>0.5?value*360-180:0}deg)`)

        circleLeft
            .width('150px')
            .height('150px')
            .borderRadius('50%')
            .backgroundColor(this.themeColor.first.standard!)
            .clipPath('inset(0px 75px 0px 0px)')
            // .transform(`rotate(${value<0.5?value*360:180}deg)`)

        progressFront
            .width('130px')
            .height('130px')
            .borderRadius('50%')
            .backgroundColor(this.themeColor.second.light!)

        let delay = useRUIState("none")
        const duration = 1000
        const circleLeftStyle = useSpring({
            transform: `rotate(${valueRef.value>0.5?valueRef.value*360-180:0}deg)`,
            delay: delay.value  == "left" ? duration*(0.5-valueRef.value) : 0,
            config: { duration: duration*(valueRef.value-0.5) },
        });
        const circleRightStyle = useSpring({
            transform: `rotate(${valueRef.value<0.5?valueRef.value*360:180}deg)`,
            delay: delay.value == "right" ? duration*(valueRef.value-0.5) : 0,
            config: { duration: duration*(0.5-valueRef.value) },
        });
        circleRight.style(circleLeftStyle)
        circleLeft.style(circleRightStyle)

        useEffect(() => {
            if (valueRef.value > 0.5 && value < 0.5) {
                delay.value = "right"
                console.log("对了")
            } else if (valueRef.value < 0.5 && value > 0.5) {
                delay.value = "left"
            } else {
                delay.value = "none"
            }
            valueRef.value = value

        }, [value])


        // const variant = this.C.variant??'line';

        // if(variant==='line'){
        //     this.lineVariant(progress, progressBack, progressFront, value)
        // } else if (variant==='circle') {
        //     this.circleVariant(value, progress, progressBackLeft, progressBackRight, progressFront)
        // }


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
