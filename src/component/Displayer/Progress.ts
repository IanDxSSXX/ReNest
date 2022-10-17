import {Div} from "../../core/utils/HTMLTags";
import {
    Callback,
    ConditionView,
    DotProp,
    FuncView,
    Prop,
    Ref,
    Spring,
    State,
    useRUIState,
    View,
    ViewWrapper
} from "../../core";
import {RUIColor} from "../../core/theme/Colors";
import ZStack from "../Container/ZStack";
import AnimatedDiv from "../Other/AnimatedDiv";


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


class LineProgressClass extends View {
    defaultThemes = themes
    defaultThemeName = "primary"
    @DotProp duration = 0
    @Prop value: number = 0
    @Callback(Spring) progressFrontStyle = () => ({
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
    @Callback(State) valueState: any = () => this.value
    @Callback(Ref) preValueRef: any = () => this.value
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
                if (this.valueState.value > 0.5 && this.value < 0.5) {
                    this.delay.value = "right"
                } else if (this.valueState.value < 0.5 && this.value > 0.5) {
                    this.delay.value = "left"
                } else {
                    this.delay.value = "none"
                }
                this.preValueRef.current = this.valueState.value
                this.valueState.value = this.value
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
