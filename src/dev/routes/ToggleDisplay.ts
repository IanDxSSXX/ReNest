import {Toggle} from "../../component";
import {State, View, ViewWrapper} from "@iandx/reactui";

class ToggleDisplay extends View {
    @State isToggled = false

    Body = () =>
        Toggle(this.isToggled)
            .onChange((v:any)=>{
                this.isToggled = v
            })
}

export default ViewWrapper(ToggleDisplay)
