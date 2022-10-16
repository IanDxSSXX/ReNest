import {View} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import ZStack from "../Container/ZStack";
import AnimatedDiv from "../Other/Spring";
import {to, useSpring} from "@react-spring/web";
import {pixelToInt, RUIState, useRUIState} from "../../base/utils/Utils";
import {MdCheck} from "react-icons/md"
import {RUITag} from "../../base";

class CheckBox extends View {
    Body = ({}: any) => {
        const check = RUITag(MdCheck)().width("100px").height("100px").zIndex(10)
        const box = Div().width("50px").height("50px").backgroundColor("gray")

        const checkBox = ZStack(box, check).alignmentH("leading").alignmentV("top").width("50px").height("50px")

        return checkBox
    }
}

export default function() {
    return new CheckBox()
}