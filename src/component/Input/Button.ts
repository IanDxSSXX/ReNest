import {ReactUIElement, RUIProp} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {useRUIState} from "../../base";
import {RUIColor} from "../../base/theme/Colors";
import {Button as TButton} from "../../base/utils/HTMLTags";

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
        const button = TButton(title)
        const mouseState = useRUIState("out")

        button
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

        if (this.C.disable) {
            button.pointerEvents("none").opacity("0.5")
        }

        return button
    }

    // ---- this is custom dot function that can be called outside and be used as this.C.xx in Body
    @RUIProp
    disable(value: boolean=true) {return this}
}


export default function (title: string|number) {
    return new Button({title}).themes(themes).themeName("secondary")
}
