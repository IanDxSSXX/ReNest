import {ReactUIElement} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";
import {RUIColor} from "../../base/theme/Colors";


let themes = {
    primary: {
        bg: RUIColor.white.light,
        shadow: RUIColor.white.dark
    },
    secondary: {
        bg: RUIColor.red.light,
        shadow: RUIColor.red.dark
    }
}

class Paper extends ReactUIElement {
    defaultTheme = themes.primary

    Body = () => {
        const paper = Div()

        return paper
            .backgroundColor(this.theme.bg)
            .width("200px")
            .height("280px")
            .borderRadius("7px")
            .boxShadow(`2px 2px 4px 1px ${this.theme.shadow}`)
    }
}

export default function() {
    return new Paper().themes(themes).themeName("primary")
}
