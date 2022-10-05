import {useEffect, useRef} from "react";
import {
    NavigationView,
    ForEach,
    useRUIState,
    RUI,
    ThemeProvider, ConditionView
} from "../base";
import {
    Button,
    VStack,
    TextField,
    Text,
    Toggle,
    HStack,
} from "../component"
import Paper from "../component/Displayer/Paper"
import ZStack from "../component/Container/ZStack";
import {NavigateTo} from "../base";
import {useThemes} from "../base/theme/ThemeProvider";
import {ToggleDisplay} from "./routes/ToggleDisplay";
import {TextFieldDisplay} from "./routes/TextFieldDisplay";
import {ListDisplay} from "./routes/ListDisplay";
import {ImageDisplay} from "./routes/ImageDisplay";
import {ContextProvider} from "../base/context/ContextProvider";




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
                .themeName("secondary")
                .onClick(NavigateTo("/")),
            Button("text field")
                .onClick(NavigateTo("/textField")),
            Button("list")
                .onClick(NavigateTo("/list")),
            Button("toggle")
                .onClick(NavigateTo("/toggle")),
            Button("image")
                .onClick(NavigateTo("/image")),
            Button("::::")
                .onClick(NavigateTo("/12839")),
        ).spacing("10px")
    )
)

const Content = RUI(() => {
    let theme = useThemes(myThemes, "secondary")

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
            .theme(theme)

    )
})


const TestB = RUI(({}, {theme}) => {
    return (
        Button("里面的")
            .onClick(() => {
                if (theme.themeName === "light") {
                    theme.to("dark")
                } else {
                    theme.to("light")
                }
            })
    )
})

let themehh = {
    light: {
        Button: {
            bg: "#FFAA99",
            fg: "#AAFF99"
        },
    },
    dark: {
        Button: {
            bg: "#666666",
            fg: "#111188"
        },
        Button_hhh: {
            bg: "#FFAA99",
            fg: "#111188"
        }
    },
}

const Test = RUI(() => {
    let theme = useThemes(themehh, "dark")
    return (
        ThemeProvider (
            VStack(
                Paper()
                    .width("100px")
                    .height("100px"),
                TestB(),
                Button("click me")
                    .onClick(() => {
                        if (theme.themeName === "light") {
                            theme.to("dark")
                        } else {
                            theme.to("light")
                        }
                    }),
                Button("click me")
                    .themeTag("hhh"),
                Button("click me")
                    .themeTag("hh")
                    .themeName("tertiary")
            )
        )
            .theme(theme)
    )
})

export default Test
// export default TopBar
