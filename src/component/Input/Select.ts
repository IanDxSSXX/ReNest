import {ReactUIElement, RUIProp} from "../../base/index.core";
import Text from "../Displayer/Text";
import { AiOutlineDown } from "react-icons/ai";
import {ReactUIThemeColorMap} from "../../base/Interfaces";
import List from "../Displayer/List";
import {HStack, range, RUITag, Spacer, useRUIState, VStack} from "../../base/index";
import {useEffect, useRef} from "react";
import {useTrigger, WithTrigger} from "../../Utils";

class Select extends ReactUIElement {
    reactUIThemeColor: ReactUIThemeColorMap = {
        first: 'tertiary',
        second: 'foreground',
    }
    Body = ({arr, defaultValue}:any)=>{
        const selectedValue = useRUIState(defaultValue)
        const showOptions = useRUIState(false)
        const hoverState = useRUIState(-1)
        const selectElement = useRef()

        const board = HStack(
            Text(selectedValue.value),
            Spacer(),
            RUITag(AiOutlineDown)
        )

        const options:any = List(arr,(item, idx)=>
            HStack(
                Text(item)
                    .userSelect("none")
            )
                .width(select.S("width")??"100px")
                .height(select.S("height")??"20px")
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

        WithTrigger(onChangeTrigger, () => !!this.C("onChange") && this.C("onChange")(selectedValue.value))


        const select = VStack(
            board,
            options
        ).registerBy(this)

        board
            .border(`1px solid ${select.themeColor.second.dark}`)
            .width(select.S("width")??"100px")
            .height(select.S("height")??"20px")
            .padding("4px 10px")
            .alignItems('center')
            .onClick(()=>{showOptions.value=!showOptions.value;})

        options
            .boxShadow(`2px 2px 8px ${select.themeColor.second.dark}`)

        select
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
}

export default function (arr:any,defaultValue:any) {
    return new Select({arr,defaultValue})
}
