import {ReactUIElement} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import {Spacer} from "../Other/Spacer";
import {flattened} from "../../base/Utils";
import ReactUIBase from "../../base/ReactUIBase";
import ReactUIWithStyle from "../../base/ReactUIWithStyle";

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
            if (child instanceof Spacer) {
                child.flexGrow(1)
            } else if (child.IAMReactUIWithStyle ?? false) {
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

    spacing(value: string) {
        return this.setCustomProp("spacing", value)
    }

    alignment(value: "top" | "center" | "bottom") {
        return this.setCustomProp("alignment", value)
    }
}


export default function(...children: any[]) {
    return new HStack({children})
}
