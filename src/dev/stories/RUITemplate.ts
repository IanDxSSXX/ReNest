import RUIBase from "../../core/base/RUIBase";
import {ComponentStory} from "@storybook/react";


export function RUITemplate(ruiWrapper: ((args:any) => RUIBase)) {
    return ((args: any) => ruiWrapper(args).asReactElement()) as ComponentStory<any>
}