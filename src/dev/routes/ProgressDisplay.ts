import {State, View, ViewWrapper} from "@renest/renest";
import {Button, VStack} from "../../component";
import Progress from "../../component/Displayer/Progress";

class ProgressDisplay extends View {
    @State valueState = 0
    @State myStyle = "circle"

    Body = () =>
        VStack(
            Progress(this.valueState)
                .variant(this.myStyle),
            Button("+")
                .onClick(() => {
                    this.valueState += 0.05
                }),
            Button("-")
                .onClick(() => {
                    this.valueState -= 0.05
                }),
            Button("change style")
                .onClick(() => {
                    this.myStyle = this.myStyle === "line" ? "circle":"line"
                })
        )
            .spacing("10px")
}


export default ViewWrapper(ProgressDisplay)
