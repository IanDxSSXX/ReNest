import {Div} from "../Util/Tags";
import {
    Derived,
    ConditionView,
    DotProp,
    Prop,
    Ref,
    State,
    View,
    ViewWrapper
} from "@renest/renest"
import {RTColor} from "../Util/Colors";
import ZStack from "../Container/ZStack";
import AnimatedDiv from "../Other/AnimatedDiv";
import {Spring} from "../Util/Hooks";


let themes = {
    primary: {
        fg: RTColor.red.standard,
        bg: RTColor.white.dark
    },
    secondary: {
        fg: RTColor.green.standard,
        bg: RTColor.white.dark
    },
    tertiary: {
        fg: RTColor.blue.standard,
        bg: RTColor.white.dark
    }
}


class LineProgressClass extends View {
    defaultThemes = themes
    defaultThemeName = "primary"
    @DotProp duration = 0
    @Prop value: number = 0
    @Derived(Spring) progressFrontStyle = () => ({
        width: `calc(${this.value > 1 ? 1 : this.value} * 100%)`,
        config: {duration: this.duration},
    })

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


class CircleProgressClass extends View {
    defaultThemes = themes
    defaultThemeName = "primary"

    @DotProp duration = 0
    @Prop value: number = 0
    @State delay: any = "none"
    @Derived(State) valueState: any = () => this.value
    @Derived(Ref) preValueRef: any = () => this.value
    @Derived(Spring) circleLeftStyle = () => ({
        transform: `rotate(${this.valueState>0.5?this.valueState*360-180:0}deg)`,
        delay: this.delay  == "left" ? this.duration*(0.5-this.preValueRef) : 0,
        config: {
            duration: this.duration * (this.delay === "left" ?
                this.valueState - 0.5 : (this.delay === "right" ?
                    this.preValueRef - 0.5:
                    Math.abs(this.preValueRef - this.valueState)))
        },
    })

    @Derived(Spring) circleRightStyle = () => ({
        transform: `rotate(${this.valueState<0.5?this.valueState*360:180}deg)`,
        delay: this.delay == "right" ? this.duration*(this.preValueRef-0.5) : 0,
        config: {
            duration: this.duration * (this.delay === "right" ?
                0.5 - this.valueState : (this.delay === "left" ?
                    0.5 - this.preValueRef :
                    Math.abs(this.valueState - this.preValueRef)))
        },
    })


    Body = () =>
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
                if (this.valueState > 0.5 && this.value < 0.5) {
                    this.delay = "right"
                } else if (this.valueState < 0.5 && this.value > 0.5) {
                    this.delay = "left"
                } else {
                    this.delay = "none"
                }
                this.preValueRef = this.valueState
                this.valueState = this.value
            }, [this.value])
}


const LineProgress = ViewWrapper(LineProgressClass)
const CircleProgress = ViewWrapper(CircleProgressClass)


class Progress extends View {
    defaultThemes = themes
    defaultThemeName = "primary"

    @DotProp variant: string = 'line'
    @DotProp showNum: boolean = false
    @DotProp duration = 0
    @Prop value = 1

    Body = () =>
        ConditionView(this.variant, {
            line: () =>
                LineProgress({value: this.value})
                    .themeName(this.defaultThemeName)
                    .duration(this.duration),
            circle: () =>
                CircleProgress({value: this.value})
                    .themeName(this.defaultThemeName)
                    .duration(this.duration),
        })
}


export default(value: number) => ViewWrapper<{value?: number}>(Progress)({value})
