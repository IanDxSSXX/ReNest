import {ReactUIElement} from "../../base/ReactUIElement";
import {Div} from "../../base/HTMLTags";
import {ReactUIThemeColorMap} from "../../base/Interfaces";

class Paper extends ReactUIElement {
    themeColorMap: ReactUIThemeColorMap = {
        "first": "foreground",
    }

    Body = () => {
        const paper = Div().registerBy(this)

        return paper
            .backgroundColor(this.themeColor.first!.light!)
            .width(paper.S.width ?? "200px")
            .height(paper.S.height ?? "280px")
            .borderRadius("7px")
            .boxShadow(`2px 2px 4px 1px ${this.themeColor.first.dark!}`)
    }
}


export default function() {
    return new Paper()
}
