import {animated} from "@react-spring/web";
import { Div } from "../../base/utils/HTMLTags";
import {ReactUIElement} from "../../base/element/ReactUIElement";


class Text extends ReactUIElement {
    Body = ({content}:any):any => {
        return Div(content)
            .height(this.S.height ?? "max-content")
            .width(this.S.width ?? "max-content")
            .textAlign("center").verticalAlign("middle")
    }
}


export default function(content: string | number) {
    return new Text({content})
}