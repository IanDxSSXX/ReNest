import {Derived, ConditionView, DotProp, Prop, Ref, State, View, ViewWrapper} from "@renest/renest"
import {RTColor} from "../Util/Colors";
import {pixelToInt} from "../Util/Utils";
import ZStack from "../Container/ZStack";
import AnimatedDiv from "../Other/AnimatedDiv";
import Text from "../Displayer/Text";
import {Input} from "../Util/Tags";
import {Spring} from "../Util/Hooks";

const themes = {
    primary: {
        unselected: RTColor.white.dark,
        over: RTColor.red.light,
        selected: RTColor.red.standard,
        foreground: RTColor.white.light,
    },
    secondary: {
        unselected: RTColor.white.dark,
        over: RTColor.green.light,
        selected: RTColor.green.standard,
        foreground: RTColor.white.light,
    },
    tertiary: {
        unselected: RTColor.white.dark,
        over: RTColor.blue.light,
        selected: RTColor.blue.standard,
        foreground: RTColor.white.light,
    },
}

class TextField extends View {
    defaultThemes = themes
    defaultThemeName = "primary"
    myFontSize = "15px"

    @Prop defaultText = ""
    @DotProp placeHolder :string = ""
    @DotProp variant: "outlined" | "underlined" = "outlined"
    variantUnderlined = this.variant === "underlined"

    @DotProp disable: boolean = false
    @DotProp autoFocus: boolean = false
    @DotProp onChange: any
    @Ref inputElement: any
    @Ref textFieldElement: any
    @Derived(Ref) textRef: any = () => this.defaultText
    @Derived(State) isTyping: any = () => this.textRef !== ""
    @State isMouseOver: any = false
    @Derived(Spring) styles = () => ({
        to:{
            fontSize: this.isTyping ? pixelToInt(this.myFontSize)*7/10 : pixelToInt(this.myFontSize),
            bottom: this.isTyping ? "50%" : "0"
        },
        config: { duration: 200 },
    })


    Body = () =>
        ZStack(
            Input()
                .ref((this as any).inputElementRef)
                .width("200px")
                .outline("none")
                .border("solid")
                .fontSize(this.myFontSize)
                .borderWidth(this.variantUnderlined ? "0px 0px 1px 0px" : "1px")
                .borderRadius(this.variantUnderlined ? "0px" : "5px")
                .padding(this.variantUnderlined ? "7px 0px" : "7px")
                .borderColor(this.isTyping ? this.theme.selected :
                        (this.isMouseOver || (this.disable ?? true)) ? this.theme.over : this.theme.unselected)
                .setProp("defaultValue", this.textRef)
                .onChange(() => {
                    this.textRef = this.inputElement.value
                    !!this.onChange && this.onChange(this.textRef)
                })
                .backgroundColor(this.theme.foreground),
            ConditionView((this.placeHolder ?? "") === "", {
                false: () =>
                    AnimatedDiv(
                        Text(this.placeHolder)
                            .color((this.disable ?? true) ? this.theme.over :
                                this.isTyping ? this.theme.selected : this.theme.unselected)
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
            .ref((this as any).textFieldElementRef)
            .alignmentH("leading")
            .pointerEvents("none", this.disable)
            .opacity("0.5", this.disable)
            .onMouseOver(() => {
                this.isMouseOver = true
            })
            .onMouseOut(() => {
                this.isMouseOver = false
            })
            .onMouseDown(() => {
                this.isTyping = true
            })
            .didMount(() => {
                if (this.autoFocus ?? true) {
                    this.inputElement.focus()
                    this.isTyping = true;
                    this.inputElement.borderColor = this.theme.selected
                }
            })
            .didUpdate(() => {
                if (this.disable) return
                let clickOutsideHandler = (event: any) => {
                    if (!this.textFieldElement?.contains(event.target) && this.textRef === "")
                        this.isTyping = false
                }
                document.addEventListener("mousedown", clickOutsideHandler);

                return () => {
                    document.removeEventListener("mousedown", clickOutsideHandler);
                };
            }, [this.isTyping])

}


export default (defaultText: string) => ViewWrapper(TextField)({defaultText})

