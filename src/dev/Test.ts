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
    @State A: any = 1
    @Context mm: any
    @Prop JJ: any = "test"
    @DotProp fuck: any = 1

    Body = () => {
        console.log("jjkk", this.fuck)

        return VStack(
            Button("hh")
                .onClick(() => {
                    console.log(this.fuck)
                    this.A.setValue((pre: any) => pre + 1)
                }).id(uid()),
            Text(`${this.JJ}`)
        )
            .didMount(() => {
                // console.log(this.mm.value)
                // console.log(c)
            })
            .didUpdate(() => {
                console.log("rerender")
            })

    }
}
let Sub1 = FuncView(CSub1)


class CMain extends View {
    @State b: any = false
    @Ref c: any = 1
    @State text: any = "fs"

    Body = () =>
        ContextProvider(
                VStack(
                    TextField(this.text.value)
                        .onChange((newT:string) => {this.text.value = newT}),
                    Button("1")
                        .onClick(() => {
                            this.b.setValue((pre: any) => !pre)
                        })
                        .disable(),
                    Sub1({b: this.b.value})
                        // .thisIsDot("123456"),
                )
        )
            .context({mm: this.b})
}


const Main = FuncView(CMain)

export default Main