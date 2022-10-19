import {View, ViewWrapper} from "@iandx/reactui"
import {Div} from "../Util/Tags";

class Spacer extends View {
    Body = () =>
        Div()
}


export default ViewWrapper(Spacer)