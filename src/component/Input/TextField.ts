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
import {Callback, Hook, Ref, State} from "../../base/element/HookDecorator";

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
    defaultThemes = themes
    defaultThemeName = "primary"
    myFontSize = "15px"
    variantUnderlined = this.C.variant === "underlined"
    @Ref inputElement: any
    @Ref textFieldElement: any
    @Ref textRef: any = this.props.defaultText
    @Callback @State isTyping: any = () => this.textRef.current !== ""
    @State isMouseOver: any = false
    @Callback @Hook(useSpring) styles = () => ({
        to:{
            fontSize: this.isTyping.value ? pixelToInt(this.myFontSize)*7/10 : pixelToInt(this.myFontSize),
            bottom: this.isTyping.value ? "50%" : "0"
        },
        config: { duration: 200 },
    })


    Body = () => 
        ZStack(
            Input()
                .ref(this.inputElement)
                .width("200px")
                .outline("none")
                .border("solid")
                .fontSize(this.myFontSize)
                .borderWidth(this.variantUnderlined ? "0px 0px 1px 0px" : "1px")
                .borderRadius(this.variantUnderlined ? "0px" : "5px")
                .padding(this.variantUnderlined ? "7px 0px" : "7px")
                .borderColor(this.isTyping.value ? this.theme.selected :
                        (this.isMouseOver.value || this.C.disable) ? this.theme.over : this.theme.unselected)
                .setProp("defaultValue", this.textRef.current)
                .onChange(() => {
                    this.textRef.current = (this.inputElement as any).current.value
                    !!this.C.onChange && this.C.onChange(this.textRef.current)
                })
                .backgroundColor(this.theme.foreground),
            ConditionView((this.C.placeHolder ?? "") === "", {
                false: () =>
                    AnimatedDiv(
                        Text(this.C.placeHolder)
                            .color(this.C.disable ? this.theme.over :
                                this.isTyping.value ? this.theme.selected : this.theme.unselected)
                            .background(`linear-gradient(to top , ${this.theme.foreground} 0%, ${this.theme.foreground}  50.5%, transparent 50.5%, transparent 100%)`)
                            .padding(this.variantUnderlined ? "0px" : "3px")
                            .marginLeft(this.variantUnderlined ? "0px" : "5px")
                            .userSelect("none")
                            .pointerEvents("none")
                    )
                        .fontSize(this.myFontSize)
                        .style(this.styles)
            })
        )
            .ref(this.textFieldElement)
            .alignmentH("leading")
            .height("max-content")
            .width("max-content")
            .pointerEvents("none", this.C.disable ?? false)
            .opacity("0.5", this.C.disable ?? false)
            .onMouseOver(() => {
                this.isMouseOver.value = true
            })
            .onMouseOut(() => {
                this.isMouseOver.value = false
            })
            .onMouseDown(() => {
                this.isTyping.value = true
            })
            .didMount(() => {
                if (this.C.autoFocus) {
                    (this.inputElement.current as any).focus()
                    this.isTyping.value = true;
                    (this.inputElement.current as any).borderColor = this.theme.selected
                }
            })
            .didUpdate(() => {
                if (this.C.disable) return
                let clickOutsideHandler = (event: any) => {
                    if (!(this.textFieldElement.current as any)?.contains(event.target) && this.textRef.current === "")
                        this.isTyping.value = false
                }
                document.addEventListener("mousedown", clickOutsideHandler);

                return () => {
                    document.removeEventListener("mousedown", clickOutsideHandler);
                };
            }, [this.isTyping])

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
    return new TextField({defaultText})
}
