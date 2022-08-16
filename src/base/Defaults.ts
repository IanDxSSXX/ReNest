// ---- tags

import {ReactUITheme, ReactUIThemeColor} from "./Interfaces";
import {ReactUIElement} from "./ReactUIElement";

export const globalTag = "[global]"
export const noneTag = "[none]"

export const defaultReactUIThemeColor: ReactUIThemeColor = {
    background: {
        light: "#191A1A",
        standard: "#131414",
        dark: "#0C0D0D"
    },
    foreground: {
        light: "#FBFCFC",
        standard: "#F0F2F1",
        dark: "#E1E5E4"
    },
    primary: {
        light: "#F1B1B1",
        standard: "#DB3D3D",
        dark: "#832525"
    },
    secondary: {
        light: "#A6DCBE",
        standard: "#27AA60",
        dark: "#104426"
    },
    tertiary: {
        light: "#8FB0DC",
        standard: "#457CC4",
        dark: "#294A76"
    },
}

export const defaultReactUIThemeFont = {}

export const defaultReactUITheme: ReactUITheme = {
    font: defaultReactUIThemeFont,
    colors: defaultReactUIThemeColor
}

