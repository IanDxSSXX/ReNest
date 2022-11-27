import {ConditionView, Preset, Prop, required, State, TagView, View, ViewWrapper} from "../core";
import {Button, Div, Span} from "./Convert"
import {useEffect} from "react";


class MyComponentSubView extends View {
    @State num = 0

    Body = () =>
        Div(
            Span(this.num),
            Button("click me")
                .onClick(() => {
                    this.num ++
                    console.log("h")
                }),
        )
}

const MyComponentSub = ViewWrapper(MyComponentSubView)

class MyComponent extends View {
    @State num = 0

    Body = () =>
        Div(
            MyComponentSub(),
            Span(this.num),
            Button("click me")
                .onClick(() => {
                    this.num ++
                    console.log("h")
                }),
        )
            .height("100px")
            .width("110px")
}


export default ViewWrapper(MyComponent)