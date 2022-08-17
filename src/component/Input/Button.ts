import {ReactUIElement, RUIProp} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import {ReactUIThemeColor} from "../../base/Interfaces";
import {useRUIState} from "../../base/Utils";

class Button extends ReactUIElement {
    Body = ({title}: any) => {
        const button = Div(title).registerBy(this)
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
            .backgroundColor(this.themeColor.first.dark!)
            .color(this.themeColor.first.light!)
            .borderColor(this.themeColor.first.light!)
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

        if (this.C.disable ?? false) {
            button.pointerEvents("none").opacity("0.5")
        }

        return button
    }

    // ---- this is custom dot function that can be called outside and be used as this.C.xx in Body
    @RUIProp
    disable(value: boolean=true) {return this}
}

export default function (title: string) {
    return new Button({title})
}