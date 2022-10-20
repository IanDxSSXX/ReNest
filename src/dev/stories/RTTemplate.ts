import {ComponentStory} from "@storybook/react";


export function RTTemplate(ruiWrapper: ((args:any) => any)) {
    return ((args: any) => ruiWrapper(args).asReactElement()) as ComponentStory<any>
}