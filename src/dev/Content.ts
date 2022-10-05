import {useEffect, useRef} from "react";
import {
    NavigationView,
    ForEach,
    useRUIState,
    range,
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
import List from "../component/Displayer/List";
import Paper from "../component/Displayer/Paper"
import ZStack from "../component/Container/ZStack";
import {NavigateTo} from "../base";
import {useThemes} from "../base/theme/ThemeProvider";


const ImageDisplay = RUI(() =>
    VStack("dfa")
)

const ToggleDisplay = RUI(() => {
    const toggleState = useRUIState(false)

    useEffect(() => {
        console.log(toggleState.value)
    })

    return (
        Toggle(toggleState.value)
            .onChange((v:any)=>{
                toggleState.value = v
            })
    )
})

const ListDisplay = RUI(() => {
    return (
        VStack(
            List(range(4), (item,idx) =>
                Button(`horizontal list ${item}`).key(item)
            ).horizontal().spacing("10px"),
            List(range(4), (item,idx) =>
                Button(`vertical list ${item}`).key(item)
            ).vertical().spacing("10px"),
            List(range(4).asArray(), (item,idx) =>
                Button(`divider list ${item}`).key(item)
            ).vertical().spacing("10px").divider("solid"),
        ).spacing("20px").padding("20px")
    )
})

const TextFieldDisplay = RUI(({wrapper}:any) => {
    const textRef = useRef("用ref")

    return (
        TextField(textRef.current)
            .placeHolder("哈哈哈")
            .onChange((newText: any) => {
                textRef.current = newText
            })
    )
})

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
                .onClick(NavigateTo("/image")),
            Button("::::")
                .onClick(NavigateTo("/12839")),
        ).spacing("10px")
    )
)


const Content = RUI(() => {
    let a = false
    let b = false
    return (
        ThemeProvider(
            ConditionView(a,{
                hh: () => Text("Fsf")

            }).height("50px"),
            ZStack(
            Paper()
                .width("1000px")
                .height("1000px"),
            VStack(
                TopBar()
                    .themeName("tag1")
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
                    .themeName("tag2")
                ).padding("20px")
            )
                .alignmentH("leading")
                .alignmentV("top")
                .padding("70px")
        )
    )
})


const HH = RUI(({aa}: { aa:string }) => {
    return Text(aa)
})

const saHH = RUI(() => {
    return Text("sf")
})


const ContentTest = RUI(() => {
    let a = false

    return VStack(
        Text("S"),
        HH({aa: "s"}),
    )
})

const AA = RUI(() => {
    let themes = useThemes({
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
    })
    return (
        ThemeProvider(
            VStack(
                Button("hhh")
                    .onClick(() => {
                        if (themes.themeName === "second") {
                            themes.to("first")

                        }else {
                            themes.to("second")
                        }
                    }),
                Toggle(true)
            )
        )
            .theme(themes)
    )
})
export default AA
// export default Content
// export default ContentTest