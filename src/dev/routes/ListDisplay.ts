import {ForEach, FuncView, View, ViewWrapper} from "@renest/renest";
import {Button, VStack} from "../../component";
import List from "../../component/Displayer/List";

class ListDisplay extends View {
    numArr = Array(4).fill(0)
    Body = () =>
        VStack(
            List(this.numArr, (_,idx) =>
                Button(`horizontal list ${idx}`).key(idx)
            ).horizontal().spacing("10px"),
            List(this.numArr, (_,idx) =>
                Button(`vertical list ${idx}`).key(idx)
            ).vertical().spacing("10px"),
            List(this.numArr, (_,idx) =>
                Button(`divider list ${idx}`).key(idx)
            )
                .spacing("10px")
                .divider("solid"),
        ).spacing("20px").padding("20px")
}

export default ViewWrapper(ListDisplay)