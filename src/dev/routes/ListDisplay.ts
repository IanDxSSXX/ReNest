import {RUI} from "../../base";
import {Button, VStack} from "../../component";
import List from "../../component/Displayer/List";

export const ListDisplay = RUI(() => {
    return (
        VStack(
            List(Array(4), (_,idx) =>
                Button(`horizontal list ${idx}`).key(idx)
            ).horizontal().spacing("10px"),
            List(Array(4), (_,idx) =>
                Button(`vertical list ${idx}`).key(idx)
            ).vertical().spacing("10px"),
            List(Array(4), (_,idx) =>
                Button(`divider list ${idx}`).key(idx)
            ).vertical().spacing("10px").divider("solid"),
        ).spacing("20px").padding("20px")
    )
})