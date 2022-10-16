import {FuncView, View} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {flattened} from "../../base/utils/Utils";
import ReactUIWithStyle from "../../base/base/ReactUIWithStyle";
import {RUIProp} from "../../base/element/Helpers";
import {DotProp} from "../../base/element/Decorator";

class ZStack extends View {
    @DotProp alignmentH:  "leading" | "center" | "tailing" = "leading"
    @DotProp alignmentV:  "top" | "center" | "bottom"  = "top"
    Body = ({children}:any) =>
        Div(...children)
            .height("max-content")
            .width("max-content")
            .display("grid")
            .alignItems(({
                "top": "flex-start",
                "center": "center",
                "bottom": "flex-end"
            } as any)[this.C.alignmentV ?? "center"])
            .justifyItems(({
                "leading": "left",
                "center": "center",
                "tailing": "right"
            } as any)[this.C.alignmentH ?? "center"])
            .forEachChild((child: any) => {
                if (child.IAmReactUIWithStyle) {
                    child
                        .position("relative")
                        .gridArea("1 / 1/ 1 / 1")
                }
            })
}


export default function(...children: any[]) {
    return FuncView(ZStack)({children})
}
