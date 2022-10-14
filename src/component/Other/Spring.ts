import {animated} from "@react-spring/web";
import {ReactUIElement} from "../../base/element/ReactUIElement";
import {RUITag} from "../../base";


export class AnimatedDiv extends ReactUIElement {
    Body = ({children}:any) => {
        return RUITag(animated.div)(...children)
            .height(this.S.height ?? "max-content")
            .width(this.S.width ?? "max-content")
    }

}

export default function(...children: any[]) {
    return new AnimatedDiv({children})
}