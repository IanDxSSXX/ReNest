import {ReactUIElement} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";


export class Spacer extends ReactUIElement {
    Body = ():any => {
        return Div()
    }
}


export default function () {
    return new Spacer()
}