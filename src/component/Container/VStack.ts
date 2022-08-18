import {ReactUIElement} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import {Spacer} from "../Other/Spacer";
import {flattened, isInstanceOf} from "../../base/Utils";
import ReactUIBase from "../../base/ReactUIBase";
import ReactUIWithStyle from "../../base/ReactUIWithStyle";

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

        for (let child of flattened(vstack.children)) {
            if (child instanceof Spacer) {
                child.flexGrow(1)
            } else if (isInstanceOf(child, "ReactUIWithStyle")) {
                child.flexShrink(0)
                if (alignment === "leading") {
                    child.marginRight("auto")
                } else if (alignment === "tailing") {
                    child.marginLeft("auto")
                } else if (alignment === "center") {
                    child.marginLeft("auto").marginRight("auto")
                }
            }
        }

        return vstack
    }

    spacing(value: string) {
        return this.setCustomProp("spacing", value)
    }

    alignment(value: "leading" | "center" | "tailing") {
        return this.setCustomProp("alignment", value)
    }
}



export default function(...children: any[]) {
    return new VStack({children})
}
