import {animated} from "@react-spring/web";
import {ReactUIElement} from "../../base/element/ReactUIElement";
import {RUITag} from "../../base";


export class AnimatedDiv extends ReactUIElement {
    Body = ({children}: any) =>
        RUITag(animated.div)(...children)
            .height("max-content")
            .width("max-content")

}

export default function(...children: any[]) {
    return new AnimatedDiv({children})
}