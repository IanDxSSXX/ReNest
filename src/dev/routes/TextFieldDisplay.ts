import {FuncView} from "../../base";
import {useRef} from "react";
import {TextField} from "../../component";

export const TextFieldDisplay = FuncView(() => {
    const textRef = useRef("用ref")

    return (
        TextField(textRef.current)
            .placeHolder("哈哈哈")
            .onChange((newText: any) => {
                textRef.current = newText
                console.log(textRef.current)
            })
            .variant("underlined")
            .autoFocus()
    )
})