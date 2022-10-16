import ReactUIBase from "../../core/base/ReactUIBase";
import {ComponentStory} from "@storybook/react";


export function RUITemplate(ruiWrapper: ((args:any) => ReactUIBase)) {
    return ((args: any) => ruiWrapper(args).asReactElement()) as ComponentStory<any>
}