import {animated} from "@react-spring/web";
import {View, ViewWrapper} from "@renest/renest"
import {TagView} from "@renest/renest";


class AnimatedDiv extends View {
    Body = ({children}: any) =>
        TagView(animated.div)(...children)
            .height("max-content")
            .width("max-content")

}

export default (...children: any[]) => ViewWrapper(AnimatedDiv)({children})
