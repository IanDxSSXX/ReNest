import {View, ViewWrapper} from "../../base";
import {Div} from "../../base/utils/HTMLTags";

class Spacer extends View {
    Body = () =>
        Div()
}


export default ViewWrapper(Spacer)