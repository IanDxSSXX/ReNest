import {Div} from "../Util/Tags";
import {DotProp, View, ViewWrapper} from "@renest/renest"

class ZStack extends View {
    @DotProp alignmentH:  "leading" | "center" | "tailing" = "center"
    @DotProp alignmentV:  "top" | "center" | "bottom"  = "center"

    Body = ({children}:any) =>
        Div(...children)
            .height("max-content")
            .width("max-content")
            .display("grid")
            .alignItems(({
                "top": "flex-start",
                "center": "center",
                "bottom": "flex-end"
            } as any)[this.alignmentV])
            .justifyItems(({
                "leading": "left",
                "center": "center",
                "tailing": "right"
            } as any)[this.alignmentH])
            .forEachChild((child: any) => {
                if (child.IAmRTWithStyle) {
                    child
                        .position("relative")
                        .gridArea("1 / 1/ 1 / 1")
                }
            })
}


export default (...children: any[]) => ViewWrapper(ZStack)({children})

