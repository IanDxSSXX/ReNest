import {Context, ContextProvider, Contexts, Ref, State, View, ViewWrapper} from "../../core";
import {Text, TextField} from "../../component";
import {Observe} from "../../core/element/Decorator";
import Running from "../../core/base/Running";

class ChildView extends View {
    @Context context1: string | any
    @Contexts aa: string | any

    Body = () =>
        Text(this.context1)

    @Observe _context1 = () => {
        console.log(Running.ContextStore)
    }

    didMount = () => {
        console.log("hh", this.aa)
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