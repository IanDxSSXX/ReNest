import {Div} from "../Util/Tags";
import {View, ViewWrapper} from "@renest/renest"


class Text extends View {
    Body = ({content}:any):any =>
        Div(content)
            .height("max-content")
            .width("max-content")
            .textAlign("center")
            .verticalAlign("middle")
}


export default (content: string | number) => ViewWrapper(Text)({content})
