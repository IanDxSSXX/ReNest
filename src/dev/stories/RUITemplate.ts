import ReactUIBase from "../../base/core/ReactUIBase";
import {ComponentStory} from "@storybook/react";


export function RUITemplate(ruiWrapper: ((args:any) => ReactUIBase)) {
    return ((args: any) => ruiWrapper(args).asReactElement()) as ComponentStory<any>
}