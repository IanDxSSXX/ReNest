import {useSpring} from "@react-spring/web";
import {MutableRefObject, useEffect, useRef} from "react";
import {ReactUIElement, RUIProp} from "../../base/element/ReactUIElement";
import {pixelToInt, useRUIState, useTrigger, useTriggerEffect} from "../../base/utils/Utils";
import ZStack from "../Container/ZStack";
import {Input} from "../../base/utils/HTMLTags"
import AnimatedDiv from "../Other/Spring";
import Text from "../Displayer/Text";
import {RUIColor} from "../../base/theme/Colors";

const themes = {
    primary: {
        unselected: RUIColor.white.dark,
        over: RUIColor.red.light,
        selected: RUIColor.red.standard,
        foreground: RUIColor.white.light,
    },
    secondary: {
        bg: RUIColor.green.light,
        fg: RUIColor.green.dark,
    },
    tertiary: {
        bg: RUIColor.blue.light,
        fg: RUIColor.blue.dark,
    },
}

export class TextField extends ReactUIElement {
    defaultTheme = themes.primary

    Body =  ({defaultText}: any): any => {
        // ---- init
        const input = Input().ruiClassName("Input")
        const text = Text(this.C.placeHolder ?? "").ruiClassName("PlacerHolder")
        const animatedDiv = AnimatedDiv(text).ruiClassName("AnimatedDiv")
        const textField = ZStack(input, animatedDiv).registerBy(this)

        // ---- variables
        const inputElement = useRef()
        const textFieldElement = useRef()
        const textRef = useRef(defaultText)
        const textTrigger = useTrigger()
        const isTyping = useRUIState(textRef.current !== "")
        const isMouseOver = useRUIState(false)
        const fontSize = "15px"
        const variantUnderlined = this.C.variant === "underlined"

        useTriggerEffect(textTrigger, () => {
            !!this.C.onChange && this.C.onChange(textRef.current)
        })
        const styles = useSpring({
            to:{
                fontSize: isTyping.value && this.C.placeHolder ? pixelToInt(fontSize)*7/10 : pixelToInt(fontSize),
                bottom: isTyping.value && this.C.placeHolder ? "50%" : "0"
            },
            config: { duration: 200 },
        });

        // ---- style
        input
            .ref(inputElement)
            .width("200px")
            .outline("none")
            .border("solid")
            .fontSize(fontSize)
            .borderWidth(variantUnderlined ? "0px 0px 1px 0px" : "1px")
            .borderRadius(variantUnderlined ? "0px" : "5px")
            .padding(variantUnderlined ? "7px 0px" : "7px")
            .borderColor(isTyping.value ? this.theme.selected :
                isMouseOver.value ? this.theme.over : this.theme.unselected)
            .setProp("defaultValue", textRef.current)
            .onChange(() => {
                textRef.current = (inputElement as any).current.value
                textTrigger.trigger()
            })
            .backgroundColor(this.theme.foreground)

        text
            .color(isTyping.value ? this.theme.selected : this.theme.unselected)
            .backgroundColor(this.C.placeHolder ? this.theme.foreground: '')
            .padding(variantUnderlined ? "0px" : "3px")
            .marginLeft(variantUnderlined ? "0px" : "5px")
            .userSelect("none")
            .pointerEvents("none")

        animatedDiv
            .fontSize(fontSize)
            .style(styles) /**animation style*/

        textField
            .ref(textFieldElement)
            .alignmentH("leading")
            .height("max-content")
            .width("max-content")
            .onMouseOver(() => {
                isMouseOver.value = true
            })
            .onMouseOut(() => {
                isMouseOver.value = false
            })
            .onMouseDown(() => {
                isTyping.value = true
            })

        if (this.C.disable) {
            textField.pointerEvents("none").opacity("0.5")
            input.borderColor(this.theme.over)
            text.color(this.theme.over)
        }

        // ---- detect click outside
        useEffect(() => {
            if (this.C.disable) {
                return
            }
            let clickOutsideHandler = (event: any) => {
                if (!(textFieldElement.current as any).contains(event.target)) {
                    if (textRef.current === "") {
                        isTyping.value = false
                    }
                }
            }
            document.addEventListener("mousedown", clickOutsideHandler);

            return () => {
                document.removeEventListener("mousedown", clickOutsideHandler);
            };
        }, [isTyping]);


        // ---- render at the first time
        useEffect(() => {
            if (this.C.autoFocus) {
                (inputElement.current as any).focus()
                isTyping.value = true;
                (inputElement.current as any).borderColor = this.theme.selected
            }
        }, [])

        return textField
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
    return new TextField({defaultText}).themes(themes).themeName("primary")
}
