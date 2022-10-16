import {ReactUIElement} from "../../base/element/ReactUIElement";
import ZStack from "../Container/ZStack"
import AnimatedDiv from "../Other/Spring";
import {Div} from "../../base/utils/HTMLTags"
import {RUIColor} from "../../base/theme/Colors";
import {Callback, DotProp, Ref, Spring, State} from "../../base/index.core";


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


class LineProgress extends ReactUIElement {
    defaultThemes = themes
    defaultThemeName = "primary"
    duration = 150
    @Spring progressFrontStyle = {
        width: `calc(${this.props.value > 1 ? 1 : this.props.value} * 100%)`,
        config: {duration: this.duration},
    }

    Body = () =>
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
                .style(this.progressFrontStyle)
        )
            .alignmentH('leading')
            .width("250px")
            .height("10px")
}


class CircleProgress extends ReactUIElement {
    defaultThemes = themes
    defaultThemeName = "primary"

    duration = 5000
    @State delay: any = "none"
    @State valueState = this.props.value
    @Ref preValueRef = this.props.value
    @Callback(Spring) circleLeftStyle = () => ({
        transform: `rotate(${this.valueState.value>0.5?this.valueState.value*360-180:0}deg)`,
        delay: this.delay.value  == "left" ? this.duration*(0.5-this.preValueRef.current) : 0,
        config: {
            duration: this.duration * (this.delay.value === "left" ?
                this.valueState.value - 0.5 : (this.delay.value === "right" ?
                    this.preValueRef.current - 0.5:
                    Math.abs(this.preValueRef.current - this.valueState.value)))
        },
    })

    @Callback(Spring) circleRightStyle = () => ({
        transform: `rotate(${this.valueState.value<0.5?this.valueState.value*360:180}deg)`,
        delay: this.delay.value == "right" ? this.duration*(this.preValueRef.current-0.5) : 0,
        config: {
            duration: this.duration * (this.delay.value === "right" ?
                0.5 - this.valueState.value : (this.delay.value === "left" ?
                    0.5 - this.preValueRef.current :
                    Math.abs(this.valueState.value - this.preValueRef.current)))
        },
    })


    Body = (value:number) =>
        ZStack(
            Div(
                AnimatedDiv()
                    .width('150px')
                    .height('150px')
                    .borderRadius('50%')
                    .backgroundColor(this.theme.bg)
                    .clipPath('inset(0px 0px 0px 75px)')
                    .style(this.circleRightStyle)
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
                    .style(this.circleLeftStyle)
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
                if (this.valueState.value > 0.5 && value < 0.5) {
                    this.delay.value = "right"
                } else if (this.valueState.value < 0.5 && value > 0.5) {
                    this.delay.value = "left"
                } else {
                    this.delay.value = "none"
                }
                this.preValueRef.current = this.valueState.value
                this.valueState.value = value
            }, [value])
}

class Progress extends ReactUIElement {
    @DotProp variant: string = 'line'
    @DotProp showNum: boolean = false

    Body = ({value}:any):any => {
        let progress
        if(this.variant as any ==='line'){
            progress = new LineProgress({value})
        } else {
            progress = new CircleProgress({value})
        }

        return progress
    }

}


export default function(value: number) {
    return new Progress({value})
}
