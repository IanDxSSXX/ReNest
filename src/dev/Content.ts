import {
    NavigationView,
    useRUIState,
    RUI,
    ThemeProvider,
    uid
} from "../base";
import {
    Button,
    VStack,
    Text,
    HStack,
} from "../component"
import Paper from "../component/Displayer/Paper"
import ZStack from "../component/Container/ZStack";
import {NavigateTo} from "../base";
import {useTheme} from "../base/theme/ThemeProvider";
import {ToggleDisplay} from "./routes/ToggleDisplay";
import {TextFieldDisplay} from "./routes/TextFieldDisplay";
import {ListDisplay} from "./routes/ListDisplay";
import {ImageDisplay} from "./routes/ImageDisplay";
import lodash from "lodash"
import {useCallback, useEffect, useRef} from "react";
import {ReactUIElement} from "../base/element/ReactUIElement";
import Test from "./Test"


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


const TopBar = RUI(() =>
    ZStack(
        Paper()
            .width("600px")
            .height("80px"),
        HStack(
            Button("home")
                .onClick(NavigateTo("/")),
            Button("text field")
                .onClick(NavigateTo("/textField")),
            Button("list")
                .onClick(NavigateTo("/list")),
            Button("toggle")
                .onClick(NavigateTo("/toggle")),
            Button("image")
                .themeName("first")
                .onClick(NavigateTo("/image")),
            Button("::::")
                .onClick(NavigateTo("/12839")),
        ).spacing("10px")
    )
)

const Content = RUI(() => {
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


// export default Content
export default Test