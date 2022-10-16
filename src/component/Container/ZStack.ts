import {View} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {flattened} from "../../base/utils/Utils";
import ReactUIWithStyle from "../../base/base/ReactUIWithStyle";
import {RUIProp} from "../../base/element/Helpers";

class ZStack extends View {
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

    @RUIProp
    alignmentH(value: "leading" | "center" | "tailing") { return this }

    @RUIProp
    alignmentV(value: "top" | "center" | "bottom") { return this }
}


export default function(...children: any[]) {
    return new ZStack({children})
}
