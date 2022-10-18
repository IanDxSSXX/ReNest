import {Context, ContextProvider, Contexts, Ref, State, View, ViewWrapper} from "../../core";
import {Button, Text, TextField, VStack} from "../../component";
import {Observe} from "../../core/element/Decorator";
import Running from "../../core/base/Running";

class ChildView extends View {
    @Context context1: string | any

    Body = () =>
        VStack(
            Text(this.context1),
            Button("clickme")
                .onClick(() => {
                    if (this.themeState.is("first")) {
                        this.themeState.to("second")
                    } else {
                        this.themeState.to("first")
                    }
                })
        )

    didMount = () => {
    }
    @Observe _context1 = () => {
        console.log(Running.ContextStore)
    }
}
const Child = ViewWrapper(ChildView)

class ContextDisplay extends View {
    @State text: any = "ok"

    Body = () =>
        ContextProvider(
            TextField(this.text.value)
                .onChange((newValue: any) => {
                    this.text.value = newValue
                }),
            // Text("hh")
            Child()
        )
            .context({
                context1: this.text.value
            })

    didMount = () => {
        console.log("hahahhaah")
    }

}

export default ViewWrapper(ContextDisplay)