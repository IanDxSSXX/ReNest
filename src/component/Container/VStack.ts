import {ReactUIElement, RUIProp} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {Spacer} from "../Other/Spacer";
import {flattened} from "../../base/utils/Utils";
import ReactUIBase from "../../base/core/ReactUIBase";
import ReactUIWithStyle from "../../base/core/ReactUIWithStyle";
import {ReactUITheme} from "../../base/theme/ReactUITheme";

class VStack extends ReactUIElement {
    Body = ({children}:any) => {
        const vstack = Div(...children).registerBy(this)

        vstack
            .height(vstack.S.height ?? "max-content")
            .width(vstack.S.width ?? "max-content")
            .display("flex")
            .flexDirection("column")
            .rowGap(this.C.spacing)

        let alignment = this.C.alignment

        vstack.forEachChild(child => {
            this.registerAsChild(child)

            if (child.constructor.name === "Spacer") {
                child.flexGrow(1)
            } else if (child.IAmReactUIWithStyle) {
                child.flexShrink(0)
                if (alignment === "leading") {
                    child.marginRight("auto")
                } else if (alignment === "tailing") {
                    child.marginLeft("auto")
                } else if (alignment === "center") {
                    child.marginLeft("auto").marginRight("auto")
                }
            }
        })

        return vstack
    }

    @RUIProp
    spacing(value: string) { return this }

    @RUIProp
    alignment(value: "leading" | "center" | "tailing") { return this }
}



export default function(...children: any[]) {
    return new VStack({children})
}
