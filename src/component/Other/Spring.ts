import {animated} from "@react-spring/web";
import {View} from "../../base/element/ReactUIElement";
import {TagView} from "../../base";


export class AnimatedDiv extends View {
    Body = ({children}: any) =>
        TagView(animated.div)(...children)
            .height("max-content")
            .width("max-content")

}

export default function(...children: any[]) {
    return new AnimatedDiv({children})
}