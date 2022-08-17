import {useEffect, useRef} from "react";
import {
    NavigationView,
    ForEach,
    useRUIState,
    range,
    RUI,
    ThemeView
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
import {NavigateTo} from "../base/ReactUINavigation";


const ImageDisplay = RUI(() =>
    VStack("dfa")
)



const ToggleDisplay = RUI(() => {
    const toggleState = useRUIState(false)

    useEffect(() => {
        console.log(toggleState.value)
    })

    return (
        Toggle(toggleState.value).setColor("tertiary")
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

const TopBar = RUI(() => {
    return (
        ZStack(
            Paper().width("600px").height("80px"),
            HStack(
                Button("home").onClick(NavigateTo("/")),
                Button("text field").onClick(NavigateTo("/textField")),
                Button("list").onClick(NavigateTo("/list")),
                Button("toggle").onClick(NavigateTo("/toggle")),
                Button("image").onClick(NavigateTo("/image")),
                Button("::::").onClick(NavigateTo("/12839")),
            ).spacing("10px")
        )
    )
})


const Content = RUI(() => {
    return (
        ThemeView(
            ZStack(
            Paper().width("1000px").height("1000px"),
            VStack(
                TopBar().padding("20px").id("6666").themeTag("tag1"),
                NavigationView({
                    "": Text("welcom to react UI, click the button above to view component"),
                    "textField": TextFieldDisplay(),
                    "list": ListDisplay(),
                    "toggle": ToggleDisplay(),
                    "image": ImageDisplay(),
                    ":abc+": (value:any) => HStack("abc   ",value),
                    ":what[a+]": (value:any) => HStack("no   ",value),
                    ":": (value:any) => HStack(value),
                }).themeTag("tag2")
                ).padding("20px")
            ).alignmentH("leading").alignmentV("top").padding("70px")
        ).themes({"tag1": {colors:{primary:{dark:"#AA9900"}}},
            "tag2": {colors:{primary:{dark:"#00AA88"}}}
        })
    )
})




export default Content