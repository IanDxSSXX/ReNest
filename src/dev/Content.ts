import {useTheme} from "../core/theme/ThemeProvider";
import {ToggleDisplay} from "./routes/ToggleDisplay";
import {ListDisplay} from "./routes/ListDisplay";
import {FuncView, Navigate, NavigationView, ThemeProvider, View, ViewWrapper} from "../core";
import {TextFieldDisplay} from "./routes/TextFieldDisplay";
import {ImageDisplay} from "./routes/ImageDisplay";
import {Button, HStack, Paper, VStack, ZStack, Text} from "../component";
import Test from "./Test"
import ProgressDisplay from "./routes/ProgressDisplay";

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
                Button("::::")
                    .onClick(() => this.nv("/12839")),
            ).spacing("10px")
        )
}

const TopBar = ViewWrapper(TopBarView)

const Content = FuncView(() => {
    let theme = useTheme(myThemes, "second")

    return (
        ThemeProvider(
            ZStack(
                Paper()
                    .width("1000px")
                    .height("1000px"),
                VStack(
                    TopBar()
                        .padding("20px"),
                    NavigationView({
                        "": () => Text("welcome to react UI, click the button above to view component"),
                        "textField": () => TextFieldDisplay(),
                        "list": () => ListDisplay(),
                        "toggle": () => ToggleDisplay(),
                        "image": () => ImageDisplay(),
                        "progress": () => ProgressDisplay(),
                        ":abc+": (value:any) => HStack("abc",value), // regExp
                        ":what[a+]": (value:any) => HStack("no",value), // regExp
                        ":": (value:any) => HStack(value), // any other route
                    })
                ).padding("20px")
            )
                .alignmentH("leading")
                .alignmentV("top")
                .padding("70px")
        )
            .useTheme(theme)

    )
})


export default Content
// export default ProgressDisplay
// export default Test