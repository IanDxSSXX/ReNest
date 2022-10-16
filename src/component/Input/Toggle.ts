import {Div} from "../../core/utils/HTMLTags";
import AnimatedDiv from "../Other/AnimatedDiv";
import {RUIColor} from "../../core/theme/Colors";
import {Callback, DotProp, Prop, Spring, State, View, ViewWrapper} from "../../core";
import ZStack from "../Container/ZStack";

const themes = {
    primary: {
        bg: RUIColor.white.dark,
        toggle: RUIColor.red.standard,
        fg: RUIColor.red.light,
    },
    secondary: {
        bg: RUIColor.white.dark,
        toggle: RUIColor.green.standard,
        fg: RUIColor.green.light,
    },
    tertiary: {
        bg: RUIColor.white.dark,
        toggle: RUIColor.blue.standard,
        fg: RUIColor.blue.light,
    },
}

class Toggle extends View {
    defaultThemes = themes
    defaultThemeName = "secondary"

    @Prop defaultValue: boolean = false
    @Callback(State) valueState: any = () => this.defaultValue
    @DotProp width: any
    @DotProp height: any
    toggleWidth = () => this.width ?? "40px"
    toggleHeight = () => this.height ?? "24px"
    toggleBackWidth = () => this.toggleWidth()
    toggleBackHeight = () => `calc(${this.toggleHeight()} * 3 / 5)`
    duration = 150
    @Callback(Spring) buttonStyles = () => ({
        translateX: this.valueState.value ?
            `calc((${this.toggleWidth()} - ${this.toggleHeight()}) / 2)` :
            `calc((${this.toggleHeight()} - ${this.toggleWidth()}) / 2)`,
        config: { duration: this.duration },
    })
    @Callback(Spring) frontStyles = () => ({
        width: this.valueState.value ? this.toggleWidth() : this.toggleHeight(),
        config: { duration: this.duration },
    })
    @DotProp disable = false
    @DotProp onChange: any = () => null

    Body = (): any =>
            ZStack(
                ZStack(
                    Div()
                        .width(this.toggleBackWidth())
                        .height(this.toggleBackHeight())
                        .borderRadius(`calc(${this.toggleBackHeight()} / 2)`)
                        .backgroundColor(this.theme.bg),
                    AnimatedDiv()
                        .width("100%")
                        .height(this.toggleBackHeight())
                        .borderRadius(`calc(${this.toggleBackHeight()} / 2)`)
                        .backgroundColor(this.valueState.value ? this.theme.fg : this.theme.bg)
                        .style(this.frontStyles)
                )
                    .alignmentH("leading"),
                AnimatedDiv()
                    .width(this.toggleHeight())
                    .height(this.toggleHeight())
                    .borderRadius(`calc(${this.toggleHeight()} / 2)`)
                    .backgroundColor(this.valueState.value ? this.theme.toggle : this.theme.bg)
                    .style(this.buttonStyles)
            )
                .width(this.toggleWidth())
                .height(this.toggleHeight())
                .cursor("pointer")
                .onClick(() => {
                    this.onChange(!this.valueState.value)
                    this.valueState.setValue((pre: boolean) => !pre)
                })
                .pointerEvents("none", this.disable)
                .opacity("0.5", this.disable)

}

export default (defaultValue=false) => ViewWrapper(Toggle)({defaultValue})
