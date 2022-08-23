import * as RUIComponent from "../../component";
import {RUITemplate} from "./RUITemplate";
import {RUITag, useRUIState} from "../../base";
import Text from "../../component/Displayer/Text";

export default {
    title: 'Input',
};


export const Button = RUITemplate((args: any) =>
    RUIComponent.Button("Button")
        // .setColor(args.first, args.second, args.third, args.forth, args.fifth)
)

export const Toggle = RUITemplate((args: any) =>
    RUIComponent.Toggle()
        // .setColor(args.first, args.second, args.third, args.forth, args.fifth)
)

export const Select = RUITemplate((args: any) =>
    RUIComponent.Select([{title:"orange",data:[1,3,4]},{title:"banana",data:[10,30,40]}],'1')
)

export const TextField = RUITemplate((args: any) =>
    RUIComponent.TextField('').placeHolder(args.placeHolder)
)
TextField.argTypes = {
    placeHolder:{
        control:{
            type: 'text',
            defaultValue:'placeHolder'
        }
    }
}


