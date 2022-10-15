import {ReactUIElement} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {useRUIState} from "../../base";
import {RUIColor} from "../../base/theme/Colors";
import {Button as HTMLButton} from "../../base/utils/HTMLTags";

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

class Button extends ReactUIElement {
    defaultTheme = themes.primary

    Body = ({title}: any) => {
        const mouseState = useRUIState("out")

        return (
            HTMLButton(title)
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
                .opacity(mouseState.value === "out" ? "1" : "0.5")
                .onMouseDown(() => {
                    mouseState.value = "down"
                })
                .onMouseUp(() => {
                    mouseState.value = "out"
                })
                .onMouseOut(() => {
                    mouseState.value = "out"
                })
                .pointerEvents("none", this.C.disable??false)
                .opacity("0.5", this.C.disable??false)
        )
    }

    @RUIProp
    disable(value: boolean=true) {return this}
}


export default function (title: string|number) {
    return new Button({title}).themes(themes)
}
