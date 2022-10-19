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
            Child()
        )
            .context({
                context1: this.text.value
            })


}

export default ViewWrapper(ContextDisplay)