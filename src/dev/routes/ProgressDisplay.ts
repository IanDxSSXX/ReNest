import {FuncView, State, useRUIState, View, ViewWrapper} from "../../core";
import {useEffect} from "react";
import {Button, Progress, Text, VStack} from "../../component";
import {Div} from "../../core/utils/HTMLTags";
import {uid} from "../../core/utils/Utils";

class ProgressDisplay extends View {
    @State valueState: any = 0
    @State style: any = "circle"

    Body = () =>
        VStack(
            Progress(this.valueState)
                .variant(this.style).duration(600),
            Button("+")
                .onClick(() => {
                    this.valueState += 0.05
                }),
            Button("-")
                .onClick(() => {
                    this.valueState += 0.05
                }),
            Button("change style")
                .onClick(() => {
                    this.style = this.style === "line" ? "circle":"line"
                })
        )
            .spacing("10px")
}


export default ViewWrapper(ProgressDisplay)

let TT = FuncView(() => {
    let m = useRUIState(1)
    console.log("what")
    return Text("hh")
})

let ATT = FuncView(() => {
    console.log("g")

    return Text("okk")
})

const A = FuncView(() => {
    let style = useRUIState("line")
    return VStack(
        style.value === "line"?TT().id("hh").key(uid()):ATT().id("hh").key(uid()),
        Button("change style")
            .onClick(() => {
                style.setValue((prev: any) => prev === "line" ? "circle":"line")
            })

    )
})
// export default A