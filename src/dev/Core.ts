import {ConditionView, State, TagView, View, ViewWrapper} from "../core";
import {Div} from "./Convert"


class MyComponent extends View {
    Body = () => {
        let a = true
        return (
            Div(
                ConditionView(a,  {
                    true: () => Div(55)
                })
            )
                .fuck("me")

        )
    }
}

const a = ViewWrapper(MyComponent)


class MyComponent1 extends View {
    Body = () => a()
}
const b = ViewWrapper(MyComponent1)


class MyComponent2 extends View {
    Body = () => Div(b())
}
const c = ViewWrapper(MyComponent2)

class MyComponent3 extends View {
    Body = () => c()
}
const d = ViewWrapper(MyComponent3)

class MyComponent4 extends View {
    Body = () => d()
}
const e = ViewWrapper(MyComponent4)

const P = TagView("p")
const Button = TagView("button")

class Counter extends View {
    @State num = 0

    Body = () =>
        Div(
            P(this.num),
            Button("+")
                .onClick(() => {
                    this.num += 1
                })
        )
}

export default e