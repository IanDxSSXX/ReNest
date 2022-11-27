import {SHook} from "./Decorator";
import {useTheme} from "../theme/ThemeState";

type HookDecorator = (target: any, propertyKey: string) => void

export const Theme = SHook(useTheme) as HookDecorator
