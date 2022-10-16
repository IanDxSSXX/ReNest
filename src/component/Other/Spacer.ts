import {View} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";


export class Spacer extends View {
    Body = () =>
        Div()
}


export default function () {
    return new Spacer()
}