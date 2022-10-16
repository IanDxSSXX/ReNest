import {ReactUIElement, ViewWrapper, View} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {useRUIState} from "../../base";
import {RUIColor} from "../../base/theme/Colors";
import {Button as HTMLButton} from "../../base/utils/HTMLTags";
import {State} from "../../base/element/HookDecorator";
import {DotProp, Prop} from "../../base/element/Decorator";

const themes = {
    primary: {
        bg: RUIColor.red.light,
        fg: RUIColor.red.dark,
    },
    secondary: {
        bg: RUIColor.green.light,
        fg: RUIColor.green.dark,
    },
    tertiary: {
        bg: RUIColor.blue.light,
        fg: RUIColor.blue.dark,
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
            .opacity(this.mouseState.value === "out" ? "1" : "0.5")
            .onMouseDown(() => {
                this.mouseState.value = "down"
            })
            .onMouseUp(() => {
                this.mouseState.value = "out"
            })
            .onMouseOut(() => {
                this.mouseState.value = "out"
            })
            .pointerEvents("none", this.disable)
            .opacity("0.5", this.disable)
}

export default function (title: string) {
    return ViewWrapper<{title: string}>(Button)({title})
}

