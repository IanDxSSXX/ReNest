import {Ref, View, ViewWrapper} from "@renest/renest";
import {TextField} from "../../component";


class TextFieldDisplay extends View {
    @Ref text = "这是text"
    Body = () =>
        TextField(this.text)
            .placeHolder("哈哈哈")
            .onChange((newText: any) => {
                this.text = newText
                console.log()
            })
            .variant("underlined")
            .autoFocus()

}


export default ViewWrapper(TextFieldDisplay)