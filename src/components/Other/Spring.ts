import {animated} from "@react-spring/web";
import {ReactUIElement} from "../../base/ReactUIElement";
import {RUITag} from "../../base/HTMLTags";


export class AnimatedDiv extends ReactUIElement {
    Body = ({children}:any):any => {
        return RUITag(animated.div, ...children)
            .registerBy(this)
            .height(this.S.height ?? "max-content")
            .width(this.S.width ?? "max-content")
    }

}

export default function(...children: any[]) {
    return new AnimatedDiv({children})
}