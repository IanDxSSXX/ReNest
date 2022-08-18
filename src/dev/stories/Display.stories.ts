import * as RUIComponent from "../../component";
import {RUITemplate} from "./RUITemplate";
import {useRUIState} from "../../base";

export default {
    title: 'Display',
    argTypes: {
        num: {
            control: {
                defaultValue: 0.3,
                type: "range",
                min: 0,
                max: 1,
                step:0.025
            }
        },
        color: {
            defaultValue: 'tertiary',
            options: ['primary', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        }
    }
}

export const Progress = RUITemplate((args:any)=>RUIComponent.Progress(args.num).setColor(args.color))

