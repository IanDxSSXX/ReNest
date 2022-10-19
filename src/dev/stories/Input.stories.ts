import * as R from "../../component";
import {RUITemplate} from "./RUITemplate";

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


export const Button = RUITemplate((args: any) =>
    R.Button("Button").themeName(args.themeName)
)

export const Toggle = RUITemplate((args: any) =>
    R.Toggle().themeName(args.themeName)
)

// export const Select = RUITemplate((args: any) =>
//     R.Select([{title:"orange",data:[1,3,4]},{title:"banana",data:[10,30,40]}],'1')
// )

export const TextField = RUITemplate((args: any) =>
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


