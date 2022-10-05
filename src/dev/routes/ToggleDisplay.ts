import {RUI, useRUIState} from "../../base";
import {useEffect} from "react";
import {Toggle} from "../../component";

export const ToggleDisplay = RUI(() => {
    const toggleState = useRUIState(false)

    useEffect(() => {
        console.log(toggleState.value)
    })

    return (
        Toggle(toggleState.value)
            .onChange((v:any)=>{
                toggleState.value = v
            })
    )
})
