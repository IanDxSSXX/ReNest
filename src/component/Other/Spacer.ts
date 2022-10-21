import {View, ViewWrapper} from "@renest/renest"
import {Div} from "../Util/Tags";

class Spacer extends View {
    Body = () =>
        Div()
}


export default ViewWrapper(Spacer)