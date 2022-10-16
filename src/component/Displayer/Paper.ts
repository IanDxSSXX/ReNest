import {Div} from "../../base/utils/HTMLTags";
import {RUIColor} from "../../base/theme/Colors";
import {View, ViewWrapper} from "../../base";


class Paper extends View {
    defaultTheme =  {
        bg: RUIColor.white.light,
        shadow: RUIColor.white.dark
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
