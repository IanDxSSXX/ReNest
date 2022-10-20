import * as R from "../../component";
import {RTTemplate} from "./RTTemplate";

export default {
    title: 'Input',
    argTypes: {
        themeName:{
            defaultValue:'primary',
            options: ['primary','secondary','tertiary'],
            control: {type: 'radio'},
        }
    }
};


export const Button = RTTemplate((args: any) =>
    R.Button("Button").themeName(args.themeName)
)

export const Toggle = RTTemplate((args: any) =>
    R.Toggle().themeName(args.themeName)
)

// export const Select = RTTemplate((args: any) =>
//     R.Select([{title:"orange",data:[1,3,4]},{title:"banana",data:[10,30,40]}],'1')
// )

export const TextField = RTTemplate((args: any) =>
    R.TextField("").placeHolder(args.placeHolder).themeName(args.themeName)
)
TextField.argTypes = {
    placeHolder:{
        control:{
            type: 'text',
            defaultValue:'placeHolder'
        }
    }
}


