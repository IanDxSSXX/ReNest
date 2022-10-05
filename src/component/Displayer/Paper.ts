import {ReactUIElement} from "../../base/element/ReactUIElement";
import {Div} from "../../base/utils/HTMLTags";

class Paper extends ReactUIElement {
    defaultTheme = {
            bg: "#AA00AA",
            border: "#FFAAFF"
    }

    Body = () => {
        const paper = Div().registerBy(this)

        return paper
            .backgroundColor(this.theme.bg)
            .width(paper.S.width ?? "200px")
            .height(paper.S.height ?? "280px")
            .borderRadius("7px")
            .boxShadow(`2px 2px 4px 1px ${this.theme.border}`)
    }
}


export default function() {
    return new Paper()
}
