import {ReactUIElement, RUIProp} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {Spacer} from "../Other/Spacer";
import {flattened} from "../../base/utils/Utils";
import ReactUIBase from "../../base/core/ReactUIBase";
import ReactUIWithStyle from "../../base/core/ReactUIWithStyle";

class HStack extends ReactUIElement {
    Body = ({children}:any) => {
        const hstack = Div(...children).registerBy(this)

        hstack
            .height(hstack.S.height ?? "max-content")
            .width(hstack.S.width ?? "max-content")
            .display("flex")
            .flexDirection("row")
            .columnGap(this.C.spacing)

        let alignment = this.C.alignment
        for (let child of flattened(hstack.children)) {
            // ---- pass down theme
            if (child.IAmReactUITheme) {
                this.passDownTheme(child)
            }
            if (child.constructor.name === "Spacer") {
                child.flexGrow(1)
            } else if (child.IAMReactUIWithStyle) {
                child.flexShrink(0)
                if (alignment === "top") {
                    child.marginBottom("auto")
                } else if (alignment === "bottom") {
                    child.marginTop("auto")
                } else if (alignment === "center") {
                    child.marginTop("auto").marginBottom("auto")
                }
            }
        }

        return hstack
    }

    @RUIProp
    spacing(value: string) { return this }

    @RUIProp
    alignment(value: "top" | "center" | "bottom") { return this }
}


export default function(...children: any[]) {
    return new HStack({children})
}
