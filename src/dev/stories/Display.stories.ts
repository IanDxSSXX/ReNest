import * as R from "../../component";
import {RUITemplate} from "./RUITemplate";

export default {
    title: 'Display',
    argTypes: {
        themeName:{
            defaultValue:'primary',
            options: ['primary','secondary','tertiary'],
            control: {type: 'radio'},
        },
    }
}

export const Progress = RUITemplate((args:any)=>
    R.Progress(args.num)
        .variant(args.variant)
        .themeName(args.themeName)
        .duration(args.duration)
)
Progress.argTypes = {
    num: {
        control: {
            defaultValue: 0.3,
            type: "range",
            min: 0,
            max: 1,
            step:0.025
        }
    },
    variant: {
        defaultValue: 'circle',
        options: ['line','circle'],
        control: {type: 'radio'}
    },
    duration: {
        control: {
            defaultValue: 300,
            type: "range",
            min: 0,
            max: 3000,
            step: 100
        }
    }
}