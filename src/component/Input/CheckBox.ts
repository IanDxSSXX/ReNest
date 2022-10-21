import {View, TagView} from "@renest/renest"
import {Div} from "../Util/Tags";
import ZStack from "../Container/ZStack";
import {MdCheck} from "react-icons/md"

class CheckBox extends View {
    Body = ({}: any) => {
        const check = TagView(MdCheck)().width("100px").height("100px").zIndex(10)
        const box = Div().width("50px").height("50px").backgroundColor("gray")

        const checkBox = ZStack(box, check).alignmentH("leading").alignmentV("top").width("50px").height("50px")

        return checkBox
    }
}

export default function() {
    return new CheckBox()
}