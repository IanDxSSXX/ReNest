import {useSpring} from "@react-spring/web";
import {MutableRefObject, useEffect, useRef} from "react";
import {ReactUIElement, reactUIProp} from "../../base/ReactUIElement";
import {pixelToInt, useRUIState, useTrigger, useTriggerEvent} from "../../base/Utils";
import ZStack from "../Container/ZStack";
import {Input} from "../../base/HTMLTags"
import AnimatedDiv from "../Other/Spring";
import Text from "../Displayer/Text";
import {ReactUIThemeColorMap} from "../../base/Interfaces";


export class TextField extends ReactUIElement {
    themeColorMap: ReactUIThemeColorMap = {
        "second": "background",
        "third": "foreground"
    }


    Body =  ({defaultText}: any): any => {
        // ---- init
        const input = Input().ruiClassName("Input")
        const text = Text(this.C.placeHolder ?? "").ruiClassName("PlacerHolder")
        const animatedDiv = AnimatedDiv(text).ruiClassName("AnimatedDiv")
        const textField = ZStack(input, animatedDiv).registerBy(this)

        this.registerViewStyles(input, "height", "width", "font", "fontWeight", "fontSize", "fontFamily")
        this.registerViewStyles(animatedDiv, "font", "fontWeight", "fontSize", "fontFamily")

        // ---- variables
        let colors = {
            unselected: textField.themeColor.second.light!,
            over: textField.themeColor.second.standard!,
            selected: textField.themeColor.first.standard!,
            foreground: textField.themeColor.third.light!
        }
        const inputElement = useRef()
        const textFieldElement = useRef()
        const textRef = useRef(defaultText)
        const textTrigger = useTrigger()
        const isTyping = useRUIState(textRef.current !== "")
        const isMouseOver = useRUIState(false)
        const fontSize = textField.S.fontSize ?? "15px"
        const variantUnderlined = this.C.variant === "underlined"

        useTriggerEvent(textTrigger, () => {
            !!this.C.onChange && this.C.onChange(textRef.current)
        })
        const styles = useSpring({
            to:{
                fontSize: isTyping.value ? pixelToInt(fontSize)*7/10 : pixelToInt(fontSize),
                bottom: isTyping.value  ? "50%" : "0"
            },
            config: { duration: 200 },
        });

        // ---- style
        input
            .ref(inputElement)
            .width(input.S.width ?? "200px")
            .outline("none")
            .border("solid")
            .fontSize(fontSize)
            .borderWidth(variantUnderlined ? "0px 0px 1px 0px" : "1px")
            .borderRadius(variantUnderlined ? "0px" : "5px")
            .padding(variantUnderlined ? "7px 0px" : "7px")
            .borderColor(isTyping.value ? colors.selected :
                isMouseOver.value ? colors.over : colors.unselected)
            .setProp("defaultValue", textRef.current)
            .onChange(() => {
                textRef.current = (inputElement as any).current.value
                textTrigger.trigger()
            })
            .backgroundColor(colors.foreground)

        text
            .color(isTyping.value ? colors.selected : colors.unselected)
            .backgroundColor(colors.foreground)
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
            .height(textField.S.height ?? "max-content")
            .width(textField.S.width ?? "max-content")
            .onMouseOver(() => {
                isMouseOver.value = true
            })
            .onMouseOut(() => {
                isMouseOver.value = false
            })
            .onMouseDown(() => {
                isTyping.value = true
            })

        if (this.C.disable ?? false) {
            textField.pointerEvents("none").opacity("0.5")
            input.borderColor(colors.over)
            text.color(colors.over)
        }

        // ---- detect click outside
        useEffect(() => {
            if (this.C.disable ?? false) {
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
            if (this.C.autoFocus ?? false) {
                (inputElement.current as any).focus()
                isTyping.value = true
                input.element.style.borderColor = colors.selected
            }
        }, [])

        return textField
    }

    @reactUIProp
    placeHolder(value: string) { return this }

    @reactUIProp
    variant(value: "outlined" | "underlined") { return this }

    @reactUIProp
    disable(value: boolean=true) { return this }

    @reactUIProp
    autoFocus(value: boolean = true) { return this }

    @reactUIProp
    onChange(value: any) { return this }
}

export default function(defaultText: string) {
    return new TextField({defaultText})
}