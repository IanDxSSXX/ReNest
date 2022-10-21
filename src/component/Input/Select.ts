import {FuncView, TagView, useState, useTrigger, useTriggerEffect, View} from "@renest/renest"
import {useEffect, useRef} from "react";
import {RTColor} from "../Util/Colors";
import {MdKeyboardArrowDown} from "react-icons/md";
import Spacer from "../Other/Spacer";
import HStack from "../Container/HStack";
import Text from "../Displayer/Text";
import ZStack from "../Container/ZStack";
import List from "../Displayer/List";
import VStack from "../Container/VStack";

class Select extends View {
    defaultTheme = {
            bg: RTColor.white.light,
            border: RTColor.white.dark,
            hover: RTColor.white.dark,
            selected: RTColor.blue.light,
            font1: RTColor.black.light,
            font2: RTColor.white.dark,
    }
    isGroup(arr: Array<any>){
        return arr[0] instanceof Object
    }

    Board = (selectedValue:string, showOptions:any)=>{
        return HStack(
            Text(selectedValue),
            Spacer(),
            TagView(MdKeyboardArrowDown)()
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
            .onClick(()=>{showOptions.setValue((prev:any)=>!prev);})
            .borderRadius("2px")
    }

    OptionItem = FuncView((item:string)=>{
        return HStack(
            this.customProps.option?this.customProps.option(item):
                Text(item)
                    .userSelect("none")
        )
    })

    Body = ({arr, defaultValue}:any):any =>{
        const selectedValue = useState(defaultValue)
        const showOptions = useState(false)
        const hoverState = useState(-1)
        const selectElement = useRef()
        const groupOptionsValue = [{title:"orange",data:[1,3,4]}]

        const groupHead = (title:string) => HStack(
            this.customProps.groupHead?this.customProps.groupHead(title):
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
                    this.OptionItem(item)
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
                this.OptionItem(item)
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

        useTriggerEffect(onChangeTrigger, () => !!this.customProps.onChange && this.customProps.onChange(selectedValue.value))


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
            this.Board(selectedValue.value, showOptions),
            this.isGroup(arr)? groupOptions: options
        )
            .alignmentV('top')
            .ref(selectElement)
    }

    // @RTProp
    // onChange(value: any) { return this }
    // @RTProp
    // option(value: Function) {return this}
    // @RTProp
    // groupHead(value: Function) {return this}
}

export default function (arr:any,defaultValue:any) {
    return new Select({arr,defaultValue})
}
