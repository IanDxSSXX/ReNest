import * as RUIComponent from "../../component";
import {RUITemplate} from "./RUITemplate";
import {useRUIState} from "../../core";

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
        themeName:{
            defaultValue:'primary',
            options: ['primary','secondary','tertiary'],
            control: {type: 'radio'},
        },
        variant: {
            defaultValue: 'circle',
            options: ['line','circle'],
            control: {type: 'radio'}
        }
    }
}

export const Progress = RUITemplate((args:any)=>RUIComponent.Progress(args.num).variant(args.variant).themeName(args.themeName))
