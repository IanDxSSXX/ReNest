import {animated} from "@react-spring/web";
import {View, ViewWrapper} from "@iandx/reactui"
import {TagView} from "@iandx/reactui";


class AnimatedDiv extends View {
    Body = ({children}: any) =>
        TagView(animated.div)(...children)
            .height("max-content")
            .width("max-content")

}

export default (...children: any[]) => ViewWrapper(AnimatedDiv)({children})
