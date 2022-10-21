import {Toggle} from "../../component";
import {State, View, ViewWrapper} from "@renest/renest";

class ToggleDisplay extends View {
    @State isToggled = false

    Body = () =>
        Toggle(this.isToggled)
            .onChange((v:any)=>{
                this.isToggled = v
            })
}

export default ViewWrapper(ToggleDisplay)
