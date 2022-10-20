import * as R from "../../component";
import {RTTemplate} from "./RTTemplate";
import RTProgress  from "../../component/Displayer/Progress";

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

export const Progress = RTTemplate((args:any)=>
    RTProgress(args.num)
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