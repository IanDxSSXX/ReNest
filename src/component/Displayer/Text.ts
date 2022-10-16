import {Div} from "../../base/utils/HTMLTags";
import {FuncView, View} from "../../base/element/ReactUIElement";


class Text extends View {
    Body = ({content}:any):any =>
        Div(content)
            .height("max-content")
            .width("max-content")
            .textAlign("center")
            .verticalAlign("middle")
}


export default function(content: string | number) {
    return FuncView (Text)({content})
}
