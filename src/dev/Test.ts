import {RUI, ThemeProvider, uid, useRUIState} from "../base";
import {ReactUIElement} from "../base/element/ReactUIElement";
import {Button, VStack, Text} from "../component";
import {ContextProvider} from "../base/context/ContextProvider";
import {useTheme} from "../base/theme/ThemeProvider";
import {Context, DotProp, Ref, SHook, State, Theme} from "../base/element/HookDecorator";

let C2F = (A: any) => (p?: any) => new A(p)
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
class CSub1 extends ReactUIElement {
    @State A: any = 1
    @Context mm: any


    Body = ({b}:any) =>
        VStack(
            Button("hh")
                .onClick(() => {
                    this.A.setValue((pre: any)=>pre+1)
                }).id(uid()),
            Text(this.A.value),
            Text(`${this.mm.value}`),
            Text(`${b}`)
        )
            .didMount(() => {
                console.log(this.mm.value)
                // console.log(c)
            })
            .didUpdate(() => {
                console.log("rerender")
            })
}
let Sub1 = C2F(CSub1)
class CSub2 extends ReactUIElement {
    @DotProp whatIsYou() {return this}

    Body = ({b}:any) =>
        VStack(
            Text("fuck"),
            Text(this.whatIsYou as any)
        )
            .didUpdate(() => {
                console.log("rerender2")
            })
}
let Sub2 = C2F(CSub2)

class CMain extends ReactUIElement {
    @State b: any = false
    @State a: any = false
    @Ref c: any = 1
    @Theme myTheme: any = [myThemes, "first"]


    Body = () =>
        // VStack(
        ThemeProvider(
            ContextProvider(
                // ContextProvider(
                    VStack(
                        Button("click me")
                            .onClick(() => {
                                this.b.setValue((pre: any) => !pre)
                                this.myTheme.to("second")
                                // this.a.setValue(pre=>!pre)
                            }),
                        Text(`${this.b.value}`),
                        Sub1({b: false}),
                        Sub2()
                            .whatIsYou("ceshi")
                    )
                // )
                //     .context({look: true})

            )
                .context({mm: this.b})
        )
            .useTheme(this.myTheme)
    // )
}


const Main = C2F(CMain)

export default Main