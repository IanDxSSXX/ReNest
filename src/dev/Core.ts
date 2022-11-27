import {
    ConditionView,
    Context,
    ContextProvider,
    Preset,
    Prop, required,
    State,
    TagView,
    View,
    ViewWrapper
} from "../core";
import {Button, Div, Span} from "./Convert"
import {useEffect} from "react";


class MyComponentSubView extends View {
    @State num = 0
    @Prop hh = required

    Body = () =>
        Div(
            this.hh
        )
}

const MyComponentSub = ViewWrapper(MyComponentSubView)

class MyComponent extends View {
    @State num = 0

    Body = () =>
        MyComponentSub()

}


export default ViewWrapper(MyComponent)