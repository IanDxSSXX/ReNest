import {ReactUIElement, RUIProp} from "../../base/index.core";
import Text from "../Displayer/Text";
import { MdKeyboardArrowDown } from "react-icons/md";
import List from "../Displayer/List";
import {HStack, Spacer, VStack, ZStack} from "../../component";
import {useEffect, useRef} from "react";
import {useTrigger, useTriggerEffect, range, RUITag, useRUIState, RUI} from "../../base";
import {string} from "prop-types";
import {RUIColor} from "../../base/theme/Colors";

class Select extends ReactUIElement {
    defaultTheme = {
            bg: RUIColor.white.light,
            border: RUIColor.white.dark,
            hover: RUIColor.white.dark,
            selected: RUIColor.blue.light,
            font1: RUIColor.black.light,
            font2: RUIColor.white.dark,
    }
    isGroup(arr: Array<any>){
        return arr[0] instanceof Object
    }

    Board = RUI(({selectedValue, showOptions}:any)=>{
        return HStack(
            Text(selectedValue),
            Spacer(),
            RUITag(MdKeyboardArrowDown)()
        )
            .zIndex(2)
            .border(`1px solid ${this.theme.border}`)
            .borderColor(showOptions.value?this.theme.fg:this.theme.border)
            .color(showOptions.value?this.theme.font2:this.theme.font1)
            .width("100px")
            .height("20px")
            .backgroundColor(`${this.theme.bg}`)
            .padding("4px 10px")
            .alignItems('center')
            .onClick(()=>{showOptions.setValue((pre:any)=>!pre);})
            .borderRadius("2px")
    })

    OptionItem = RUI((item:string)=>{
        return HStack(
            this.C.option?this.C.option(item):
                Text(item)
                    .userSelect("none")
        )
    })

    Body = ({arr, defaultValue}:any):any =>{
        const selectedValue = useRUIState(defaultValue)
        const showOptions = useRUIState(false)
        const hoverState = useRUIState(-1)
        const selectElement = useRef()
        const groupOptionsValue = [{title:"orange",data:[1,3,4]}]

        const groupHead = (title:string) => HStack(
            this.C.groupHead?this.C.groupHead(title):
            Text(title)
                .color(`${this.theme.bg}`)
                .fontSize("20px")
                .userSelect("none")
        )
        const groupOptions:any = List(arr,(group, i)=>
            VStack(
                groupHead(group.title)
                    .padding("10px 10px")
                    .width("100px")
                    .height("20px"),
                List(group.data,(item,j)=>
                    this.optionItem(item)
                        .padding("4px 10px 4px 20px")
                        .key(`${i}-${j}`)
                        .width("100px")
                        .height("20px")
                        .onClick(e=>{
                            selectedValue.value = arr[i].data[j];
                            showOptions.value = !showOptions.value;
                            onChangeTrigger.trigger()
                        })
                        .onMouseOver(() => {hoverState.value = `${i}-${j}`})
                        .backgroundColor(
                            selectedValue.value === item ?
                                `${this.theme.selected}` : hoverState.value === `${i}-${j}` ? `${this.theme.hover}` :
                                    `${this.theme.bg}` )
                        .onMouseOut(()=>{hoverState.value = -1})
                )
            )
        )
            .vertical()
            .visibility(showOptions.value?'visible':'hidden')

        const options:any = List(arr,(item, idx)=>
                this.optionItem(item)
                .key(idx)
                .width("100px")
                .height("20px")
                .padding("4px 10px")
                .onClick(e=>{
                    selectedValue.value = arr[idx];
                    showOptions.value = !showOptions.value;
                    onChangeTrigger.trigger()
                })
                .onMouseOver(() => {hoverState.value = idx})
                .backgroundColor(
                    selectedValue.value === item ?
                        `${this.theme.selected}` : hoverState.value === idx ? `${this.theme.hover}` :
                            `${this.theme.bg}` )
                .onMouseOut(()=>{hoverState.value = -1})
        )
            .vertical()
            .visibility(showOptions.value?'visible':'hidden')


        const onChangeTrigger = useTrigger()

        useTriggerEffect(onChangeTrigger, () => !!this.C.onChange && this.C.onChange(selectedValue.value))


        options
            .top("30px")
            .boxShadow(`2px 2px 6px ${this.theme.bg}`)
            .borderRadius("2px")

        groupOptions
            .top("30px")
            .boxShadow(`2px 2px 6px ${this.theme.bg}`)
            .borderRadius("2px")


        useEffect(()=>{
            let clickOutsideHandler = (event: any) => {
                if (!(selectElement.current as any).contains(event.target)) {
                    showOptions.value = false
                }
            }
            document.addEventListener("mousedown", clickOutsideHandler);

            return () => {
                document.removeEventListener("mousedown", clickOutsideHandler);
            };
        })
        return ZStack(
            this.board(selectedValue.value,showOptions),
            this.isGroup(arr)? groupOptions: options
        )
            .alignmentV('top')
            .ref(selectElement)
    }

    @RUIProp
    onChange(value: any) { return this }
    @RUIProp
    option(value: Function) {return this}
    @RUIProp
    groupHead(value: Function) {return this}
}

export default function (arr:any,defaultValue:any) {
    return new Select({arr,defaultValue})
}
