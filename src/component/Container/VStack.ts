import {View} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {Div} from "../../base/utils/HTMLTags";
import {Spacer} from "../Other/Spacer";
import {flattened} from "../../base/utils/Utils";
import ReactUIBase from "../../base/base/ReactUIBase";
import ReactUIWithStyle from "../../base/base/ReactUIWithStyle";
import {ReactUITheme} from "../../base/theme/ReactUITheme";

class VStack extends View {
    Body = ({children}:any) =>
        Div(...children)
            .height("max-content")
            .width("max-content")
            .display("flex")
            .flexDirection("column")
            .rowGap(this.C.spacing)
            .forEachChild((child: any) => {
                if (child.constructor.name === "Spacer") {
                    child.flexGrow(1)
                } else if (child.IAmReactUIWithStyle) {
                    child.flexShrink(0)
                    if (this.C.alignment === "leading") {
                        child.marginRight("auto")
                    } else if (this.C.alignment === "tailing") {
                        child.marginLeft("auto")
                    } else if (this.C.alignment === "center") {
                        child.marginLeft("auto").marginRight("auto")
                    }
                }
        })

    @RUIProp
    spacing(value: string) { return this }

    @RUIProp
    alignment(value: "leading" | "center" | "tailing") { return this }
}



export default function(...children: any[]) {
    return new VStack({children})
}
