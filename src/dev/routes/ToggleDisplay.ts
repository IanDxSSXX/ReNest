import {FuncView, useRUIState} from "../../core";
import {useEffect} from "react";
import {Toggle} from "../../component";

export const ToggleDisplay = FuncView(() => {
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
