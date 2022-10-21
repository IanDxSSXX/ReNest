import {Div} from "../Util/Tags";
import {DotProp, ViewWrapper, View} from "@renest/renest"

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
                } else if (child.IAmRTWithStyle) {
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


export default (...children: any[]) => ViewWrapper(VStack)({children})


