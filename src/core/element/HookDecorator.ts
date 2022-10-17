import {useRUIState} from "../utils/Utils";
import {useRef} from "react";
import {Hook, SHook} from "./Decorator";
import {useTheme} from "../theme/ThemeProvider";
import {useSpring} from "@react-spring/web";
import {useNavigate} from "react-router-dom";


type HookDecorator = (target: any, propertyKey: string) => void

export const State = Hook(useRUIState) as HookDecorator

export const Ref = Hook(useRef) as HookDecorator

export const Theme = SHook(useTheme) as HookDecorator

export const Spring = Hook(useSpring) as HookDecorator

export const Navigate = Hook(useNavigate) as HookDecorator
