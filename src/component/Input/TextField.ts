import {useSpring} from "@react-spring/web";
import {useRef} from "react";
import {ReactUIElement} from "../../base/element/ReactUIElement";
import {RUIProp} from "../../base/element/Helpers";
import {pixelToInt, useRUIState} from "../../base/utils/Utils";
import ZStack from "../Container/ZStack";
import {Input} from "../../base/utils/HTMLTags"
import AnimatedDiv from "../Other/Spring";
import Text from "../Displayer/Text";
import {RUIColor} from "../../base/theme/Colors";
import {ConditionView} from "../../base";

const themes = {
    primary: {
        unselected: RUIColor.white.dark,
        over: RUIColor.red.light,
        selected: RUIColor.red.standard,
        foreground: RUIColor.white.light,
    },
    secondary: {
        unselected: RUIColor.white.dark,
        over: RUIColor.green.light,
        selected: RUIColor.green.standard,
        foreground: RUIColor.white.light,
    },
    tertiary: {
        unselected: RUIColor.white.dark,
        over: RUIColor.blue.light,
        selected: RUIColor.blue.standard,
        foreground: RUIColor.white.light,
    },
}

class TextField extends ReactUIElement {
    defaultTheme = themes.primary

    Body = ({defaultText}: any): any => {
        const inputElement = useRef()
        const textFieldElement = useRef()
        const textRef = useRef(defaultText)
        const isTyping = useRUIState(textRef.current !== "")
        const isMouseOver = useRUIState(false)
        const fontSize = "15px"
        const variantUnderlined = this.C.variant === "underlined"

        const styles = useSpring({
            to:{
                fontSize: isTyping.value && this.C.placeHolder ? pixelToInt(fontSize)*7/10 : pixelToInt(fontSize),
                bottom: isTyping.value && this.C.placeHolder ? "50%" : "0"
            },
            config: { duration: 200 },
        });
        
        return (
            ZStack(
                Input()
                    .ref(inputElement)
                    .width("200px")
                    .outline("none")
                    .border("solid")
                    .fontSize(fontSize)
                    .borderWidth(variantUnderlined ? "0px 0px 1px 0px" : "1px")
                    .borderRadius(variantUnderlined ? "0px" : "5px")
                    .padding(variantUnderlined ? "7px 0px" : "7px")
                    .borderColor(isTyping.value ? this.theme.selected :
                            (isMouseOver.value || this.C.disable) ? this.theme.over : this.theme.unselected)
                    .setProp("defaultValue", textRef.current)
                    .onChange(() => {
                        textRef.current = (inputElement as any).current.value
                        !!this.C.onChange && this.C.onChange(textRef.current)
                    })
                    .backgroundColor(this.theme.foreground),
                ConditionView((this.C.placeHolder ?? "") === "", {
                    false: () =>
                        AnimatedDiv(
                            Text(this.C.placeHolder)
                                .color(this.C.disable ? this.theme.over :
                                    isTyping.value ? this.theme.selected : this.theme.unselected)
                                .background(`linear-gradient(to top , ${this.theme.foreground} 0%, ${this.theme.foreground}  50%, transparent 50%, transparent 100%)`)
                                .padding(variantUnderlined ? "0px" : "3px")
                                .marginLeft(variantUnderlined ? "0px" : "5px")
                                .userSelect("none")
                                .pointerEvents("none")
                        )
                            .fontSize(fontSize)
                            .style(styles)
                })
            )
                .ref(textFieldElement)
                .alignmentH("leading")
                .height("max-content")
                .width("max-content")
                .pointerEvents("none", this.C.disable ?? false)
                .opacity("0.5", this.C.disable ?? false)
                .onMouseOver(() => {
                    isMouseOver.value = true
                })
                .onMouseOut(() => {
                    isMouseOver.value = false
                })
                .onMouseDown(() => {
                    isTyping.value = true
                })
                .didMount(() => {
                    if (this.C.autoFocus) {
                        (inputElement.current as any).focus()
                        isTyping.value = true;
                        (inputElement.current as any).borderColor = this.theme.selected
                    }
                })
                .didUpdate(() => {
                    if (this.C.disable) return
                    let clickOutsideHandler = (event: any) => {
                        if (!(textFieldElement.current as any)?.contains(event.target) && textRef.current === "")
                            isTyping.value = false
                    }
                    document.addEventListener("mousedown", clickOutsideHandler);

                    return () => {
                        document.removeEventListener("mousedown", clickOutsideHandler);
                    };
                }, [isTyping])
        )
    }
    @RUIProp
    placeHolder(value: string) { return this }

    @RUIProp
    variant(value: "outlined" | "underlined") { return this }

    @RUIProp
    disable(value: boolean=true) { return this }

    @RUIProp
    autoFocus(value: boolean = true) { return this }

    @RUIProp
    onChange(value: any) { return this }
}


export default function(defaultText: string) {
    return new TextField({defaultText}).themes(themes)
}
