import {View, ViewWrapper} from "../../core";
import {Div} from "../../core/utils/HTMLTags";

class Spacer extends View {
    Body = () =>
        Div()
}


export default ViewWrapper(Spacer)