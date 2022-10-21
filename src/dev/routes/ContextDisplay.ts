import {
    Context,
    ContextProvider,
    Contexts,
    Ref,
    State,
    View,
    ViewWrapper,
    Observe,
    Prop,
    DotProp, Derived
} from "@renest/renest";
import {Button, Text, TextField, VStack} from "../../component";

class ChildView extends View {
    // @Context context1: string | any
    @Prop b = 1
    @DotProp c: any
    @Derived(State) hh: any = () => this.b
    @Observe jb = () => {
        console.log("hh")
    }
    // @State hh: any = this.b

    Body = () =>
        VStack(
            Text(this.hh),
            Button("clickme")
                .onClick(() => {
                    this.hh += 1
                    if (this.themeState.is("first")) {
                        this.themeState.to("second")
                    } else {
                        this.themeState.to("first")
                    }
                })

        )

    didMount = () => {
    }
}
const Child = ViewWrapper(ChildView)

class ContextDisplay extends View {
    @State text = "ok"
    @State count =1

    Body = () =>
        ContextProvider(
            TextField(this.text)
                .onChange((newValue: any) => {
                    this.text = newValue
                    console.log(this.text,"hhh")
                }),
            Button("外卖")
                .onClick(() => {
                    this.count ++
                }),
            Text(this.count),
            Child({b:this.count})
                .c(2)
        )
            .context({
                context1: this.text
            })

    didMount = () => {
        console.log("hahahhaah")
    }

}

export default ViewWrapper(ContextDisplay)