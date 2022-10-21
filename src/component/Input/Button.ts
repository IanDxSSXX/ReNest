import {RTColor} from "../Util/Colors";
import {DotProp, Prop, State, View, ViewWrapper} from "@renest/renest"
import {Button as HTMLButton} from "../Util/Tags"


const themes = {
    primary: {
        bg: RTColor.red.light,
        fg: RTColor.red.dark,
    },
    secondary: {
        bg: RTColor.green.light,
        fg: RTColor.green.dark,
    },
    tertiary: {
        bg: RTColor.blue.light,
        fg: RTColor.blue.dark,
    },
}

class Button extends View {
    defaultThemes = themes
    defaultThemeName = "primary"
    @State mouseState: any = "out"
    @DotProp disable = false
    @Prop title = ""

    Body = () =>
        HTMLButton(this.title)
            .boxSizing("border-box")
            .border("solid")
            .borderRadius("5px")
            .borderWidth("1px")
            .height("max-content")
            .width("max-content")
            .padding("5px 10px")
            .textAlign("center")
            .verticalAlign("middle")
            .userSelect("none")
            .cursor("pointer")
            .backgroundColor(this.theme.bg)
            .color(this.theme.fg)
            .borderColor(this.theme.fg)
            .opacity(this.mouseState === "out" ? "1" : "0.5")
            .onMouseDown(() => {
                this.mouseState = "down"
            })
            .onMouseUp(() => {
                this.mouseState = "out"
            })
            .onMouseOut(() => {
                this.mouseState = "out"
            })
            .pointerEvents("none", this.disable)
            .opacity("0.5", this.disable)
}

export default (title: string) => ViewWrapper<{title: string}>(Button)({title})

