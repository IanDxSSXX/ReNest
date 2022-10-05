import {ReactUIElement, RUIProp} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {useRUIState} from "../../base";

class Button extends ReactUIElement {
    defaultTheme = {
        bg: "#AA00AA",
        border: "#FFAAFF",
        fg: "#00AAFF"
    }

    Body = ({title}: any) => {
        const button = Div(title)
        const mouseState = useRUIState("out")

        button
            .boxSizing("border-box")
            .border("solid")
            .borderRadius(button.S.borderRadius ?? "5px")
            .borderWidth(button.S.borderWidth ?? "1px")
            .height(button.S.height ?? "max-content")
            .width(button.S.width ?? "max-content")
            .padding("5px 10px")
            .textAlign("center")
            .verticalAlign("middle")
            .lineHeight(button.S.height === "max-content" ? "" :
                        `calc(${button.S.height} - 2 * ${button.S.borderWidth} - 10px`)
            .userSelect("none")
            .cursor("pointer")
            .backgroundColor(this.theme.border)
            .color(this.theme.fg!)
            .borderColor(this.theme.border)
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
    return new Button({title})
        .themes({"primary": {
                bg: "#00AAAA",
                border: "#00FFFF",
                fg: "#00AAFF"
        }})
        .themeName("primary")
}