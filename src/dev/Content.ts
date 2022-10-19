import {ToggleDisplay} from "./routes/ToggleDisplay";
import {ListDisplay} from "./routes/ListDisplay";
import {
    Context,
    ContextProvider,
    FuncView,
    Navigate,
    NavigationView,
    ThemeProvider,
    useRUIState,
    View,
    ViewWrapper
} from "../core";
import {TextFieldDisplay} from "./routes/TextFieldDisplay";
import {ImageDisplay} from "./routes/ImageDisplay";
import {Button, HStack, Paper, VStack, ZStack, Text} from "../component";
import Test from "./Test"
import ProgressDisplay from "./routes/ProgressDisplay";
import ContextDisplay from "./routes/ContextDisplay";
import {useTheme} from "../core/theme/ThemeState";
import {useEffect} from "react";

let myThemes = {
    first: {
        Button: {
            bg: "#00AAFF",
            border: "#00FF00",
            fg: "#00AAFF"
        }
    },
    second: {
        Button: {
            bg: "#AA00AA",
            border: "#666666",
            fg: "#AA88AA"
        }
    }
}

class TopBarView extends View {
    @Navigate nv: any
    // @Context themeState: any

    Body = () =>
        ZStack(
            Paper()
                .width("600px")
                .height("80px"),
            HStack(
                Button("home")
                    .onClick(() => this.nv("/")),
                Button("text field")
                    .onClick(() => this.nv("/textField")),
                Button("list")
                    .onClick(() => this.nv("/list")),
                Button("toggle")
                    .onClick(() => this.nv("/toggle")),
                Button("progress")
                    .onClick(() => this.nv("/progress")),
                Button("image")
                    .themeName("first")
                    .onClick(() => this.nv("/image")),
                Button("context")
                    .themeName("first")
                    .onClick(() => this.nv("/context")),
                Button("::::")
                    .onClick(() => this.nv("/12839")),
            ).spacing("10px")
        )

}

const TopBar = ViewWrapper(TopBarView)

const Content = FuncView(() => {
    let themeState = useTheme(myThemes, "second")
    let aaa = useRUIState(false)

    return (
            ThemeProvider(
                ZStack(
                    Paper()
                        .width("1000px")
                        .height("1000px")
                        ,
                    VStack(
                        Button(aaa.value)
                            .onClick(() => aaa.setValue(prev=>!prev)),
                        TopBar()
                            .padding("20px"),
                        NavigationView({
                            "/": () => Text("welcome to react UI, click the button above to view component"),
                            textField: () => TextFieldDisplay(),
                            list: () => ListDisplay(),
                            toggle: () => ToggleDisplay(),
                            image: () => ImageDisplay(),
                            progress: () => ProgressDisplay(),
                            context: () => ContextDisplay(),
                            "_abc+": (value:any) => ContextDisplay(), // regExp
                            "_what[a+]": (value:any) => HStack("no",value), // regExp
                            _: (value:any) =>  ProgressDisplay(), // any other route
                        })
                    ).padding("20px")

                )
                    .alignmentH("leading")
                    .alignmentV("top")
                    .padding("70px")

            )
                .useTheme(themeState)
    )
})

export default Content
// export default ContextDisplay
// export default ProgressDisplay
// export default Test