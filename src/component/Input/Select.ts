import {ReactUIElement, RUIProp} from "../../base/index.core";
import Text from "../Displayer/Text";
import { AiOutlineDown } from "react-icons/ai";
import {ReactUIThemeColorMap} from "../../base/Interfaces";
import List from "../Displayer/List";
import {HStack, Spacer, VStack, ZStack} from "../../component";
import {useEffect, useRef} from "react";
import {useTrigger, useTriggerEffect, range, RUITag, useRUIState} from "../../base";
import {string} from "prop-types";

class Select extends ReactUIElement {
    themeColorMap: ReactUIThemeColorMap = {
        first: 'tertiary',
        second: 'foreground',
    }
    isGroup(arr: Array<any>){
        return arr[0] instanceof Object
    }
    Body = ({arr, defaultValue}:any):any =>{
        const selectedValue = useRUIState(defaultValue)
        const showOptions = useRUIState(false)
        const hoverState = useRUIState(-1)
        const selectElement = useRef()
        const groupOptionsValue = [{title:"orange",data:[1,3,4]}]

        const board = HStack(
            Text(selectedValue.value),
            Spacer(),
            RUITag(AiOutlineDown)
        )
        const option = (item:string) => HStack(
            this.C.option?this.C.option(item):
            Text(item)
                .userSelect("none")
        )
        const groupHead = (title:string) => HStack(
            this.C.groupHead?this.C.groupHead(title):
            Text(title)
                .color(`${select.themeColor.second.dark}`)
                .fontSize("20px")
                .userSelect("none")
        )
        const groupOptions:any = List(arr,(group, i)=>
            VStack(
                groupHead(group.title)
                    .padding("0px 10px")
                    .width(select.S.width??"100px")
                    .height(select.S.height??"20px"),
                List(group.data,(item,j)=>
                    option(item)
                        .padding("4px 10px 4px 20px")
                        .key(`${i}-${j}`)
                        .width(select.S.width??"100px")
                        .height(select.S.height??"20px")
                        .onClick(e=>{
                            selectedValue.value = arr[i].data[j];
                            showOptions.value = !showOptions.value;
                            onChangeTrigger.trigger()
                        })
                        .onMouseOver(() => {hoverState.value = `${i}-${j}`})
                        .backgroundColor(
                            selectedValue.value === item ?
                                `${select.themeColor.first.light}` : hoverState.value === `${i}-${j}` ? `${select.themeColor.second.dark}` :
                                    `${select.themeColor.second.light}` )
                        .onMouseOut(()=>{hoverState.value = -1})
                )
            )
        )
            .vertical()
            .visibility(showOptions.value?'visible':'hidden')

        const options:any = List(arr,(item, idx)=>
                option(item)
                .key(idx)
                .width(select.S.width??"100px")
                .height(select.S.height??"20px")
                .padding("4px 10px")
                .onClick(e=>{
                    selectedValue.value = arr[idx];
                    showOptions.value = !showOptions.value;
                    onChangeTrigger.trigger()
                })
                .onMouseOver(() => {hoverState.value = idx})
                .backgroundColor(
                    selectedValue.value === item ?
                        `${select.themeColor.first.light}` : hoverState.value === idx ? `${select.themeColor.second.dark}` :
                            `${select.themeColor.second.light}` )
                .onMouseOut(()=>{hoverState.value = -1})
        )
            .vertical()
            .visibility(showOptions.value?'visible':'hidden')


        const onChangeTrigger = useTrigger()

        useTriggerEffect(onChangeTrigger, () => !!this.C.onChange && this.C.onChange(selectedValue.value))


        const select = ZStack(
            board,
            this.isGroup(arr)? groupOptions: options
        ).registerBy(this)

        board
            .zIndex(2)
            .border(`1px solid ${select.themeColor.second.dark}`)
            .width(select.S.width??"100px")
            .height(select.S.height??"20px")
            .backgroundColor(`${select.themeColor.second.light}`)
            .padding("4px 10px")
            .alignItems('center')
            .onClick(()=>{showOptions.value=!showOptions.value;})

        options
            .top("30px")
            .boxShadow(`2px 2px 6px ${select.themeColor.second.dark}`)

        groupOptions
            .top("30px")

        select
            .alignmentV('top')
            .ref(selectElement)

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
        return select
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
