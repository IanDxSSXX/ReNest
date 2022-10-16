import {Div} from "../../core/utils/HTMLTags";
import {View, ViewWrapper} from "../../core/element/ReactUIElement";


class Text extends View {
    Body = ({content}:any):any =>
        Div(content)
            .height("max-content")
            .width("max-content")
            .textAlign("center")
            .verticalAlign("middle")
}


export default (content: string | number) => ViewWrapper(Text)({content})
