import {Div} from "../Util/Tags";
import {RTColor} from "../Util/Colors";
import {View, ViewWrapper} from "@renest/renest"


class Paper extends View {
    defaultTheme =  {
        bg: RTColor.white.light,
        shadow: RTColor.white.dark
    }

    Body = () =>
        Div()
            .backgroundColor(this.theme.bg)
            .width("200px")
            .height("280px")
            .borderRadius("7px")
            .boxShadow(`2px 2px 4px 1px ${this.theme.shadow}`)

}

export default ViewWrapper(Paper)
