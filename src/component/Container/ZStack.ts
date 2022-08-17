import {ReactUIElement} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import {flattened} from "../../base/Utils";

class ZStack extends ReactUIElement {
    Body = ({children}:any) => {
        const zstack = Div(...children).registerBy(this)

        zstack
            .height(zstack.S.height ?? "max-content")
            .width(zstack.S.width ?? "max-content")
            .display("grid")
            .alignItems(this.C.alignmentV ?? "center")
            .justifyItems(this.C.alignmentH ?? "center")

        for (let child of flattened(zstack.children)) {
            child
                .position("relative")
                .gridArea("1 / 1/ 1 / 1")
        }

        return zstack
    }

    alignmentH(value: "leading" | "center" | "tailing") {
        let map = {
            "leading": "left",
            "center": "center",
            "tailing": "right"
        }
        return this.setCustomProp("alignmentH", map[value])
    }

    alignmentV(value: "top" | "center" | "bottom") {
        let map = {
            "top": "flex-start",
            "center": "center",
            "bottom": "flex-end"
        }
        return this.setCustomProp("alignmentV", map[value])
    }
}


export default function(...children: any[]) {
    return new ZStack({children})
}
