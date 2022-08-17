import {ReactUIElement} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";


export class Spacer extends ReactUIElement {
    Body = ():any => {
        return Div().registerBy(this)
    }
}


export default function () {
    return new Spacer()
}