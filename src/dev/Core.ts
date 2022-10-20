import {ConditionView, TagView, View, ViewWrapper} from "../core";
import {Div} from "./Convert"


class MyComponent extends View {
    Body = () => {
        let a = true
        return (
            Div(
                ConditionView(a,  {
                    true: () => Div({a:11})
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


export default e