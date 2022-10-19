import {ComponentStory} from "@storybook/react";


export function RUITemplate(ruiWrapper: ((args:any) => any)) {
    return ((args: any) => ruiWrapper(args).asReactElement()) as ComponentStory<any>
}