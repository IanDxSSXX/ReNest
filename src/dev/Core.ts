import {
    ConditionView,
    Context,
    ContextProvider,
    Preset,
    Prop,
    required,
    State,
    TagView,
    View,
    ViewWrapper
} from "../core";
import {Button, Div, Span} from "./Convert"
import {useEffect} from "react";


class MyComponentSubView extends View {
    @State num = 0
    @Context hh = 1

    Body = () =>
        Div(
            this.hh
        )
}

const MyComponentSub = ViewWrapper(MyComponentSubView)
class MyComponentSubView2 extends View {
    Body = () =>
        MyComponentSub()
}

const MyComponentSub2 = ViewWrapper(MyComponentSubView)
class MyComponentSubView3 extends View {
    Body = () =>
        MyComponentSub2()
}

const MyComponentSub3 = ViewWrapper(MyComponentSubView)

class MyComponent extends View {
    @State num = 0

    Body = () =>
        ContextProvider(
            MyComponentSub3(),
        )
            .context({
                hh: "hhh"
            })

}


export default ViewWrapper(MyComponent)