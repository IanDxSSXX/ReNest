import {RUI, ThemeProvider, uid, useRUIState} from "../base";
import {ReactUIElement, FuncView, View} from "../base/element/ReactUIElement";
import {Button, VStack, Text, TextField} from "../component";
import {ContextProvider} from "../base/context/ContextProvider";
import {useTheme} from "../base/theme/ThemeProvider";
import {Context, DotProp, Prop} from "../base/element/Decorator";
import {Ref, State} from "../base/element/HookDecorator";

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
                // console.log(this.mm.value)
                // console.log(c)
            })
            .didUpdate(() => {
                console.log("rerender")
            })
}
let Sub1 = FuncView(CSub1)


class CMain extends View {
    @State count: any = 1
    @State toggle: any = false
    @State text: any = "defaultValue"

    Body = () =>
        VStack(
            TextField(this.text.value)
                .onChange((newT:string) => {this.text.value = newT}),
            Button("click me")
                .onClick(() => {
                    this.count.setValue((pre: number) => pre + 1)
                    this.toggle.setValue((pre: boolean) => !pre)
                }),
            Text(`count: ${this.count.value}`),
            Sub1({toggle: this.toggle.value})
                .text(this.text.value)
        )
}


const Main = FuncView(CMain)

export default Main