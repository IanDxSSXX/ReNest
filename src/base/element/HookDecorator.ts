import {useRUIState} from "../utils/Utils";
import {useRef} from "react";
import {Hook, SHook} from "./Decorator";
import {useTheme} from "../theme/ThemeProvider";
import {useSpring} from "@react-spring/web";

export const State = Hook(useRUIState)

export const Ref = Hook(useRef)

export const Theme = SHook(useTheme)

export const Spring = Hook(useSpring)