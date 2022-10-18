import Content from "./Content";
import {Context, ContextProvider, FuncView, Prop, State, Theme, ThemeProvider, View, ViewWrapper} from "../core";
import {useTheme} from "../core/theme/ThemeState";
import {Button, List} from "../component";
import Running from "../core/base/Running";
// import Calculator from "../dev/Calculator";


let RUIApp = FuncView(() => {
    return (
        Content()
    )
})

export default RUIApp
