import * as RUIComponent from "component";
import {RUITemplate} from "./RUITemplate";
import {useRUIState} from "../../base";

export default {
    title: 'Input',
    argTypes: {
        first: {
            defaultValue: "primary",
            options: ['primary', 'secondary', 'tertiary', 'foreground', 'background'],
            control: { type: 'radio' },
        },
        second: {
            defaultValue: "secondary",
            options: ['primary', 'secondary', 'tertiary', 'foreground', 'background'],
            control: { type: 'radio' },
        },
        third: {
            defaultValue: "tertiary",
            options: ['primary', 'secondary', 'tertiary', 'foreground', 'background'],
            control: { type: 'radio' },
        },
        forth: {
            defaultValue: "foreground",
            options: ['primary', 'secondary', 'tertiary', 'foreground', 'background'],
            control: { type: 'radio' },
        },
        fifth: {
            defaultValue: "background",
            options: ['primary', 'secondary', 'tertiary', 'foreground', 'background'],
            control: { type: 'radio' },
        },
    },
};


export const Button = RUITemplate((args: any) =>
    RUIComponent.Button("Button")
        .setColor(args.first, args.second, args.third, args.forth, args.fifth)
)

export const Toggle = RUITemplate((args: any) =>
    RUIComponent.Toggle()
        .setColor(args.first, args.second, args.third, args.forth, args.fifth)
)


