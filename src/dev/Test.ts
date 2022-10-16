import {ReactUIElement, ViewWrapper, View} from "../base/element/ReactUIElement";
import {Button, VStack, Text, TextField} from "../component";
import {Context, DotProp, Prop} from "../base/element/Decorator";
import {Ref, State} from "../base/element/HookDecorator";
import {Div} from "../base/utils/HTMLTags";

let myThemes = {
    first: {
        Button: {
            bg: "#00AAFF",
            border: "#00FF00",
            fg: "#00AAFF"
        }
    },
    second: {
        Button: {
            bg: "#AA00AA",
            border: "#666666",
            fg: "#AA88AA"
        }
    }
}
class CSub1 extends View {
    @Prop toggle: any
    @DotProp text: any

    Body = () =>
        VStack(
            Text(`${this.toggle}`),
            Text(this.text)
        )
            .didMount(() => {
                console.log("hh1")
            })
            .didUpdate(() => {
                console.log("rerender")
            })
}
let Sub1 = ViewWrapper(CSub1)


class CMain extends View {
    @State count: any = 1
    @State toggle: any = false
    @State text: any = "defaultValue"

    Body = () =>
        Div(
            TextField(this.text.value)
                .onChange((newT:string) => {this.text.value = newT}),
            Button("click me")
                .onClick(() => {
                    this.count.setValue((pre: number) => pre + 1)
                    this.toggle.setValue((pre: boolean) => !pre)
                }),
            Text(`count: ${this.count.value}`),
            Sub1({toggle: false})
                .text(this.text.value)
                // .text("11")
                // .didMount(() => {
                //     console.log("hh2")
                // })
        )

}


const Main = ViewWrapper(CMain)

export default Main