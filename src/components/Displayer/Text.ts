import {animated} from "@react-spring/web";
import { Div } from "base/HTMLTags";
import {ReactUIElement} from "base/ReactUIElement";


class Text extends ReactUIElement {
    Body = ({content}:any):any => {
        return Div(content).registerBy(this)
            .height(this.S.height ?? "max-content")
            .width(this.S.width ?? "max-content")
            .textAlign("center").verticalAlign("middle")
    }
}


export default function(content: string | number) {
    return new Text({content})
}