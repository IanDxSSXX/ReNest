import {ForEach, FuncView, useRUIState} from "../../core";
import {Button, VStack} from "../../component";
import List from "../../component/Displayer/List";

export const ListDisplay = FuncView(() => {
    let numArr = Array(4).fill(0)
    let alignment = useRUIState(false)
    return (
        VStack(
            Button("click")
                .onClick(() => {
                    alignment.setValue(pre=>!pre)
                }),
            List(numArr, (_,idx) =>
                Button(`horizontal list ${idx}`).key(idx)
            ).horizontal().spacing("10px"),
            List(numArr, (_,idx) =>
                Button(`vertical list ${idx}`).key(idx)
            ).vertical().spacing("10px"),
            List(numArr, (_,idx) =>
                Button(`divider list ${idx}`).key(idx)
            )
                .vertical(!alignment.value)
                .horizontal(alignment.value)
                .spacing("10px").divider("solid"),
        ).spacing("20px").padding("20px")
    )
})