import {ReactUIElement} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {Div} from "../../base/utils/HTMLTags";
import {Spacer} from "../Other/Spacer";

class HStack extends ReactUIElement {
    Body = ({children}:any) =>
        Div(...children)
            .height("max-content")
            .width("max-content")
            .display("flex")
            .flexDirection("row")
            .columnGap(this.C.spacing)
            .forEachChild(child => {
                if (child.constructor.name === "Spacer") {
                    child.flexGrow(1)
                } else if (child.IAMReactUIWithStyle) {
                    child.flexShrink(0)
                    if (this.C.alignment === "top") {
                        child.marginBottom("auto")
                    } else if (this.C.alignment === "bottom") {
                        child.marginTop("auto")
                    } else if (this.C.alignment === "center") {
                        child.marginTop("auto").marginBottom("auto")
                    }
                }
            })


    @RUIProp
    spacing(value: string) { return this }

    @RUIProp
    alignment(value: "top" | "center" | "bottom") { return this }
}


export default function(...children: any[]) {
    return new HStack({children})
}
