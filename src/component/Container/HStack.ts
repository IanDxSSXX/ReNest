import {Div} from "../Util/Tags";
import {DotProp, ViewWrapper, View} from "@renest/renest";

class HStack extends View {
    @DotProp spacing: any = "0px"
    @DotProp alignment: "top" | "center" | "bottom" = "top"
    Body = ({children}:any) =>
        Div(...children)
            .height("max-content")
            .width("max-content")
            .display("flex")
            .flexDirection("row")
            .columnGap(this.spacing)
            .forEachChild((child: any) => {
                if (child.constructor.name === "Spacer") {
                    child.flexGrow(1)
                } else if (child.IAMRTWithStyle) {
                    child.flexShrink(0)
                    if (this.alignment === "top") {
                        child.marginBottom("auto")
                    } else if (this.alignment === "bottom") {
                        child.marginTop("auto")
                    } else if (this.alignment === "center") {
                        child.marginTop("auto").marginBottom("auto")
                    }
                }
            })
}


export default (...children: any[]) => ViewWrapper(HStack)({children})
