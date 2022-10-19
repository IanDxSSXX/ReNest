import {Derived, Context, ContextProvider, Contexts, Prop, Ref, State, View, ViewWrapper} from "../../core";
import {Text,Button, TextField, VStack} from "../../component";
import {Observe} from "../../core/element/Decorator";
import Running from "../../core/base/Running";

class ChildView extends View {
    @Context context1: string = "5"

    @Prop a: any = -1
    @Derived(Ref) test: any = () => this.a
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
                    // this.a.setValue(this.a.value+1)
                    // this.a.value = this.a.value + 1
                    // this.a.value += 1
                }),
            Text(this.test)
        )

    didMount = () => {
        console.log("这是进来",this.test, this.a)
    }
    didUpdate = () => {
        console.log("这是进来",this.test, this.a)
    }
    @Observe _context1 = () => {
    }
}
const Child = ViewWrapper(ChildView)

class ContextDisplay extends View {
    @State text: any = "ok"
    @State count = 10

    Body = () =>
        ContextProvider(
            TextField(this.text)
                .onChange((newValue: any) => {
                    this.text = newValue
                }),
            Child({a: this.count}),
            Button("hh")
                .onClick(() => {
                    // (this as any).setCount((pre:any)=>pre+1)
                    this.count += 1
                }),
            Text(this.count)
        )
            .context({
                context1: this.text
            })


}

export default ViewWrapper(ContextDisplay)