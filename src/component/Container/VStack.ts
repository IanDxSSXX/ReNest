import {FuncView, View} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {Div} from "../../base/utils/HTMLTags";
import {Spacer} from "../Other/Spacer";
import {flattened} from "../../base/utils/Utils";
import ReactUIBase from "../../base/base/ReactUIBase";
import ReactUIWithStyle from "../../base/base/ReactUIWithStyle";
import {ReactUITheme} from "../../base/theme/ReactUITheme";
import {DotProp} from "../../base/element/Decorator";

class VStack extends View {
    @DotProp spacing: any = "0px"
    @DotProp alignment:  "leading" | "center" | "tailing" = "leading"
    Body = ({children}:any) =>
        Div(...children)
            .height("max-content")
            .width("max-content")
            .display("flex")
            .flexDirection("column")
            .rowGap(this.spacing)
            .forEachChild((child: any) => {
                if (child.constructor.name === "Spacer") {
                    child.flexGrow(1)
                } else if (child.IAmReactUIWithStyle) {
                    child.flexShrink(0)
                    if (this.alignment === "leading") {
                        child.marginRight("auto")
                    } else if (this.alignment === "tailing") {
                        child.marginLeft("auto")
                    } else if (this.alignment === "center") {
                        child.marginLeft("auto").marginRight("auto")
                    }
                }
        })
}



export default function(...children: any[]) {
    return FuncView(VStack)({children})
}
