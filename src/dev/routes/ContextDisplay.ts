import {Context, ContextProvider, Contexts, Ref, State, View, ViewWrapper, Observe} from "@iandx/reactui";
import {Button, Text, TextField, VStack} from "../../component";

class ChildView extends View {
    @Context context1: string | any

    Body = () =>
        VStack(
            Text(this.context1),
            Button("clickme")
                .onClick(() => {
                    // if (this.themeState.is("first")) {
                    //     this.themeState.to("second")
                    // } else {
                    //     this.themeState.to("first")
                    // }
                })
        )

    didMount = () => {
    }
}
const Child = ViewWrapper(ChildView)

class ContextDisplay extends View {
    @State text = "ok"

    Body = () =>
        ContextProvider(
            TextField(this.text)
                .onChange((newValue: any) => {
                    this.text = newValue
                }),
            // Text("hh")
            Child()
        )
            .context({
                context1: this.text
            })

    didMount = () => {
        console.log("hahahhaah")
    }

}

export default ViewWrapper(ContextDisplay)